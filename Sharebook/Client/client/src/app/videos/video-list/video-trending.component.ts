import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, LocalStorageService, Notifier, ScreenService, ServerService, UserService } from '../../core';
import { HooksService } from '../../core/plugins/hooks.service';
import { immutableAssign } from '../../helpers';
import { VideoService } from '../../shared/shared-main';
import { AbstractVideoList } from '../../shared/shared-video-miniature';
import { VideoSortField } from '../../../../../shared/models';

@Component({
  selector: 'app-videos-trending',
  styleUrls: [ '../../shared/shared-video-miniature/abstract-video-list.scss' ],
  templateUrl: '../../shared/shared-video-miniature/abstract-video-list.html'
})
export class VideoTrendingComponent extends AbstractVideoList implements OnInit, OnDestroy {
  titlePage: string;
  defaultSort: VideoSortField = '-trending';

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

    this.serverService.getConfig().subscribe(
      config => {
        const trendingDays = config.trending.videos.intervalDays;

        if (trendingDays === 1) {
          this.titlePage = $localize`Trending for the last 24 hours`;
          this.titleTooltip = $localize`Trending videos are those totalizing the greatest number of views during the last 24 hours`;
        } else {
          this.titlePage = `Trending for the last ${trendingDays} days`;
          this.titleTooltip = `Trending videos are those totalizing the greatest number of views during the last ${trendingDays} days`;
        }
      });
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
      'filter:api.trending-videos.videos.list.params',
      'filter:api.trending-videos.videos.list.result'
    );
  }

  generateSyndicationList() {
    this.syndicationItems = this.videoService.getVideoFeedUrls(this.sort, undefined, this.categoryOneOf);
  }
}
