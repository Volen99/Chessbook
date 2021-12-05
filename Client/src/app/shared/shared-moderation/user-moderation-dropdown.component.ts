import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {BlocklistService} from './blocklist.service';
import {BulkService} from './bulk.service';
import {UserBanModalComponent} from './user-ban-modal.component';
import {IUser, UserData} from "../../core/interfaces/common/users";
import {ServerConfig} from "../models/server/server-config.model";
import {ServerService} from "../../core/server/server.service";
import {UserRight} from "../models/users/user-right.enum";
import {ConfirmService} from "../../core/confirm/confirm.service";
import {DropdownAction} from "../shared-main/buttons/action-dropdown.component";
import {User} from "../shared-main/user/user.model";
import {BulkRemoveCommentsOfBody} from "../models/bulk/bulk-remove-comments-of-body.model";
import {UserStore} from "../../core/stores/user.store";
import {UsersService} from "../../core/backend/common/services/users.service";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";

@Component({
  selector: 'app-user-moderation-dropdown',
  templateUrl: './user-moderation-dropdown.component.html'
})
export class UserModerationDropdownComponent implements OnInit, OnChanges {
  @ViewChild('userBanModal') userBanModal: UserBanModalComponent;

  @Input() user: User;
  @Input() account: IUser;
  @Input() prependActions: DropdownAction<{ user: User, account: IUser }>[];

  @Input() buttonSize: 'normal' | 'small' = 'normal';
  @Input() buttonStyled = true;
  @Input() placement = 'right-top right-bottom auto';
  @Input() label: string;
  @Input() container: 'body' | undefined = undefined;

  @Output() userChanged = new EventEmitter();
  @Output() userDeleted = new EventEmitter();

  userActions: DropdownAction<{ user: User, account: IUser }>[][] = [];

  requiresEmailVerification = false;

  constructor(
    private authService: UserStore,
    private notifier: NbToastrService,
    private confirmService: ConfirmService,
    private serverService: ServerService,
    private userService: UsersService,
    private blocklistService: BlocklistService,
    private bulkService: BulkService
  ) {
  }

  ngOnInit() {
    this.requiresEmailVerification = false;
  }

  ngOnChanges() {
    this.buildActions();
  }

  openBanUserModal(user: User) {
    if (user.screenName === 'root') {
      this.notifier.danger(`You cannot ban root.`, 'Error');
      return;
    }

    this.userBanModal.openModal(user);
  }

  onUserBanned() {
    this.userChanged.emit();
  }

  async unbanUser(user: User) {
    const res = await this.confirmService.confirm(`Do you really want to unban ${user.displayName}?`, `Unban`);
    if (res === false) return;

    this.userService.unbanUsers(user)
      .subscribe(
        () => {
          this.notifier.success(`User ${user.displayName} unbanned.`, 'Success');
          this.userChanged.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  async removeUser(user: User) {
    if (user.displayName === 'root') {
      this.notifier.danger(`You cannot delete root.`, 'Error');
      return;
    }

    const message = `If you remove this user, you will not be able to create another with the same username!`;
    const res = await this.confirmService.confirm(message, `Delete`);
    if (res === false) {
      return;
    }

    this.userService.removeUser(user).subscribe(
      () => {
        this.notifier.success(`User ${user.displayName} deleted.`, 'Success');
        this.userDeleted.emit();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  setEmailAsVerified(user: User) {
    this.userService.updateUser(user.id, {emailVerified: true}).subscribe(
      () => {
        this.notifier.success(`User ${user.displayName} email set as verified`, 'Success');
        this.userChanged.emit();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  blockAccountByUser(account: IUser) {
    this.blocklistService.blockAccountByUser(account)
      .subscribe(
        () => {
          this.notifier.success(`Account ${account.screenName} muted.`, 'Success');

          this.account.mutedByUser = true;
          this.userChanged.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  unblockAccountByUser(account: IUser) {
    this.blocklistService.unblockAccountByUser(account)
      .subscribe(
        () => {
          this.notifier.success(`Account ${account.screenName} unmuted.`, 'Success');

          this.account.mutedByUser = false;
          this.userChanged.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  async bulkRemoveCommentsOf(body: BulkRemoveCommentsOfBody) {
    const message = `Are you sure you want to remove all the comments of this account?`;
    const res = await this.confirmService.confirm(message, `Delete account comments`);
    if (res === false) return;

    this.bulkService.removeCommentsOf(body)
      .subscribe(
        () => {
          this.notifier.success(`Will remove comments of this account (may take several minutes).`);
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  getRouterUserEditLink(user: User) {
    return ['/admin', 'users', 'update', user.id];
  }

  private buildActions() {
    this.userActions = [];

    if (this.prependActions) {
      this.userActions = [
        this.prependActions
      ];
    }

    if (!!this.authService.getUser()) {
      const authUser = this.authService.getUser();

      if (this.user && authUser.id === this.user.id) return;

      if (this.user && authUser.hasRight(UserRight.MANAGE_USERS) && authUser.canManage(this.user)) {
        this.userActions.push([
          {
            label: `Edit user`,
            description: `Change quota, role, and more.`,
            linkBuilder: ({user}) => this.getRouterUserEditLink(user)
          },
          {
            label: `Delete user`,
            description: `Videos will be deleted, comments will be tombstoned.`,
            handler: ({user}) => this.removeUser(user)
          },
          {
            label: `Ban`,
            description: `User won't be able to login anymore, but videos and comments will be kept as is.`,
            handler: ({user}) => this.openBanUserModal(user),
            isDisplayed: ({user}) => !user.blocked
          },
          {
            label: `Unban user`,
            description: `Allow the user to login and create videos/comments again`,
            handler: ({user}) => this.unbanUser(user),
            isDisplayed: ({user}) => user.blocked
          },
          {
            label: `Set Email as Verified`,
            handler: ({user}) => this.setEmailAsVerified(user),
            isDisplayed: ({user}) => this.requiresEmailVerification && !user.blocked && user.emailVerified === false
          }
        ]);
      }

      // Actions on accounts/servers
      if (this.account) {
        // User actions
        this.userActions.push([
          {
            label: `Mute this account`,
            description: `Hide any content from that user from you.`,
            isDisplayed: ({account}) => account.mutedByUser === false || account.blocked === false,
            handler: ({account}) => this.blockAccountByUser(account)
          },
          {
            label: `Unmute this account`,
            description: `Show back content from that user for you.`,
            isDisplayed: ({account}) => account.mutedByUser === true || account.blocked === true,
            handler: ({account}) => this.unblockAccountByUser(account)
          },
          // {
          //   label: `Remove comments from your videos`,
          //   description: `Remove comments made by this account on your videos.`,
          //   handler: ({account}) => this.bulkRemoveCommentsOf({accountName: account.screenName, scope: 'my-videos'})
          // }
        ]);
      }
    }
  }
}
