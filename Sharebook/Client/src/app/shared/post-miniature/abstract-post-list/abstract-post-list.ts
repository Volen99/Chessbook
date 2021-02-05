import {Directive, OnDestroy, OnInit} from '@angular/core';
import {ComponentPaginationLight} from "../../../core/rest/component-pagination.model";
import {PostSortField} from "../../posts/models/post-sort-field.type";
import {Post} from "../../shared-main/post/post.model";
import {Subject} from "rxjs/Subject";
import {User} from "../../../core/interfaces/common/users";
import {ActivatedRoute, Router} from "@angular/router";
import {fromEvent, Observable, Subscription} from "rxjs";
import {LocalStorageService} from "../../../core/wrappers/storage.service";
import {ScreenService} from "../../../core/wrappers/screen.service";
import {debounceTime, switchMap, tap} from "rxjs/operators";
import {isLastMonth, isLastWeek, isThisMonth, isToday, isYesterday} from "../../core-utils/miscs";
import {UsersService} from "../../../core/backend/common/services/users.service";

enum GroupDate {
  UNKNOWN = 0,
  TODAY = 1,
  YESTERDAY = 2,
  THIS_WEEK = 3,
  THIS_MONTH = 4,
  LAST_MONTH = 5,
  OLDER = 6,
}


