import {Router} from "@angular/router";
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

import {
  faUsers,
} from '@fortawesome/pro-light-svg-icons';

import {User} from "../shared-main/user/user.model";
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
  @Input() url: 'who_to_follow' | 'following' | 'followers' = 'who_to_follow';

  private lastQueryLength: number;

  constructor(private router: Router, private userService: UsersService,
              private notifier: NbToastrService, private userStore: UserStore) {
  }

  ngOnInit(): void {
    if (this.more) {
      this.pagination = {
        currentPage: 1,
        itemsPerPage: 100,
      };

      this.loadMoreUsers(true);
    }

    this.isSearch = false;
  }

  faUsers = faUsers;

  pagination: ComponentPaginationLight = {
    currentPage: 1,
    itemsPerPage: 100,
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
    let res = 670;
    if (usersCount) {
      res = usersCount * 170;
    } else {
      res = 670;
    }

    return res;
  }

  setTransform(i: number): number {
    return i * 100; // 😁
  }

  loading = false;
  onNearOfBottom() {
    if (!this.pagination) {
      return;
    }

    if (this.disabled) {
      return;
    }

    if (this.loading) {
      return;
    }

    // No more results
    if (this.lastQueryLength !== undefined && this.lastQueryLength <= 0) { // < this.pagination.itemsPerPage
      return;
    }

    this.pagination.currentPage += 1;

    this.loading = true;

    if (this.more && this.url === 'who_to_follow') {
      this.loadMoreUsers();
    }

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

}
