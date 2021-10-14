import {Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UserEdit} from './user-edit';
import {FormValidatorService} from "../../../shared/shared-forms/form-validator.service";
import {ServerService} from "../../../core/server/server.service";
import {ScreenService} from "../../../core/wrappers/screen.service";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {UsersService} from "../../../core/backend/common/services/users.service";
import {UserRole} from "../../../shared/models/users/user-role";
import {
  USER_EMAIL_VALIDATOR,
  USER_ROLE_VALIDATOR, USER_VIDEO_QUOTA_DAILY_VALIDATOR,
  USER_VIDEO_QUOTA_VALIDATOR
} from "../../../shared/shared-forms/form-validators/user-validators";
import {UserUpdate} from "../../../shared/models/users/user-update.model";
import {User} from "../../../shared/shared-main/user/user.model";
import {UserStore} from "../../../core/stores/user.store";
import {IUser} from "../../../core/interfaces/common/users";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserUpdateComponent extends UserEdit implements OnInit, OnDestroy {
  error: string;

  private paramsSub: Subscription;

  constructor(
    protected formValidatorService: FormValidatorService,
    protected serverService: ServerService,
    protected screenService: ScreenService,
    protected auth: UserStore,
    private route: ActivatedRoute,
    private router: Router,
    private notifier: NbToastrService,
    private userService: UsersService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    const defaultValues = {
      role: UserRole.REGISTERED.toString(),
      videoQuota: '-1',
      videoQuotaDaily: '-1'
    };

    this.buildForm({
      email: USER_EMAIL_VALIDATOR,
      role: USER_ROLE_VALIDATOR,
      videoQuota: USER_VIDEO_QUOTA_VALIDATOR,
      videoQuotaDaily: USER_VIDEO_QUOTA_DAILY_VALIDATOR,
      byPassAutoBlock: null,
      pluginAuth: null
    }, defaultValues);

    this.paramsSub = this.route.params.subscribe(routeParams => {
      const userId = routeParams['id'];
      this.userService.getUser(userId, true).subscribe(
        user => this.onUserFetched(user),

        err => this.error = err.message
      );
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  formValidated() {
    this.error = undefined;

    const userUpdate: UserUpdate = this.form.value;
    userUpdate.adminFlags = this.buildAdminFlags(this.form.value);
    userUpdate.userId = this.user.id;

    if (userUpdate.pluginAuth === 'null') {
      userUpdate.pluginAuth = null;
    }

    this.userService.updateUserAsAdmin(userUpdate).subscribe(
      () => {
        debugger
        this.notifier.success(`User ${this.user.screenName} updated.`, 'Success');
        this.router.navigate(['/admin/users/list']);
      },

      err => this.error = err.message
    );
  }

  isCreation() {
    return false;
  }

  isPasswordOptional() {
    return false;
  }

  getFormButtonTitle() {
    return `Update user`;
  }

  resetPassword() {
    // this.userService.askResetPassword(this.user.email).subscribe(
    //   () => {
    //     this.notifier.success(`An email asking for password reset has been sent to ${this.user.screenName}.`, 'Success');
    //   },
    //
    //   err => this.error = err.message
    // );
  }

  private onUserFetched(userJson: IUser) {
    this.user = new User(userJson);

    this.form.patchValue({
      email: userJson.email,
      role: userJson.roles.map(r => r.toString()),
      // byPassAutoBlock: userJson.adminFlags & UserAdminFlag.BYPASS_VIDEO_AUTO_BLACKLIST
    });
  }
}
