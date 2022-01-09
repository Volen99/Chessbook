import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {SortMeta} from 'primeng/api';
import {saveAs} from 'file-saver';

import {IUser} from "../../../core/interfaces/common/users";
import {RestTable} from "../../../core/rest/rest-table";
import {UserBanModalComponent} from "../../../shared/shared-moderation/user-ban-modal.component";
import {RestPagination} from "../../../core/rest/rest-pagination";
import {DropdownAction} from "../../../shared/shared-main/buttons/action-dropdown.component";
import {AdvancedInputFilter} from "../../../shared/shared-forms/advanced-input-filter.component";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ConfirmService} from "../../../core/confirm/confirm.service";
import {ServerService} from "../../../core/server/server.service";
import {UserStore} from "../../../core/stores/user.store";
import {UsersService} from "../../../core/backend/common/services/users.service";
import {UserRole} from "../../../shared/models/users/user-role";
import {GdprService} from "../../../shared/services/gdpr.service";

import {
  faChevronRight,
  faChevronDown,
  faDownload,
  faCheck,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';


import {
  faColumns,
  faUserPlus,
} from '@fortawesome/pro-solid-svg-icons';

type UserForList = IUser & {
  rawVideoQuota: number
  rawVideoQuotaUsed: number
  rawVideoQuotaDaily: number
  rawVideoQuotaUsedDaily: number
};

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [GdprService],
})
export class UserListComponent extends RestTable implements OnInit {
  @ViewChild('userBanModal', {static: true}) userBanModal: UserBanModalComponent;

  users: IUser[] = [];

  totalRecords = 0;
  sort: SortMeta = {field: 'createdAt', order: 1};
  pagination: RestPagination = {count: this.rowsPerPage, start: 0};

  highlightBannedUsers = false;

  selectedUsers: IUser[] = [];
  bulkUserActions: DropdownAction<IUser[]>[][] = [];
  columns: { id: string, label: string }[];

  inputFilters: AdvancedInputFilter[] = [
    {
      queryParams: {search: 'banned:true'},
      label: `Banned users`
    }
  ];

  requiresEmailVerification = false;

  private _selectedColumns: string[];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private notifier: NbToastrService,
    private confirmService: ConfirmService,
    private serverService: ServerService,
    private userStore: UserStore,
    private userService: UsersService,
    private gdprService: GdprService,
  ) {
    super();
  }

  get authUser() {
    return this.userStore.getUser();
  }

  get selectedColumns() {
    return this._selectedColumns;
  }

  set selectedColumns(val: string[]) {
    this._selectedColumns = val;
  }

  ngOnInit() {
    // this.serverService.getConfig()
    //   .subscribe(config => this.requiresEmailVerification = config.signup.requiresEmailVerification);

    this.initialize();

    this.bulkUserActions = [
      [
        {
          label: `Delete`,
          description: `Videos will be deleted, comments will be tombstoned.`,
          handler: users => this.removeUsers(users),
          // isDisplayed: users => users.every(u => this.authUser.canManage(u))
        },
        {
          label: `Ban`,
          description: `User won't be able to login anymore, but videos and comments will be kept as is.`,
          handler: users => this.openBanUserModal(users),
          // isDisplayed: users => users.every(u => this.authUser.canManage(u) && u.blocked === false)
        },
        {
          label: `Unban`,
          handler: users => this.unbanUsers(users),
          // isDisplayed: users => users.every(u => this.authUser.canManage(u) && u.blocked === true)
        }
      ],
      [
        {
          label: `Set Email as Verified`,
          handler: users => this.setEmailsAsVerified(users),
          isDisplayed: users => {
            return this.requiresEmailVerification; // &&
              // users.every(u => this.authUser.canManage(u) && !u.blocked && u.emailVerified === false);
          }
        }
      ]
    ];

    this.columns = [
      {id: 'username', label: 'Username'},
      {id: 'email', label: 'Email'},
      {id: 'role', label: 'Role'},
      {id: 'createdAt', label: 'Created'},
      {id: 'lastLoginDate', label: 'Last login'},
      {id: 'active', label: `Active`}

    ];

    this.selectedColumns = this.columns.map(c => c.id);

    this.columns.push({id: 'ip', label: 'Last ip address'});
  }

  // light
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faDownload = faDownload;
  faCheck = faCheck;
  faTimes = faTimes;

  // solid
  faColumns = faColumns;
  faUserPlus = faUserPlus;

  getIdentifier() {
    return 'UserListComponent';
  }

  getRoleClass(role: UserRole) {
    switch (role) {
      case UserRole.ADMINISTRATOR:
        return 'badge-purple';
      case UserRole.MODERATOR:
        return 'badge-blue';
      default:
        return 'badge-yellow';
    }
  }

  isSelected(id: string) {
    return this.selectedColumns.find(c => c === id);
  }

  getColumn(id: string) {
    return this.columns.find(c => c.id === id);
  }

  openBanUserModal(users: IUser[]) {
    for (const user of users) {
      if (user.displayName === 'root') {
        this.notifier.danger(`You cannot ban root xD`, 'Error');
        return;
      }
    }

    this.userBanModal.openModal(users);
  }

  onUserChanged() {
    this.reloadData();
  }

  async unbanUsers(users: IUser[]) {
    const res = await this.confirmService.confirm(`Do you really want to unban ${users.length} users?`, `Unban`);
    if (res === false) return;

    this.userService.unbanUsers(users)
      .subscribe(
        () => {
          this.notifier.success(`${users.length} users unbanned.`, 'Success');
          this.reloadData();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  async removeUsers(users: IUser[]) {
    for (const user of users) {
      if (user.displayName === 'root') {
        this.notifier.danger(`You cannot delete root xD`, 'Error');
        return;
      }
    }

    const message = `If you remove these users, you will not be able to create others with the same username!`;
    const res = await this.confirmService.confirm(message, `Delete`);
    if (res === false) return;

    this.userService.removeUser(users).subscribe(
      () => {
        this.notifier.success(`${users.length} users deleted.`, 'Success');
        this.reloadData();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  async setEmailsAsVerified(users: IUser[]) {
    this.userService.updateUsers(users, {emailVerified: true}).subscribe(
      () => {
        this.notifier.success(`${users.length} users email set as verified.`);
        this.reloadData();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  isInSelectionMode() {
    return this.selectedUsers.length !== 0;
  }

  protected reloadData() {
    this.selectedUsers = [];

    this.userService.getUsersForAdmin({
      pagination: this.pagination,
      sort: this.sort,
      search: this.search
    }).subscribe(
      resultList => {
        this.users = resultList.data;
        this.totalRecords = resultList.total;
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  handleExport() {
    this.gdprService.exportUsers()
      .subscribe((data) => {
        saveAs(data.body, 'users.xlsx');
      }, err => this.notifier.danger(err.message, 'Error'));
  }
}
