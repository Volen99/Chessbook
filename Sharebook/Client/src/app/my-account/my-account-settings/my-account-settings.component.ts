import {ViewportScroller} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from "../../core/users/user.model";
import {UserService} from "../../core/users/user.service";
import {Notifier} from "../../core/notification/notifier-service";
import {uploadErrorHandler} from "../../helpers/utils";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'my-account-settings',
  templateUrl: './my-account-settings.component.html',
  styleUrls: ['./my-account-settings.component.scss']
})
export class MyAccountSettingsComponent implements OnInit, AfterViewChecked {
  user: User = null;

  private lastScrollHash: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private userService: UserService,
    private authService: AuthService,
    private notifier: Notifier,
  ) {
  }

  get userInformationLoaded() {
    return this.authService.userInformationLoaded;
  }

  ngOnInit() {
    this.user = this.authService.getUser();
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
          this.notifier.success($localize`Avatar changed.`);

          this.user.updateAccountAvatar(data.avatar);
        },

        (err: HttpErrorResponse) => uploadErrorHandler({
          err,
          name: $localize`avatar`,
          notifier: this.notifier
        })
      );
  }
}
