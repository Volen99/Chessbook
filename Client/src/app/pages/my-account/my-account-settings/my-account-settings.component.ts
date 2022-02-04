import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';

import {UsersService} from "../../../core/backend/common/services/users.service";
import {genericUploadErrorHandler, uploadErrorHandler} from '../../../helpers/utils';
import {UserStore} from "../../../core/stores/user.store";
import {IUser} from "../../../core/interfaces/common/users";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";

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
    private userStore: UserStore,
    private toastrService: NbToastrService
  ) {
  }

  get userInformationLoaded() {
    return this.userStore.getUser();
  }

  ngOnInit() {
    this.user = this.userStore.getUser();
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
          this.toastrService.success(`Avatar changed`, 'Success');

          this.user.profileImageUrlHttps = data.url;
        },

        (err: HttpErrorResponse) => uploadErrorHandler({
          err,
          name: `avatar`,
          notifier: this.toastrService
        })
      );
  }


  onAvatarDelete() {
    this.userService.deleteAvatar()
      .subscribe(
        data => {
          this.toastrService.success(`Avatar deleted.`, 'Success');
        },

        (err: HttpErrorResponse) => this.toastrService.danger(err.message)
      );
  }

  onBannerChange(formData: FormData) {
    this.userService.changeBanner(formData)
      .subscribe(
        data => {
          this.toastrService.success(`Banner changed.`, 'Success');

          this.user.profileBannerURL = data.url;
        },

        (err: HttpErrorResponse) => genericUploadErrorHandler({
          err,
          name: `banner`,
          notifier: this.toastrService
        })
      );
  }

  onBannerDelete() {
    this.userService.deleteBanner()
      .subscribe(
        data => {
          this.toastrService.success(`Banner deleted.`, 'Success');

          this.user.profileBackgroundImageUrlHttps = '';
        },

        err => this.toastrService.danger(err.message, 'Error')
      );
  }
}
