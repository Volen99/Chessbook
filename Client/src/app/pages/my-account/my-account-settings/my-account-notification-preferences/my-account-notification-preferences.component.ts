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

  constructor(private userNotificationService: UserNotificationService, private serverService: ServerService,
              private userStore: UserStore, private notifier: NbToastrService) {
    this.labelNotifications = {
      newVideoFromSubscription: `New post from your followings`,
      newCommentOnMyVideo: `New comment on your post`,
      abuseAsModerator: `New private message`,
      // blacklistOnMyVideo: `One of your post is blocked/unblocked`,
      newFollow: `You has a new follower`,
      commentMention: `Someone mentioned you in post comments`,
      // abuseNewMessage: `An abuse report received a new message`,
      // abuseStateChange: `One of your abuse reports has been accepted or rejected by moderators`
    };
    this.notificationSettingKeys = Object.keys(this.labelNotifications) as (keyof UserNotificationSetting)[];

    this.rightNotifications = {
      // abuseAsModerator: UserRight.MANAGE_ABUSES,
      // ..
    };
  }

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
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

    return this.user?.hasRight(rightToHave);
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
          this.notifier.success('Preferences saved', 'Success');
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
