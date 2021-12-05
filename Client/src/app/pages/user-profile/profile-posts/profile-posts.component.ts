import {ActivatedRoute, Router} from "@angular/router";
import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Subscription} from 'rxjs';

import {AbstractPostList} from "../../../shared/post-miniature/abstract-post-list";
import {immutableAssign} from "../../../helpers/utils";
import {PostFilter} from "../../../shared/posts/models/post-query.type";
import {ServerService} from "../../../core/server/server.service";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ConfirmService} from "../../../core/confirm/confirm.service";
import {ScreenService} from "../../../core/wrappers/screen.service";
import {LocalStorageService} from "../../../core/wrappers/storage.service";
import {UsersService} from "../../../core/backend/common/services/users.service";
import {UserStore} from "../../../core/stores/user.store";
import {User} from "../../../shared/shared-main/user/user.model";
import {UserProfileService} from "../user-profile.service";
import {PostsService} from "../../../shared/posts/posts.service";
import {IUser} from "../../../core/interfaces/common/users";
import {InitUserService} from "../../../theme/services/init-user.service";
import {Post} from "../../../shared/shared-main/post/post.model";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['../user-profile.component.scss', './profile-posts.component.scss']
})
export class ProfilePostsComponent extends AbstractPostList implements OnInit, OnDestroy, OnChanges {
  @Input() profileCurrent: IUser;
  @Input() tab: string;

  // No value because we don't want a page title
  titlePage: string;
  loadOnInit = false;
  loadUserVideoPreferences = true;

  filter: PostFilter = null;

  private account: User;
  private accountSub: Subscription;

  constructor(
    protected router: Router,
    protected serverService: ServerService,
    protected route: ActivatedRoute,
    protected authService: UserStore,
    protected usersService: UsersService,
    protected notifier: NbToastrService,
    protected confirmService: ConfirmService,
    protected screenService: ScreenService,
    protected storageService: LocalStorageService,
    protected cfr: ComponentFactoryResolver,
    private userProfileService: UserProfileService,
    private postService: PostsService,
    protected initCurrentUser: InitUserService,
    protected userStore: UserStore,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.postTransformBuffer = 0;
    this.pinnedPost = null;
    // so user posts change when profile changes kk
    this.reloadVideos();
  }

  ngOnInit() {
    super.ngOnInit();

    this.enableAllFilterIfPossible();

    // // Parent get the account for us
    // this.accountSub = forkJoin([
    //   this.userProfileService.accountLoaded.pipe(first()),
    //   this.onUserLoadedSubject.pipe(first())
    // ]).subscribe(([account]) => {
    //   this.profileCurrent = account;
    //
    //   this.reloadVideos();
    //   this.generateSyndicationList();
    // });

      if (this.pinnedPost) {
        this.posts.unshift(this.pinnedPost);
      }
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }

    super.ngOnDestroy();
    this.postTransformBuffer = 0;
    this.pinnedPost = null;
  }

  pinnedPost: Post;
  postTransformBuffer: number = 0;

  setTransformBuffer = buffer => {
    this.postTransformBuffer = buffer;
  }

  getPostsObservable(page: number) {
    const newPagination = immutableAssign(this.pagination, { currentPage: page });
    const params = {
      videoPagination: newPagination,
      sort: this.sort,
      skipCount: true,
      userId: this.profileCurrent.id,
    };

    return this.postService.getUserTimelineQuery(params);
  }

  toggleModerationDisplay() {
    this.filter = this.buildLocalFilter(this.filter, null);

    this.reloadVideos();
  }

  generateSyndicationList() {
    // this.syndicationItems = this.videoService.getAccountFeedUrls(this.account.id);
  }

  displayAsRow() {
    return this.screenService.isInMobileView();
  }

  calcMinHeight(postsCount?: number): number {
    if (!postsCount) {
      return 670;
    }

    return postsCount * 470;
  }

}
