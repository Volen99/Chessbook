import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {HttpParams} from "@angular/common/http";
import {Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Subject} from "rxjs/Subject";

import {
  faBirthdayCake,
  faCalendarAlt,
  faGlobe,
  faLongArrowLeft,
  faEnvelope,
  faBan,
  faFlag,
  faCircle,
  faBookHeart,
} from '@fortawesome/pro-light-svg-icons';

import {IUser} from "../../core/interfaces/common/users";
import {UserStore} from "../../core/stores/user.store";
import {UserProfileService} from "./user-profile.service";
import {User} from "../../shared/shared-main/user/user.model";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {PostsService} from "../../shared/posts/posts.service";
import {UsersService} from "../../core/backend/common/services/users.service";
import {RelationshipsService} from "../../shared/shared-main/relationships/relationships.service";
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
import {MarkdownService} from 'app/core/renderer/markdown.service';
import {HttpService} from "../../core/backend/common/api/http.service";
import {RestService} from "../../core/rest/rest.service";
import {ContactAdminModalComponent} from "../../shared/shared-messages/contact-admin-modal.component";
import {BlocklistService} from '../../shared/shared-moderation/blocklist.service';
import {VideosDialogComponent} from '../../shared/videos/videos-dialog.component';

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
              private titleService: Title,
              private markdown: MarkdownService,
              private http: HttpService,
              private restService: RestService,
              private blocklistService: BlocklistService) {
  }

  private accountSub: Subscription;

  ngOnInit() {
      this.routeSub = this.route.params
          .pipe(
              map(params => params['screenName']),
              distinctUntilChanged(),
              switchMap(screenName => this.userProfileService.getProfile(screenName)),
              tap(profile => this.onAccount(profile)),
              // catchError(err => this.restExtractor.redirectTo404IfNotFound(err, 'other', [
              //   HttpStatusCode.BAD_REQUEST_400,
              //   HttpStatusCode.NOT_FOUND_404
              // ]))
          )
          .subscribe((data) => {
                // videoChannels => this.videoChannels = videoChannels.data,
                //
                // err => this.notifier.error(err.message)
              }
          );

      this.tabs = this.getTabs();
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    this.isSearch = false;
  }

  accountDescriptionHTML = '';

  tabs: any[];

  faGlobe = faGlobe;

  prependModerationActions: DropdownAction<any>[];

  birthday: {};

  relationshipDetails: IRelationshipDetails;

  faLongArrowLeft = faLongArrowLeft;
  faBirthdayCake = faBirthdayCake;
  faCalendarAlt = faCalendarAlt;

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

  faEnvelope = faEnvelope;
  faBookHeart = faBookHeart;

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

  noProf: boolean = false;
  private async onAccount(user: User) {
    // coz of return this.NoContent();
    if (!user.screenName) {
      this.profileCurrent = null;
      this.noProf = true;
      return;
    }

    let title = `${user.displayName} / Chessbook`;

    this.titleService.setTitle(title);

    this.prependModerationActions = undefined;

    this.accountDescriptionHTML = await this.markdown.textMarkdownToHTML(user.description);

    // After the markdown renderer to avoid layout changes
    this.profileCurrent = user;
    // this.profileCurrent.createdOn = new Date(this.profileCurrent.createdOn);

    if (!this.isUserLoggedIn()) {
      return;
    }

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

    this.relationshipsService.fetchRelationships([this.profileCurrent.id])
      .subscribe((data: IRelationshipDetails) => {
        this.relationshipDetails = data;
      });


    // this.accountFollowerTitle = `${account.followersCount} direct account following`;
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

  handleOpenMedia(bannerOrAvatar: 'banner' | 'avatar', index) {
    if ((bannerOrAvatar === 'banner' && this.profileCurrent.profileBannerURL.includes('default-banner'))
      || (bannerOrAvatar === 'avatar' && this.profileCurrent.profileImageUrlHttps.includes('default-avatar'))) {
      return;
    }

    let params = new HttpParams();

    let res = bannerOrAvatar === 'banner' ? 'banner' : 'avatar';
    params = this.restService.addParameterToQuery(params, 'bannerOrAvatar', res);

    this.http.get('users/user-photo/' + this.profileCurrent.id, {params})
      .subscribe((data) => {
        this.dialogService.open(MediaContainerComponent, {
          context: {
            media: [data],
            index,
          },
        });
      });
  }

  hasSocialLink() {
    return !!(this.profileCurrent.websiteLink || this.profileCurrent.twitterLink || this.profileCurrent.twitchLink
      || this.profileCurrent.youtubeLink || this.profileCurrent.facebookLink || this.profileCurrent.instagramLink);
  }

  shouldISpaceAround() {
    let arr = [this.profileCurrent.websiteLink, this.profileCurrent.twitterLink, this.profileCurrent.twitchLink,
      this.profileCurrent.youtubeLink, this.profileCurrent.facebookLink, this.profileCurrent.instagramLink];

    if (arr.filter(s => s).length === 2) {
      return 'space-evenly';
    } else if (arr.filter(s => s).length > 2) {
      return 'space-around';
    }

    return '';
  }

  private updateModerationActions() {
    if (!this.userStore.isLoggedIn()) {
      return;
    }

    this.getModerationActions();

    this.initUserService.settingsLoaded$.subscribe(
      () => {
        this.getModerationActions();
      }
    );
  }

  private getModerationActions() {
    if (this.isManageable()) {
      return;
    }

    let blockOrUnblock = this.profileCurrent.blocking
      ? {label: `Unblock ${this.profileCurrent.screenName}`, handler: () => this.unblockUser(), iconName: faCircle}
      : {label: `Block ${this.profileCurrent.screenName}`, handler: () => this.blockUser(), iconName: faBan};

    // It's not our account, we can report it
    this.prependModerationActions = [
      blockOrUnblock,
      {
        label: `Report this account`,
        handler: () => this.showReportModal(),
        iconName: faFlag,
      },
    ];
  }

  private blockUser() {
    if (this.profileCurrent.blocked === true) {
      return;
    }

    this.blocklistService.blockAccountByUser(this.profileCurrent)
      .subscribe(
        () => {
          this.notifier.success('', 'Successfully blocked');

          this.profileCurrent.blocking = true;
          this.getModerationActions();
          /*this.userChanged.emit();*/
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  private unblockUser() {
    if (this.profileCurrent.blocked === false) {
      return;
    }

    this.blocklistService.unblockAccountByUser(this.profileCurrent)
      .subscribe(
        () => {
          this.notifier.success('', 'Successfully unblocked');

          this.profileCurrent.blocking = false;
          this.getModerationActions();
          // this.userChanged.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
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

  public showMessageModal() {
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in to send them a message');
      return;
    }

    this.dialogService.open(ContactAdminModalComponent, {
      context: {
        toCustomerId: this.profileCurrent.id,
        screenName: this.profileCurrent.screenName,
      },
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  showVideosModal() {
    this.dialogService.open(VideosDialogComponent, {
      context: {
        isOpen: true,
        userId: this.profileCurrent.id,
        title: `${this.profileCurrent.displayName}'s Favorite Youtube Videos`,
      },
      closeOnEsc: true,
      closeOnBackdropClick: false,
    });
  }

  isSearch = false;
  searchUser() {
    let inputElement = document.getElementById('search-video') as HTMLInputElement;
    if (!inputElement) {
      return;
    }

    this.isSearch = true;

    inputElement.focus();
    inputElement.value = '@';
  }

  private getTabs() {
    return [
      {
        title: 'Posts',
        route: './',
      },
      {
        title: 'Posts & replies',
        route: ['./replies'],
        disabled: true,
        responsive: true, // hide title before `route-tabs-icon-only-max-width` value
      },
      {
        title: 'Media',
        route: './media',
        disabled: true,
        responsive: true,
      },
      {
        title: 'Likes',
        route: './likes',
        disabled: true,
        responsive: true,
      },
    ];
  }

}
