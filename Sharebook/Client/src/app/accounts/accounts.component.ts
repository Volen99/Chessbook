import {Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpStatusCode} from "../shared/core-utils/miscellaneous/http-error-codes";
import {User} from "../shared/models/users/user.model";
import {UserRight} from "../shared/models/users/user-right.enum";
import {UserService} from "../core/users/user.service";
import {Notifier} from "../core/notification/notifier-service";
import {RestExtractor} from "../core/rest/rest-extractor.service";
import {RedirectService} from "../core/routing/redirect.service";
import {ScreenService} from "../core/wrappers/screen.service";
import {Account} from "../shared/main/account/account.model";
import {AccountReportComponent} from "../shared/shared-moderation/report-modals/account-report.component";
import {VideoChannel} from "../shared/main/video-channel/video-channel.model";
import {ListOverflowItem} from "../shared/main/misc/list-overflow.component";
import {DropdownAction} from "../shared/main/buttons/action-dropdown.component";
import {AccountService} from "../shared/main/account/account.service";
import {VideoChannelService} from "../shared/main/video-channel/video-channel.service";
import {AuthService} from "../core/auth/auth.service";

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  @ViewChild('accountReportModal') accountReportModal: AccountReportComponent;

  account: Account;
  accountUser: User;
  videoChannels: VideoChannel[] = [];
  links: ListOverflowItem[] = [];

  isAccountManageable = false;
  accountFollowerTitle = '';

  prependModerationActions: DropdownAction<any>[];

  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private videoChannelService: VideoChannelService,
    private notifier: Notifier,
    private restExtractor: RestExtractor,
    private redirectService: RedirectService,
    private authService: AuthService,
    private screenService: ScreenService
  ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .pipe(
        map(params => params['accountId']),
        distinctUntilChanged(),
        switchMap(accountId => this.accountService.getAccount(accountId)),
        tap(account => this.onAccount(account)),
        switchMap(account => this.videoChannelService.listAccountVideoChannels(account)),
        catchError(err => this.restExtractor.redirectTo404IfNotFound(err, [
          HttpStatusCode.BAD_REQUEST_400,
          HttpStatusCode.NOT_FOUND_404
        ]))
      )
      .subscribe(
        videoChannels => this.videoChannels = videoChannels.data,

        err => this.notifier.error(err.message)
      );

    this.links = [
      {label: $localize`VIDEO CHANNELS`, routerLink: 'video-channels'},
      {label: $localize`VIDEOS`, routerLink: 'videos'},
      {label: $localize`ABOUT`, routerLink: 'about'}
    ];
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  get naiveAggregatedSubscribers() {
    return this.videoChannels.reduce(
      (acc, val) => acc + val.followersCount,
      this.account.followersCount // accumulator starts with the base number of subscribers the account has
    );
  }

  get isInSmallView() {
    return this.screenService.isInSmallView();
  }

  onUserChanged() {
    this.getUserIfNeeded(this.account);
  }

  onUserDeleted() {
    this.redirectService.redirectToHomepage();
  }

  activateCopiedMessage() {
    this.notifier.success($localize`Username copied`);
  }

  subscribersDisplayFor(count: number) {
    if (count === 1) {
      return $localize`1 subscriber`;
    }

    return $localize`${count} subscribers`;
  }

  private onAccount(account: Account) {
    this.prependModerationActions = undefined;

    this.account = account;

    if (this.authService.isLoggedIn()) {
      this.authService.userInformationLoaded.subscribe(
        () => {
          this.isAccountManageable = this.account.userId && this.account.userId === this.authService.getUser().id;

          const followers = this.subscribersDisplayFor(account.followersCount);
          this.accountFollowerTitle = $localize`${followers} direct account followers`;

          // It's not our account, we can report it
          if (!this.isAccountManageable) {
            this.prependModerationActions = [
              {
                label: $localize`Report this account`,
                handler: () => this.showReportModal()
              }
            ];
          }
        }
      );
    }

    this.getUserIfNeeded(account);
  }

  private showReportModal() {
    this.accountReportModal.show();
  }

  private getUserIfNeeded(account: Account) {
    if (!account.userId || !this.authService.isLoggedIn()) {
      return;
    }

    const user = this.authService.getUser();
    if (user.hasRight(UserRight.MANAGE_USERS)) {
      this.userService.getUser(account.userId).subscribe(
        accountUser => this.accountUser = accountUser,

        err => this.notifier.error(err.message)
      );
    }
  }
}
