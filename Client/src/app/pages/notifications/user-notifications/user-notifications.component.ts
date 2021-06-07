import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {UserNotification} from "../../../shared/shared-main/users/user-notification.model";
import {ComponentPagination, hasMoreItems} from "../../../core/rest/component-pagination.model";
import {UserNotificationService} from "../../../shared/shared-main/users/user-notification.service";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {AbuseState} from "../../../shared/models/moderation/abuse/abuse-state.model";
import {faExclamationTriangle} from '@fortawesome/pro-light-svg-icons';
import {
  faUser as faUserSolid,
} from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-user-notifications',
  templateUrl: 'user-notifications.component.html',
  styleUrls: ['user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit {
  @Input() ignoreLoadingBar = false;
  @Input() infiniteScroll = true;
  @Input() itemsPerPage = 20;
  @Input() markAllAsReadSubject: Subject<boolean>;

  @Output() notificationsLoaded = new EventEmitter();

  notifications: UserNotification[] = [];
  sortField = 'createdAt';

  componentPagination: ComponentPagination;

  onDataSubject = new Subject<any[]>();

  constructor(private userNotificationService: UserNotificationService, private toasterService: NbToastrService) {
  }

  ngOnInit() {
    this.componentPagination = {
      currentPage: 1,
      itemsPerPage: this.itemsPerPage, // Reset items per page, because of the @Input() variable
      totalItems: null
    };

    this.loadNotifications();

    if (this.markAllAsReadSubject) {
      this.markAllAsReadSubject.subscribe(() => this.markAllAsRead());
    }
  }

  faExclamationTriangle = faExclamationTriangle;
  faUserSolid = faUserSolid;

  loadNotifications(reset?: boolean) {
    const options = {
      pagination: this.componentPagination,
      ignoreLoadingBar: this.ignoreLoadingBar,
      sort: {
        field: this.sortField,
        // if we order by creation date, we want DESC. all other fields are ASC (like unread).
        order: this.sortField === 'createdAt' ? -1 : 1
      }
    };

    this.userNotificationService.listMyNotifications(options)
      .subscribe(
        result => {
          console.log(result);
          debugger
          // @ts-ignore
          this.notifications = reset ? result.data : this.notifications.concat(result.data);
          this.componentPagination.totalItems = result.total;

          this.notificationsLoaded.emit();

          this.onDataSubject.next(result.data);
        },

        err => this.toasterService.danger(err.message)
      );
  }

  onNearOfBottom() {
    if (this.infiniteScroll === false) return;

    this.componentPagination.currentPage++;

    if (hasMoreItems(this.componentPagination)) {
      this.loadNotifications();
    }
  }

  markAsRead(notification: UserNotification) {
    if (notification.read) return;

    this.userNotificationService.markAsRead(notification)
      .subscribe(
        () => {
          notification.read = true;
        },

        err => this.toasterService.danger(err.message)
      );
  }

  markAllAsRead() {
    this.userNotificationService.markAllAsRead()
      .subscribe(
        () => {
          for (const notification of this.notifications) {
            notification.read = true;
          }
        },

        err => this.toasterService.danger(err.message)
      );
  }

  changeSortColumn(column: string) {
    this.componentPagination = {
      currentPage: 1,
      itemsPerPage: this.itemsPerPage,
      totalItems: null
    };
    this.sortField = column;
    this.loadNotifications(true);
  }

  isAccepted(notification: UserNotification) {
    return notification.abuse.state === AbuseState.ACCEPTED;
  }
}
