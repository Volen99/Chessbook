import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {Subject} from "rxjs/Subject";
import {catchError, distinctUntilChanged, first, map, switchMap, takeUntil, tap} from 'rxjs/operators';

import {faLongArrowLeft, faBirthdayCake, faCalendarAlt, faEllipsisH} from '@fortawesome/pro-light-svg-icons';

import {IUser} from "../../core/interfaces/common/users";
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
import {GetUserTimelineParameters} from "../../shared/models/timeline/get-user-timeline-parameters";
import {UsersService} from "../../core/backend/common/services/users.service";
import {RelationshipsService} from "../../shared/shared-main/relationships/relationships.service";
import {
  GetRelationshipBetweenParameters,
} from "../../shared/shared-main/relationships/models/get-relationship-between-parameters.model";
import {IRelationshipDetails} from "../../shared/shared-main/relationships/models/relationship-details.model";
import {Month} from "../my-account/my-account-settings/my-account-profile/my-account-profile.component";
import {DropdownAction} from "../../shared/shared-main/buttons/action-dropdown.component";
import {RedirectService} from "../../core/routing/redirect.service";
import {UserRight} from "../../shared/models/users/user-right.enum";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {InitUserService} from "../../theme/services/init-user.service";
import {NbDialogService} from "../../sharebook-nebular/theme/components/dialog/dialog.service";
import {AccountReportComponent} from "../../shared/shared-moderation/report-modals/account-report.component";
import {MediaContainerComponent} from "../../features/media-container/media-container.component";
import {Title} from "@angular/platform-browser";

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  private routeSub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private location: Location,
              private notifier: NbToastrService,
              private userProfileService: UserProfileService,
              private userStore: UserStore,
              private restExtractor: RestExtractor,
              private postService: PostsService,
              private relationshipsService: RelationshipsService,
              private redirectService: RedirectService,
              private initUserService: InitUserService,
              private dialogService: NbDialogService,
              private titleService: Title) {
  }

  private accountSub: Subscription;

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
      .subscribe((data) => {
          // videoChannels => this.videoChannels = videoChannels.data,
          //
          // err => this.notifier.error(err.message)
        }
      );
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
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

  prependModerationActions: DropdownAction<any>[];

  birthday: {};

  relationshipDetails: IRelationshipDetails;

  faLongArrowLeft = faLongArrowLeft;
  faBirthdayCake = faBirthdayCake;
  faCalendarAlt = faCalendarAlt;

  titlePage: string;

  month: string;
  day: number;
  year: number;

  svgStyles = {
    display: 'inline-block',
    fill: 'currentcolor',
    'flex-shrink': '0',
    width: '1.5em',
    height: '1.5em',
    'max-width': '100% ',
    position: 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };

  monthEnum = Month;

  loggedInUser: IUser;
  profileCurrent: IUser;

  // snapshot only gets the initial value of the parameter map with this technique.
  // Use the observable paramMap approach if there's a possibility that the router
  // could re-use the component. This tutorial sample app uses with the observable paramMap.
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

  onUserChanged() {
    this.loadUserIfNeeded(this.profileCurrent);
  }

  onUserDeleted() {
    this.redirectService.redirectToHomepage();
  }

  back() {
    this.location.back();
    return false;
  }

  isUserLoggedIn() {
    return !!this.userStore.getUser();
  }

  private loadUserIfNeeded(account: IUser) {
    if (!account.id || !this.isUserLoggedIn()) {
      return;
    }

    const user = this.userStore.getUser();
    if (user.hasRight(UserRight.MANAGE_USERS)) {
      this.usersService.getUser(account.id).subscribe(
        // accountUser => this.accountUser = accountUser,

        err => this.notifier.danger(err.message, 'Error')
      );
    }
  }

  private async onAccount(user: User) {
    let title = `${user.displayName} / Chessbook`;

    this.titleService.setTitle(title);

    // @ts-ignore
    this.profileCurrent = user; // TODO: new it
    this.profileCurrent.createdOn = new Date(this.profileCurrent.createdOn);

    const currentUserId = this.userStore.getUser().id;
    if (currentUserId === this.profileCurrent.id) {
      this.usersService.getYourBirthday(currentUserId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((birthday) => {
          this.month = Month[birthday.dateOfBirthMonth];
          this.day = birthday.dateOfBirthDay?.toString();
          this.year = birthday.dateOfBirthYear?.toString();
        });
    }

    let relationshipBetweenParameters = new GetRelationshipBetweenParameters(this.userStore.getUser().id, this.profileCurrent.id);
    this.relationshipsService.show(relationshipBetweenParameters)
      .subscribe((data: IRelationshipDetails) => {
        this.relationshipDetails = data;
      });


    // this.accountFollowerTitle = $localize`${account.followersCount} direct account following`;
    //
    this.prependModerationActions = undefined;
    //
    // this.accountDescriptionHTML = await this.markdown.textMarkdownToHTML(account.description);
    //
    // // After the markdown renderer to avoid layout changes
    // this.account = account;
    //
    this.updateModerationActions();
    // this.loadUserIfNeeded(account);
    // this.loadAccountVideosCount();
  }

  isManageable() {
    if (!this.isUserLoggedIn()) {
      return false;
    }

    return this.profileCurrent?.id === this.userStore.getUser().id;
  }

  handleOpenMedia(media, index) {
    this.dialogService.open(MediaContainerComponent, {
      context: {
        media,
        index,
      },

    });
  }

  private updateModerationActions() {
    if (!!this.userStore.getUser()) {
      return;
    }

    this.initUserService.settingsLoaded$.subscribe(
      () => {
        if (this.isManageable()) {
          return;
        }

        // It's not our account, we can report it
        this.prependModerationActions = [
          {
            label: `Report this account`,
            handler: () => this.showReportModal()
          }
        ];
      }
    );
  }

  private showReportModal() {
    this.dialogService.open(AccountReportComponent, {
      context: {
        // @ts-ignore
        account: this.profileCurrent,
      },
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

}
