import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faCog} from '@fortawesome/pro-light-svg-icons';
import {UserNotificationsComponent} from "./user-notifications/user-notifications.component";

type NotificationSortType = 'createdAt' | 'read';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  @ViewChild('userNotification', {static: true}) userNotification: UserNotificationsComponent;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.hasUnreadNotifications()) {
        this.markAllAsRead();
      }
    }, 500);

  }

  _notificationSortType: NotificationSortType = 'createdAt';

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

  hasUnreadNotifications() {
    return this.userNotification.notifications.filter(n => n.read === false).length !== 0;
  }

  onChangeSortColumn() {
    this.userNotification.changeSortColumn(this.notificationSortType);
  }

  faCog = faCog;

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
