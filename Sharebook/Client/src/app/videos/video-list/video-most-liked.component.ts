import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractVideoList} from "../../shared/shared-video-miniature/abstract-video-list";
import {VideoSortField} from "../../shared/models/videos/video-sort-field.type";
import {ServerService} from "../../core/server";
import {Notifier} from "../../core/notification/notifier-service";
import {AuthService} from "../../core/auth/auth.service";
import {UserService} from "../../core/users/user.service";
import {ScreenService} from "../../core/wrappers/screen.service";
import {LocalStorageService} from "../../core/wrappers/storage.service";
import {VideoService} from "../../shared/main/video/video.service";
import {HooksService} from "../../core/plugins";
import {immutableAssign} from "../../helpers/utils";

@Component({
  selector: 'my-videos-most-liked',
  styleUrls: ['../../shared/shared-video-miniature/abstract-video-list.scss'],
  templateUrl: '../../shared/shared-video-miniature/abstract-video-list.html'
})
export class VideoMostLikedComponent extends AbstractVideoList implements OnInit {
  titlePage: string;
  defaultSort: VideoSortField = '-likes';

  useUserVideoPreferences = true;

  constructor(
    protected router: Router,
    protected serverService: ServerService,
    protected route: ActivatedRoute,
    protected notifier: Notifier,
    protected authService: AuthService,
    protected userService: UserService,
    protected screenService: ScreenService,
    protected storageService: LocalStorageService,
    private videoService: VideoService,
    private hooks: HooksService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.generateSyndicationList();

    this.titlePage = $localize`Most liked videos`;
    this.titleTooltip = $localize`Videos that have the most likes.`;
  }

  getVideosObservable(page: number) {
    const newPagination = immutableAssign(this.pagination, {currentPage: page});
    const params = {
      videoPagination: newPagination,
      sort: this.sort,
      categoryOneOf: this.categoryOneOf,
      languageOneOf: this.languageOneOf,
      nsfwPolicy: this.nsfwPolicy,
      skipCount: true
    };

    return this.hooks.wrapObsFun(
      this.videoService.getVideos.bind(this.videoService),
      params,
      'common',
      'filter:api.most-liked-videos.videos.list.params',
      'filter:api.most-liked-videos.videos.list.result'
    );
  }

  generateSyndicationList() {
    this.syndicationItems = this.videoService.getVideoFeedUrls(this.sort, undefined, this.categoryOneOf);
  }
}
