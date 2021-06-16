import {Component, ViewChild} from '@angular/core';
import {
  faCog,
  faCheck,
  faCheckCircle,
} from '@fortawesome/pro-light-svg-icons';

import {UserNotificationsComponent} from "../../notifications/user-notifications/user-notifications.component";

type NotificationSortType = 'createdAt' | 'read';

@Component({
  templateUrl: './my-account-notifications.component.html',
  styleUrls: ['./my-account-notifications.component.scss']
})
export class MyAccountNotificationsComponent {
  @ViewChild('userNotification', {static: true}) userNotification: UserNotificationsComponent;

  _notificationSortType: NotificationSortType = 'createdAt';

  get notificationSortType() {
    return !this.hasUnreadNotifications()
      ? 'createdAt'
      : this._notificationSortType;
  }

  set notificationSortType(type: NotificationSortType) {
    this._notificationSortType = type;
  }

  faCog = faCog;
  faCheck = faCheck;
  faCheckCircle = faCheckCircle;

  markAllAsRead() {
    this.userNotification.markAllAsRead();
  }

  hasUnreadNotifications() {
    return this.userNotification.notifications.filter(n => n.read === false).length !== 0;
  }

  onChangeSortColumn() {
    this.userNotification.changeSortColumn(this.notificationSortType);
  }
}
