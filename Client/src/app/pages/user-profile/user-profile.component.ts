import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
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

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  private routeSub: Subscription;

  constructor(private userProfileService: UserProfileService,
              private usersService: UserData,
              private router: Router,
              private route: ActivatedRoute,
              private tokenService: NbTokenService,
              private userStore: UserStore,
              private notifier: Notifier,
              private restExtractor: RestExtractor,
              protected location: Location) {
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .pipe(
        map(params => params['screenName']),
        distinctUntilChanged(),
        switchMap(screenName => this.userProfileService.getProfile(screenName)),
        tap(profile => this.onAccount(profile)),
        // switchMap(account => this.videoChannelService.listAccountVideoChannels(account)),
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

    this.initUser();
  }

  ngOnDestroy() {
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

  private async onAccount(user: User) {

    this.profileCurrent = user;
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
