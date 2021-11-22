import {Component, Input, OnInit} from '@angular/core';
import {User} from "../shared-main/user/user.model";

import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

import {
  faUsers,
} from '@fortawesome/pro-light-svg-icons';

import {IUser} from "../../core/interfaces/common/users";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import {UsersService} from "../../core/backend/common/services/users.service";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {UserStore} from '../../core/stores/user.store';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() more: boolean = false;

  private lastQueryLength: number;

  // A Subject is like an Observable, but can multicast to many Observers.
  // Subjects are like EventEmitters: they maintain a registry of many listeners.
  onDataSubject = new Subject<any[]>();

  constructor(private router: Router, private userService: UsersService,
              private notifier: NbToastrService, private userStore: UserStore) {
  }

  ngOnInit(): void {
    if (this.more) {
      this.loadMoreUsers(true);
    }
  }

  faUsers = faUsers;

  pagination: ComponentPaginationLight = {
    currentPage: 1,
    itemsPerPage: 3,
  };

  hasDoneFirstQuery = false;
  disabled = false;


  loadMoreUsers(reset = false) {
    this.userService.getUsers({pagination: this.pagination})
      .subscribe(res => {

        this.hasDoneFirstQuery = true;
        this.lastQueryLength = res.data.length;

        if (reset) {
          this.users = [];
        }

        this.users = this.users.concat(res.data);

        this.pagination.totalItems = res.total;

        this.loading = false;

        // this.onDataSubject.next(data);
      }, error => this.notifier.danger(error.message, 'Error')
    );
  }

  calcMinHeight(usersCount?: number): number {
    if (!usersCount) {
      return 670;
    }

    return usersCount * 270;
  }

  setTransform(i: number): number {
    return i * 100; // 😁
  }

  loading = false;
  onNearOfBottom() {
    if (this.disabled) {
      return;
    }

    if (this.loading) {
      return;
    }

    // // No more results
    if (this.lastQueryLength !== undefined && this.lastQueryLength <= 0) { // < this.pagination.itemsPerPage
      return;
    }

    this.pagination.currentPage += 1;

    // this.setScrollRouteParams();

    this.loading = true;
    this.loadMoreUsers();
  }

  userClickHandler(screenName: string) {
    this.router.navigate([`/${screenName}`]);
  }

  isManageable(user: IUser) {
    if (!this.userStore.isLoggedIn()) {
      return false;
    }

    return user?.id === this.userStore.getUser().id;
  }

}
