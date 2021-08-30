import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs";
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

import {UsersService} from "../../core/backend/common/services/users.service";
import {ScreenService} from "../../core/wrappers/screen.service";
import {LocalStorageService} from "../../core/wrappers/storage.service";
import {PostsService} from "../../shared/posts/posts.service";
import {Post} from "../../shared/shared-main/post/post.model";
import {immutableAssign, scrollToTop} from "../../helpers/utils";
import {GetHomeTimelineParameters} from "../../shared/models/timeline/get-home-timeline-parameters";
import {AbstractPostList} from "../../shared/post-miniature/abstract-post-list";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {UserStore} from 'app/core/stores/user.store';
import {InitUserService} from 'app/theme/services/init-user.service';
import {PostFilter} from "../../shared/posts/models/post-query.type";
import {PostSortField} from "../../shared/posts/models/post-sort-field.type";
import {environment} from "../../../environments/environment";
import {UserFollowService} from "../../shared/user-follow/user-follow.service";

const voidState = style({
  transform: 'translateX({{ direction }}110%)',
  height: 0,
  marginLeft: '0',
  marginRight: '0',
  marginTop: '0',
  marginBottom: '0',
  width: '88%'
});

const defaultOptions = {params: {direction: ''}};


@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [voidState, animate(5000)], defaultOptions),
      transition(':leave', [animate(5000, voidState)], defaultOptions),
    ]),
  ],
})
export class HomePageComponent extends AbstractPostList implements OnInit, OnDestroy {
  private loaded = false;
  private currentPage = 1;
  private maxPage = 20;
  private lastWasEmpty = false;
  private isLoading = false;


  public anim: any;
  fadeIn = {value: '', params: {direction: ''}};

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    this.anim = animationItem;
  }

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected usersService: UsersService,
              protected screenService: ScreenService,
              protected storageService: LocalStorageService,
              private postsService: PostsService,
              protected notifier: NbToastrService,
              protected userStore: UserStore,
              private userFollowService: UserFollowService,
              protected initCurrentUser: InitUserService
) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    setTimeout(() => {
      this.isFishSwimming = true;
      setTimeout(() => {
        this.isFishSwimming = false;
      }, 5000);
    }, 4000);

    // const user = this.userStore.getUser();
    let feedUrl = environment.apiUrl;

    this.enableAllFilterIfPossible();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  lottieOptions: AnimationOptions = {
    path: '/assets/animations/fish.json',
    autoplay: true,
    loop: true
  };

  titlePage: string;
  sort = '-publishedAt' as PostSortField;
  filter: PostFilter = 'local';

  isFishSwimming = false; // 🐟

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '9%',
    height: '46px',
    marginTop: '-19px',
    /*margin: '0 auto',*/
  };

  generateSyndicationList(): void {
    throw new Error('Method not implemented.');
  }

  getPostsObservable(page: number): Observable<{ data: Post[] }> {
    // const newPagination = immutableAssign(this.pagination, {currentPage: page});
    //
    // return this.postsService.getHomeTimelinePosts(new GetHomeTimelineParameters(newPagination, this.sort, true));

    const newPagination = immutableAssign(this.pagination, { currentPage: page });
    const params = {
      videoPagination: newPagination,
      sort: this.sort,
      skipCount: true
    };

    return this.userFollowService.getUserSubscriptionVideos(params);
  }

  handleHeaderClick() {
    scrollToTop();
  }

  calcMinHeight(postsCount?: number): number {
    if (!postsCount) {
      return 670;
    }

    return postsCount * 670;
  }

  setTransform(i: number): number {
    return i * 388.7; // 😁
  }

  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  removeVideoFromArray(post: Post) {
    super.removeVideoFromArray(post);
  }

  toggleModerationDisplay() {
    this.filter = this.buildLocalFilter(this.filter, 'local');

    this.reloadVideos();
  }

}
