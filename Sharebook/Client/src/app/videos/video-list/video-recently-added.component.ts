import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractVideoList} from "../../shared/shared-video-miniature/abstract-video-list";
import {VideoSortField} from "../../shared/models/videos/video-sort-field.type";
import {VideoService} from "../../shared/main/video/video.service";
import {HooksService} from "../../core/plugins";
import {immutableAssign} from "../../helpers/utils";
import {ServerService} from "../../core/server";
import {Notifier} from "../../core/notification/notifier-service";
import {AuthService} from "../../core/auth/auth.service";
import {ScreenService} from "../../core/wrappers/screen.service";
import {UserService} from "../../core/users/user.service";
import {LocalStorageService} from "../../core/wrappers/storage.service";

@Component({
  selector: 'my-videos-recently-added',
  styleUrls: ['../../shared/shared-video-miniature/abstract-video-list.scss'],
  templateUrl: '../../shared/shared-video-miniature/abstract-video-list.html'
})
export class VideoRecentlyAddedComponent extends AbstractVideoList implements OnInit, OnDestroy {
  titlePage: string;
  sort: VideoSortField = '-publishedAt';
  groupByDate = true;

  useUserVideoPreferences = true;

  constructor(
    protected route: ActivatedRoute,
    protected serverService: ServerService,
    protected router: Router,
    protected notifier: Notifier,
    protected authService: AuthService,
    protected userService: UserService,
    protected screenService: ScreenService,
    protected storageService: LocalStorageService,
    private videoService: VideoService,
    private hooks: HooksService
  ) {
    super();

    this.titlePage = $localize`Recently added`;
  }

  ngOnInit() {
    super.ngOnInit();

    this.generateSyndicationList();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
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
      'filter:api.recently-added-videos.videos.list.params',
      'filter:api.recently-added-videos.videos.list.result'
    );
  }

  generateSyndicationList() {
    this.syndicationItems = this.videoService.getVideoFeedUrls(this.sort, undefined, this.categoryOneOf);
  }
}
