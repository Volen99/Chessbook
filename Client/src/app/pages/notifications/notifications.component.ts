import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {
  faCog,
  faBroom,
} from '@fortawesome/pro-light-svg-icons';

import {UserNotificationsComponent} from "./user-notifications/user-notifications.component";

type NotificationSortType = 'createdAt' | 'read';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  @ViewChild('userNotification', {static: true}) userNotification: UserNotificationsComponent;

  _notificationSortType: NotificationSortType = 'createdAt';
  unreadNotifications = 0;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.hasUnreadNotifications()) {
        this.markAllAsRead();
      }
    }, 500);

  }

  get notificationSortType() {
    return !this.hasUnreadNotifications()
      ? 'createdAt'
      : this._notificationSortType;
  }

  set notificationSortType(type: NotificationSortType) {
    this._notificationSortType = type;
  }

  markAllAsRead() {
    this.userNotification.markAllAsRead();
  }

  clearAll(event: any) {
    event.preventDefault();

    this.userNotification.clearAll();

  }

  hasUnreadNotifications() {
    return this.userNotification.notifications.filter(n => n.read === false).length !== 0;
  }

  onChangeSortColumn() {
    this.userNotification.changeSortColumn(this.notificationSortType);
  }

  faCog = faCog;
  faBroom = faBroom;

  tabs: any[] = [
    {
      title: 'All',
      route: '/notifications',
    },
    {
      title: 'Mentions',
      route: ['/notifications/mentions'],
    },
  ];

}
