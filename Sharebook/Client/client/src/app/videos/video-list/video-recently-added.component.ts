import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, LocalStorageService, Notifier, ScreenService, ServerService, UserService } from '../../core';
import { HooksService } from '../../core/plugins/hooks.service';
import { immutableAssign } from '../../helpers';
import { VideoService } from '../../shared/shared-main';
import { AbstractVideoList } from '../../shared/shared-video-miniature';
import { VideoSortField } from '../../../../../shared/models';

@Component({
  selector: 'app-videos-recently-added',
  styleUrls: [ '../../shared/shared-video-miniature/abstract-video-list.scss' ],
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
    const newPagination = immutableAssign(this.pagination, { currentPage: page });
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
