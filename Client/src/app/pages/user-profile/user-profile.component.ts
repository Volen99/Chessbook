import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Subject} from "rxjs/Subject";
import {Location} from '@angular/common';

import {IUser, UserData} from "../../core/interfaces/common/users";
import {UserStore} from "../../core/stores/user.store";
import {NbTokenService} from "../../sharebook-nebular/auth/services/token/token.service";
import {UserProfileService} from "./user-profile.service";
import {User} from "../../shared/shared-main/user/user.model";
import {HttpStatusCode} from "../../shared/core-utils/miscs";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {Notifier} from "../../core/notification/notifier.service";
import {PostsService} from "../../shared/posts/posts.service";
import {AbstractPostList} from "../../shared/post-miniature/abstract-post-list/abstract-post-list";
import {ScreenService} from 'app/core/wrappers/screen.service';
import {LocalStorageService} from 'app/core/wrappers/storage.service';
import {Post} from 'app/shared/shared-main/post/post.model';
import {immutableAssign} from "../../helpers/utils";
import {GetHomeTimelineParameters} from "../../shared/models/timeline/get-home-timeline-parameters";
import {GetUserTimelineParameters} from "../../shared/models/timeline/get-user-timeline-parameters";
import {UsersService} from "../../core/backend/common/services/users.service";

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends AbstractPostList implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  private routeSub: Subscription;

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected usersService: UsersService,
              private userProfileService: UserProfileService,
              protected screenService: ScreenService,
              protected storageService: LocalStorageService,
              private tokenService: NbTokenService,
              private userStore: UserStore,
              private notifier: Notifier,
              private restExtractor: RestExtractor,
              private postService: PostsService,
              protected location: Location,) {
    super();
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .pipe(
        map(params => params['screenName']),
        distinctUntilChanged(),
        switchMap(screenName => this.userProfileService.getProfile(screenName)),
        tap(profile => this.onAccount(profile)),
        /*switchMap(user => this.postService.getProfilePosts({ user })),*/
        catchError(err => this.restExtractor.redirectTo404IfNotFound(err, 'other', [
          HttpStatusCode.BAD_REQUEST_400,
          HttpStatusCode.NOT_FOUND_404
        ]))
      )
      .subscribe(
        // videoChannels => this.videoChannels = videoChannels.data,
        //
        // err => this.notifier.error(err.message)
      );

    debugger
    super.ngOnInit();

    this.initUser();
  }

  ngOnDestroy() {
  }

  titlePage: string;

  getPostsObservable(page: number): Observable<{ data: Post[] }> {
    const newPagination = immutableAssign(this.pagination, {currentPage: page});

    let parameters = new GetUserTimelineParameters(newPagination, this.sort, true, this.userMiniature.id);
    return this.postService.getUserTimelineQuery(parameters);

  }

  generateSyndicationList(): void {
    throw new Error('Method not implemented.');
  }

  public loggedInUser: IUser;
  public profileCurrent: IUser;

  initUser() {
    return this.usersService.getCurrentUser()
      .pipe(tap(user => {
        this.loggedInUser = user;
      }))
      .subscribe();
  }

  loadUserData() {
    const username = this.route.snapshot.params['username'];
    if (username) {
      const currentUserId = this.userStore.getUser().id;
      this.loadUser(username);
    }
  }

  loadUser(username: number /*string*/) {
    const loadUser = this.usersService.get(username);
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users) => {
        this.loggedInUser = users;
        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });
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

  private async onAccount(user: User) {

    debugger
    // @ts-ignore
    this.profileCurrent = user.userDTO;
    // this.accountFollowerTitle = $localize`${account.followersCount} direct account followers`;
    //
    // this.prependModerationActions = undefined;
    //
    // this.accountDescriptionHTML = await this.markdown.textMarkdownToHTML(account.description);
    //
    // // After the markdown renderer to avoid layout changes
    // this.account = account;
    //
    // this.updateModerationActions();
    // this.loadUserIfNeeded(account);
    // this.loadAccountVideosCount();
  }


  tabs: any[] = [
    {
      title: 'Posts',
      route: './tab1',
    },
    {
      title: 'Posts & replies',
      route: ['./tab2'],
    },
    {
      title: 'Media',
      route: './tab3'
      // icon: 'flash-outline',
      // responsive: true,
      // disabled: true,
    },
    {
      title: 'Likes',
      route: './tab4'
    },
    // {
    //   title: 'Dislikes',
    //   route: './tab5'
    // },
  ];

  back() {
    this.location.back();
    return false;
  }
}
