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
import {AbstractPostList} from "../../shared/post-miniature/abstract-post-list";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {PostFilter} from "../../shared/posts/models/post-query.type";
import {PostSortField} from "../../shared/posts/models/post-sort-field.type";
import {UserFollowService} from "../../shared/user-follow/user-follow.service";
import {UserStore} from '../../core/stores/user.store';
import {InitUserService} from '../../theme/services/init-user.service';

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

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected usersService: UsersService,
              protected screenService: ScreenService,
              protected storageService: LocalStorageService,
              private postsService: PostsService,
              protected notifier: NbToastrService,
              protected userStore: UserStore,
              private userFollowService: UserFollowService,
              protected initCurrentUser: InitUserService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    setTimeout(() => {
      this.isFishSwimming = true;
      setTimeout(() => {
        this.isFishSwimming = false;
      }, 12000);
    }, 720000);

    this.enableAllFilterIfPossible();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.postTransformBuffer = 0;

    this.posts = [];
  }

  anim: any;
  fadeIn = {value: '', params: {direction: ''}};

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

  animationCreated(animationItem: AnimationItem): void {
    this.anim = animationItem;
  }

  generateSyndicationList(): void {
    throw new Error('Method not implemented.');
  }

  getPostsObservable(page: number): Observable<{ data: Post[] }> {
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

    // TODO: if postsCount === 1, multiply accordingly with testing kk :)

    return postsCount * 470;
  }

  postTransformBuffer: number = 0;

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

  setTransformBuffer = buffer => {
    this.postTransformBuffer = buffer;
  }

}
