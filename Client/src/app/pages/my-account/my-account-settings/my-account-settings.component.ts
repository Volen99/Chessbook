import {ViewportScroller} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from "../../../shared/shared-main/user/user.model";
import {AuthService} from "../../../core/auth/auth.service";
import {Notifier} from "../../../core/notification/notifier.service";
import {UsersService} from "../../../core/backend/common/services/users.service";
import { uploadErrorHandler } from '../../../helpers/utils';
import {UserStore} from "../../../core/stores/user.store";
import {IUser} from "../../../core/interfaces/common/users";

@Component({
  selector: 'my-account-settings',
  templateUrl: './my-account-settings.component.html',
  styleUrls: ['./my-account-settings.component.scss']
})
export class MyAccountSettingsComponent implements OnInit, AfterViewChecked {
  user: IUser = null; // was User

  private lastScrollHash: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private userService: UsersService,
    private authService: AuthService,
    private userStore: UserStore,
    private notifier: Notifier
  ) {
  }

  get userInformationLoaded() {
    return this.authService.userInformationLoaded;
  }

  ngOnInit() {
    this.user = this.userStore.getUser();              // this.authService.getUser();
  }

  ngAfterViewChecked() {
    if (window.location.hash && window.location.hash !== this.lastScrollHash) {
      this.viewportScroller.scrollToAnchor(window.location.hash.replace('#', ''));

      this.lastScrollHash = window.location.hash;
    }
  }

  onAvatarChange(formData: FormData) {
    this.userService.changeAvatar(formData)
      .subscribe(
        data => {
          this.notifier.success(`Avatar changed.`);

          this.user.updateAccountAvatar(data.avatar);
        },

        (err: HttpErrorResponse) => uploadErrorHandler({
          err,
          name: `avatar`,
          notifier: this.notifier
        })
      );
  }

  onAvatarDelete() {
    this.userService.deleteAvatar()
      .subscribe(
        data => {
          this.notifier.success(`Avatar deleted.`);

          this.user.updateAccountAvatar();
        },

        (err: HttpErrorResponse) => this.notifier.error(err.message)
      );
  }
}