@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class AbstractPostList implements OnInit, OnDestroy {
  private resizeSubscription: Subscription;
  private angularState: number;

  private groupedDateLabels: { [id in GroupDate]: string };
  private groupedDates: { [id: number]: GroupDate } = {};

  private lastQueryLength: number;

  protected abstract route: ActivatedRoute;
  protected abstract screenService: ScreenService;
  protected abstract storageService: LocalStorageService;
  protected abstract usersService: UsersService;
  protected abstract router: Router;
  abstract titlePage: string;

  pagination: ComponentPaginationLight = {
    currentPage: 1,
    itemsPerPage: 3,
  };
  sort: PostSortField = '-publishedAt';

  categoryOneOf?: number[];
  languageOneOf?: string[];
  defaultSort: PostSortField = '-publishedAt';

  loadOnInit = true;
  useUserVideoPreferences = false;
  displayModerationBlock = false;
  titleTooltip: string;
  displayVideoActions = true;
  groupByDate = false;

  posts: Post[] = [];
  hasDoneFirstQuery = false;
  disabled = false;

  // A Subject is like an Observable, but can multicast to many Observers.
  // Subjects are like EventEmitters: they maintain a registry of many listeners.
  onDataSubject = new Subject<any[]>();

  userMiniature: User;


  abstract getPostsObservable(page: number): Observable<{ data: Post[] }>;

  abstract generateSyndicationList(): void;

  ngOnInit(): void {
    this.groupedDateLabels = {
      [GroupDate.UNKNOWN]: null,
      [GroupDate.TODAY]: `Today`,
      [GroupDate.YESTERDAY]: `Yesterday`,
      [GroupDate.THIS_WEEK]: `This week`,
      [GroupDate.THIS_MONTH]: `This month`,
      [GroupDate.LAST_MONTH]: `Last month`,
      [GroupDate.OLDER]: `Older`,
    };

    // Subscribe to route changes
    const routeParams = this.route.snapshot.queryParams;
    this.loadRouteParams(routeParams);

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => this.calcPageSizes());

    this.calcPageSizes();

    const loadUserObservable = this.loadUserAndSettings();

    if (this.loadOnInit === true) {
      loadUserObservable.subscribe(() => this.loadMoreVideos());
    }

    // this.userService.listenAnonymousUpdate()
    //   .pipe(switchMap(() => this.loadUserAndSettings()))
    //   .subscribe(() => {
    //     if (this.hasDoneFirstQuery) {
    //       this.reloadVideos();
    //     }
    //   });
  }

  ngOnDestroy(): void {
  }

  disableForReuse() {
    this.disabled = true;
  }

  enabledForReuse() {
    this.disabled = false;
  }

  videoById(index: number, video: Post) {
    return video.id;
  }

  onNearOfBottom() {
    if (this.disabled) {
      return;
    }

    // No more results
    if (this.lastQueryLength !== undefined && this.lastQueryLength < this.pagination.itemsPerPage) {
      return;
    }

    this.pagination.currentPage += 1;

    this.setScrollRouteParams();

    this.loadMoreVideos();
  }

  loadMoreVideos(reset = false) {
    this.getPostsObservable(this.pagination.currentPage).subscribe(
      ({data}) => {
        debugger;
        this.hasDoneFirstQuery = true;
        this.lastQueryLength = data.length;

        if (reset) {
          this.posts = [];
        }

        this.posts = this.posts.concat(data);

        if (this.groupByDate) {
          this.buildGroupedDateLabels();
        }

        this.onMoreVideos();

        this.onDataSubject.next(data);
      },

      error => {
        const message = `Cannot load more posts. 😞 Try again later.`;

        console.error(message, {error});
      }
    );
  }

  reloadVideos() {
    this.pagination.currentPage = 1;
    this.loadMoreVideos(true);
  }

  removeVideoFromArray(post: Post) {
    this.posts = this.posts.filter(v => v.id !== post.id);
  }

  buildGroupedDateLabels() {
    let currentGroupedDate: GroupDate = GroupDate.UNKNOWN;

    const periods = [
      {
        value: GroupDate.TODAY,
        validator: (d: Date) => isToday(d)
      },
      {
        value: GroupDate.YESTERDAY,
        validator: (d: Date) => isYesterday(d)
      },
      {
        value: GroupDate.THIS_WEEK,
        validator: (d: Date) => isLastWeek(d)
      },
      {
        value: GroupDate.THIS_MONTH,
        validator: (d: Date) => isThisMonth(d)
      },
      {
        value: GroupDate.LAST_MONTH,
        validator: (d: Date) => isLastMonth(d)
      },
      {
        value: GroupDate.OLDER,
        validator: () => true
      }
    ];

    for (const post of this.posts) {
      const publishedDate = post.createdAt; // publishedAt

      for (let i = 0; i < periods.length; i++) {
        const period = periods[i];

        if (currentGroupedDate <= period.value && period.validator(publishedDate)) {

          if (currentGroupedDate !== period.value) {
            currentGroupedDate = period.value;
            this.groupedDates[post.id] = currentGroupedDate;
          }

          break;
        }
      }
    }
  }

  getCurrentGroupedDateLabel(video: Post) {
    if (this.groupByDate === false) return undefined;

    return this.groupedDateLabels[this.groupedDates[video.id]];
  }

  toggleModerationDisplay() {
    throw new Error('toggleModerationDisplay is not implemented');
  }

  // On videos hook for children that want to do something
  protected onMoreVideos() { /* empty */
  }

  protected loadRouteParams(routeParams: { [key: string]: any }) {
    this.sort = routeParams['sort'] as PostSortField || this.defaultSort;
    this.categoryOneOf = routeParams['categoryOneOf'];
    this.angularState = routeParams['a-state'];
  }

  // protected buildLocalFilter(existing: VideoFilter, base: VideoFilter) {
  //   if (base === 'local') {
  //     return existing === 'local' ? 'all-local' as 'all-local' : 'local' as 'local';
  //   }
  //
  //   return existing === 'all' ? null : 'all';
  // }

  // protected enableAllFilterIfPossible() {
  //   if (!this.authService.isLoggedIn()) {
  //     return;
  //   }
  //
  //   this.authService.userInformationLoaded
  //     .subscribe(() => {
  //       const user = this.authService.getUser();
  //       this.displayModerationBlock = user.hasRight(UserRight.SEE_ALL_VIDEOS);
  //     });
  // }


  private calcPageSizes() {
    if (this.screenService.isInMobileView()) {
      this.pagination.itemsPerPage = 5;
    }
  }

  private setScrollRouteParams() {
    // Already set
    if (this.angularState) return;

    this.angularState = 42;

    const queryParams = {
      'a-state': this.angularState,
      categoryOneOf: this.categoryOneOf
    };

    let path = this.router.url;
    if (!path || path === '/') {
      // path = this.serverConfig.instance.defaultClientRoute;
    }

    this.router.navigate([path], {queryParams, replaceUrl: true, queryParamsHandling: 'merge'});
  }

  private loadUserAndSettings() {
    return this.usersService.getCurrentUser()
      .pipe(tap(user => {
        this.userMiniature = user;

        if (!this.useUserVideoPreferences) {
          return;
        }
      }));
  }

}
