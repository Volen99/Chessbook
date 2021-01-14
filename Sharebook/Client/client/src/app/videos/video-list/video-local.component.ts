import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, LocalStorageService, Notifier, ScreenService, ServerService, UserService } from '../../core';
import { HooksService } from '../../core/plugins/hooks.service';
import { immutableAssign } from '../../helpers';
import { VideoService } from '../../shared/shared-main';
import { AbstractVideoList } from '../../shared/shared-video-miniature';
import { VideoFilter, VideoSortField } from '../../../../../shared';

@Component({
  selector: 'app-videos-local',
  styleUrls: [ '../../shared/shared-video-miniature/abstract-video-list.scss' ],
  templateUrl: '../../shared/shared-video-miniature/abstract-video-list.html'
})
export class VideoLocalComponent extends AbstractVideoList implements OnInit, OnDestroy {
  titlePage: string;
  sort = '-publishedAt' as VideoSortField;
  filter: VideoFilter = 'local';

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

    this.titlePage = $localize`Local videos`;
  }

  ngOnInit() {
    super.ngOnInit();

    this.enableAllFilterIfPossible();
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
      filter: this.filter,
      categoryOneOf: this.categoryOneOf,
      languageOneOf: this.languageOneOf,
      nsfwPolicy: this.nsfwPolicy,
      skipCount: true
    };

    return this.hooks.wrapObsFun(
      this.videoService.getVideos.bind(this.videoService),
      params,
      'common',
      'filter:api.local-videos.videos.list.params',
      'filter:api.local-videos.videos.list.result'
    );
  }

  generateSyndicationList() {
    this.syndicationItems = this.videoService.getVideoFeedUrls(this.sort, this.filter, this.categoryOneOf);
  }

  toggleModerationDisplay() {
    this.filter = this.buildLocalFilter(this.filter, 'local');

    this.reloadVideos();
  }
}
