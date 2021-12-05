import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Subscription} from 'rxjs';

import {
  faFilter,
} from '@fortawesome/pro-light-svg-icons';

import {Post} from '../../shared/shared-main/post/post.model';
import {AdvancedSearch} from "../../shared/shared-search/advanced-search.model";
import {MiniatureDisplayOptions} from "../streamers/stream-list/stream-miniature/video-miniature.component";
import {User} from "../../shared/shared-main/user/user.model";
import {SearchTargetType} from "../../shared/models/search/search-target-query.model";
import {HTMLServerConfig} from "../../shared/models/server/server-config.model";
import {NbToastrService} from '../../sharebook-nebular/theme/components/toastr/toastr.service';
import {MetaService} from "../../core/routing/meta.service";
import {SearchService} from "../../shared/shared-search/search.service";
import {ServerService} from "../../core/server/server.service";
import {LinkType} from "../../../types/link.type";
import {immutableAssign} from "../../helpers/utils";
import {validateHost} from "../../shared/shared-forms/form-validators/host";
import {UserStore} from "../../core/stores/user.store";
import {UsersService} from 'app/core/backend/common/services/users.service';

@Component({
  selector: 'my-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  error: string;

  results: (Post | User)[] = [];

  pagination = {
    currentPage: 1,
    totalItems: null as number
  };
  advancedSearch: AdvancedSearch = new AdvancedSearch();
  isSearchFilterCollapsed = true;
  currentSearch: string;

  videoDisplayOptions: MiniatureDisplayOptions = {
    date: true,
    views: true,
    by: true,
    avatar: false,
    privacyLabel: false,
    privacyText: false,
    state: false,
    blacklistInfo: false
  };

  errorMessage: string;

  userMiniature: User;

  private subActivatedRoute: Subscription;
  private isInitialLoad = false; // set to false to show the search filters on first arrival

  private channelsPerPage = 2;
  private playlistsPerPage = 2;
  private videosPerPage = 10;

  private hasMoreResults = true;
  private isSearching = false;

  private lastSearchTarget: SearchTargetType;

  private serverConfig: HTMLServerConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private notifier: NbToastrService,
    private searchService: SearchService,
    private authService: UserStore,
    private userService: UsersService,
    private serverService: ServerService
  ) {
  }

  ngOnInit() {
    this.serverConfig = this.serverService.getHTMLConfig();

    this.subActivatedRoute = this.route.queryParams.subscribe(
      async queryParams => {
        let querySearch = queryParams['search'];
        if (!querySearch) {
          querySearch = queryParams['tagsOneOf'];
        }
        const searchTarget = queryParams['searchTarget'];

        // Search updated, reset filters
        if (this.currentSearch !== querySearch || searchTarget !== this.advancedSearch.searchTarget) {
          this.resetPagination();
          this.advancedSearch.reset();

          this.currentSearch = querySearch || undefined;
          this.updateTitle();
        }

        this.advancedSearch = new AdvancedSearch(queryParams);
        if (!this.advancedSearch.searchTarget) {
          this.advancedSearch.searchTarget = this.getDefaultSearchTarget();
        }

        this.error = this.checkFieldsAndGetError();

        // Don't hide filters if we have some of them AND the user just came on the webpage, or we have an error
        this.isSearchFilterCollapsed = !this.error && (this.isInitialLoad === false || !this.advancedSearch.containsValues());
        this.isInitialLoad = false;

        this.search();
      },

      err => this.notifier.danger(err.text, 'Error')
    );

    this.userService.getAnonymousOrLoggedUser()
      // @ts-ignore
      .subscribe(user => this.userMiniature = user);
  }

  ngOnDestroy() {
    if (this.subActivatedRoute) this.subActivatedRoute.unsubscribe();
  }

  faFilter = faFilter;

  isVideoChannel(d: User | Post): d is User {
    return d instanceof User;
  }

  isVideo(v: User | Post): v is Post {
    return v instanceof Post;
  }

  isPlaylist(v: User | Post) {
    return false; // v instanceof VideoPlaylist;
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  search() {
    this.error = this.checkFieldsAndGetError();
    if (this.error) {
      return;
    }

    this.isSearching = true;

    let arr = [];

    // hack da bug: TypeError: this.currentSearch.startsWith is not a function
    if (Array.isArray(this.currentSearch)) {
      this.currentSearch = this.currentSearch[0];
    }

    if (this.currentSearch.startsWith('@')) {
      arr.push(this.getVideoChannelObs());
    } else {
      arr.push(this.getVideosObs());
    }

    // https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
    forkJoin(
      arr,
    ).subscribe(results => {
        for (const result of results) {
          // @ts-ignore
          this.results = this.results.concat(result.data);
        }

        // @ts-ignore
        this.pagination.totalItems = results.reduce((p, r) => p += r.total, 0);
        this.lastSearchTarget = this.advancedSearch.searchTarget;

        this.hasMoreResults = this.results.length < this.pagination.totalItems;
      },

      err => {
        if (this.advancedSearch.searchTarget !== 'search-index') {
          this.notifier.danger(err.message, 'Error');
          return;
        }

        this.notifier.danger(
          `Search index is unavailable. Retrying with instance results instead.`,
          `Search error`
        );
        this.advancedSearch.searchTarget = 'local';
        this.search();
      },

      () => {
        this.isSearching = false;
      });
  }

  onNearOfBottom() {
    // Last page
    if (!this.hasMoreResults || this.isSearching) return;

    this.pagination.currentPage += 1;
    this.search();
  }

  onFiltered() {
    this.resetPagination();

    this.updateUrlFromAdvancedSearch();
  }

  numberOfFilters() {
    return this.advancedSearch.size();
  }

  // Add VideoChannel/VideoPlaylist for typings, but the template already checks "video" argument is a video
  removeVideoFromArray(video: Post | User) {
    this.results = this.results.filter(r => !this.isVideo(r) || r.id !== video.id);
  }

  getLinkType(): LinkType {
    if (this.advancedSearch.searchTarget === 'search-index') {
      const remoteUriConfig = this.serverConfig.search.remoteUri;

      // Redirect on the external instance if not allowed to fetch remote data
      if ((!this.isUserLoggedIn() && !remoteUriConfig.anonymous) || !remoteUriConfig.users) {
        return 'external';
      }

      return 'lazy-load';
    }

    return 'internal';
  }

  isExternalChannelUrl() {
    return this.getLinkType() === 'external';
  }

  getExternalChannelUrl(channel: User) {
    // Same algorithm than videos
    if (this.getLinkType() === 'external') {
      return channel.url;
    }

    // lazy-load or internal
    return undefined;
  }

  getInternalChannelUrl(channel: User) {
    const linkType = this.getLinkType();

    if (linkType === 'internal') {
      return ['/', channel.screenName.substring(1)];
    }

    if (linkType === 'lazy-load') {
      return ['/search/lazy-load-channel', {url: channel.url}];
    }

    // external
    return undefined;
  }

  hideActions() {
    return this.lastSearchTarget === 'search-index';
  }

  private resetPagination() {
    this.pagination.currentPage = 1;
    this.pagination.totalItems = null;
    this.channelsPerPage = 2;

    this.results = [];
  }

  private updateTitle() {
    const suffix = this.currentSearch
      ? ' ' + this.currentSearch
      : '';

    this.metaService.setTitle(`Search` + suffix);
  }

  private updateUrlFromAdvancedSearch() {
    const search = this.currentSearch || undefined;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: Object.assign({}, this.advancedSearch.toUrlObject(), {search})
    });
  }

  private getVideosObs() {
    const params = {
      search: this.currentSearch,
      componentPagination: immutableAssign(this.pagination, {itemsPerPage: this.videosPerPage}),
      advancedSearch: this.advancedSearch
    };

    // return this.hooks.wrapObsFun(
    //   this.searchService.searchVideos.bind(this.searchService),
    //   params,
    //   'search',
    //   'filter:api.search.videos.list.params',
    //   'filter:api.search.videos.list.result'
    // );

    return this.searchService.searchVideos(params);
  }

  private getVideoChannelObs() {
    const params = {
      search: this.currentSearch,
      componentPagination: immutableAssign(this.pagination, {itemsPerPage: this.channelsPerPage}),
      advancedSearch: this.advancedSearch
    };

    // return this.hooks.wrapObsFun(
    //   this.searchService.searchVideoChannels.bind(this.searchService),
    //   params,
    //   'search',
    //   'filter:api.search.video-channels.list.params',
    //   'filter:api.search.video-channels.list.result'
    // );

    return this.searchService.searchVideoChannels(params);
  }

  private getDefaultSearchTarget(): SearchTargetType {
    // const searchIndexConfig = this.serverConfig.search.searchIndex;

    // if (searchIndexConfig.enabled && (searchIndexConfig.isDefaultSearch || searchIndexConfig.disableLocalSearch)) {
    //   return 'search-index';
    // }

    return 'local';
  }

  private checkFieldsAndGetError() {
    if (this.advancedSearch.host && !validateHost(this.advancedSearch.host)) {
      return `PeerTube instance host filter is invalid`;
    }

    return undefined;
  }
}
