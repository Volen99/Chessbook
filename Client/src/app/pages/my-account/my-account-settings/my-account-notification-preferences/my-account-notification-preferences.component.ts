import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators";
import {debounce} from 'lodash-es';

import {User} from "../../../../shared/shared-main/user/user.model";
import {
  UserNotificationSetting,
  UserNotificationSettingValue
} from "../../../../shared/models/users/user-notification-setting.model";
import {UserRight} from "../../../../shared/models/users/user-right.enum";
import {ServerService} from "../../../../core/server/server.service";
import {Notifier} from "../../../../core/notification/notifier.service";
import {UserNotificationService} from "../../../../shared/shared-main/users/user-notification.service";
import {IUser} from "../../../../core/interfaces/common/users";
import {UserStore} from "../../../../core/stores/user.store";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {NbGlobalPhysicalPosition} from "../../../../sharebook-nebular/theme/components/cdk/overlay/position-helper";

@Component({
  selector: 'my-account-notification-preferences',
  templateUrl: './my-account-notification-preferences.component.html',
  styleUrls: ['./my-account-notification-preferences.component.scss']
})
export class MyAccountNotificationPreferencesComponent implements OnInit, OnDestroy {
  @Input() user: User = null;
  @Input() userInformationLoaded: Subject<any>;

  notificationSettingKeys: (keyof UserNotificationSetting)[] = [];
  emailNotifications: { [id in keyof UserNotificationSetting]: boolean } = {} as any;
  webNotifications: { [id in keyof UserNotificationSetting]: boolean } = {} as any;
  labelNotifications: { [id in keyof UserNotificationSetting]: string } = {} as any;
  rightNotifications: { [id in keyof Partial<UserNotificationSetting>]: UserRight } = {} as any;
  emailEnabled = true;

  private savePreferences = debounce(this.savePreferencesImpl.bind(this), 500);

  constructor(private userNotificationService: UserNotificationService, private serverService: ServerService, private notifier: Notifier,
              private userStore: UserStore, private toasterService: NbToastrService) {
    this.labelNotifications = {
      newVideoFromSubscription: `New video from your subscriptions`,
      newCommentOnMyVideo: `New comment on your video`,
      abuseAsModerator: `New abuse`,
      videoAutoBlacklistAsModerator: `Video blocked automatically waiting review`,
      blacklistOnMyVideo: `One of your video is blocked/unblocked`,
      myVideoPublished: `Video published (after transcoding/scheduled update)`,
      myVideoImportFinished: `Video import finished`,
      newUserRegistration: `A new user registered on your instance`,
      newFollow: `You or your channel(s) has a new follower`,
      commentMention: `Someone mentioned you in video comments`,
      newInstanceFollower: `Your instance has a new follower`,
      autoInstanceFollowing: `Your instance automatically followed another instance`,
      abuseNewMessage: `An abuse report received a new message`,
      abuseStateChange: `One of your abuse reports has been accepted or rejected by moderators`
    };
    this.notificationSettingKeys = Object.keys(this.labelNotifications) as (keyof UserNotificationSetting)[];

    this.rightNotifications = {
      abuseAsModerator: UserRight.MANAGE_ABUSES,
      videoAutoBlacklistAsModerator: UserRight.MANAGE_VIDEO_BLACKLIST,
      newUserRegistration: UserRight.MANAGE_USERS,
      newInstanceFollower: UserRight.MANAGE_SERVER_FOLLOW,
      autoInstanceFollowing: UserRight.MANAGE_CONFIGURATION
    };
  }

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    // this.serverService.getConfig()
    //   .subscribe(config => {
    //     this.emailEnabled = config.email.enabled;
    //   });

    // this.userInformationLoaded.subscribe(() => this.loadNotificationSettings());

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: IUser) => {
        this.loadNotificationSettings();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  hasUserRight(field: keyof UserNotificationSetting) {
    const rightToHave = this.rightNotifications[field];
    if (!rightToHave) {
      return true; // No rights needed
    }

    /*debugger
    return this.user?.hasRight(rightToHave);*/

    return true;
  }

  updateEmailSetting(field: keyof UserNotificationSetting, value: boolean) {
    if (value === true) {
      this.user.notificationSettings[field] |= UserNotificationSettingValue.EMAIL;
    } else {
      this.user.notificationSettings[field] &= ~UserNotificationSettingValue.EMAIL;
    }

    this.savePreferences();
  }

  updateWebSetting(field: keyof UserNotificationSetting, value: boolean) {
    if (value === true) {
      this.user.notificationSettings[field] |= UserNotificationSettingValue.WEB;
    } else {
      this.user.notificationSettings[field] &= ~UserNotificationSettingValue.WEB;
    }

    this.savePreferences();
  }

  private savePreferencesImpl() {
    this.userNotificationService.updateNotificationSettings(this.user.notificationSettings)
      .subscribe(
        () => {
          this.toasterService.success('Preferences saved', 'Success', {
            position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
          });
        },

        err => console.error(err.message)
      );
  }

  private loadNotificationSettings() {
    for (const key of Object.keys(this.user.notificationSettings)) {
      const value = this.user.notificationSettings[key];
      this.emailNotifications[key] = value & UserNotificationSettingValue.EMAIL;

      this.webNotifications[key] = value & UserNotificationSettingValue.WEB;
    }
  }
}
