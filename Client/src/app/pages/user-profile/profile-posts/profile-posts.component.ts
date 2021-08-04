import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {first, tap} from 'rxjs/operators';

import {AbstractPostList} from "../../../shared/post-miniature/abstract-post-list/abstract-post-list";
import {immutableAssign} from "../../../helpers/utils";
import {PostFilter} from "../../../shared/posts/models/post-query.type";
import {ActivatedRoute, Router} from "@angular/router";
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
import {GetUserTimelineParameters} from "../../../shared/models/timeline/get-user-timeline-parameters";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['../user-profile.component.scss', './profile-posts.component.scss']
})
export class ProfilePostsComponent extends AbstractPostList implements OnInit, OnDestroy {
  @Input() profileCurrent: IUser;

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

  ngOnInit() {
    super.ngOnInit();

    this.enableAllFilterIfPossible();

    // Parent get the account for us
    this.accountSub = forkJoin([
      this.userProfileService.accountLoaded.pipe(first()),
      this.onUserLoadedSubject.pipe(first())
    ]).subscribe(([account]) => {
      this.profileCurrent = account;

      this.reloadVideos();
      this.generateSyndicationList();
    });
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }

    super.ngOnDestroy();
  }

  getPostsObservable(page: number) {
    const newPagination = immutableAssign(this.pagination, {currentPage: page});

    let parameters = new GetUserTimelineParameters(newPagination, this.sort, true, this.profileCurrent.id);
    return this.postService.getUserTimelineQuery(parameters);


    // const newPagination = immutableAssign(this.pagination, {currentPage: page});
    // const options = {
    //   user: this.profileCurrent,
    //   videoPagination: newPagination,
    //   sort: this.sort,
    //   videoFilter: this.filter
    // };
    //
    // // @ts-ignore
    // return this.postService.getProfilePosts(options);
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

  setTransform(i: number): number {
    return i * 388.7; // 😁
  }

  calcMinHeight(postsCount?: number): number {
    if (!postsCount) {
      return 670;
    }

    return postsCount * 670;
  }
}
