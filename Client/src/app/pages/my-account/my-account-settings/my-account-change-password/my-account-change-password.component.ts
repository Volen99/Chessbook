import {filter} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {FormReactive} from "../../../../shared/forms/form-reactive";
import {FormValidatorService} from "../../../../shared/forms/form-validator.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {Notifier} from "../../../../core/notification/notifier.service";
import {IUser} from "../../../../core/interfaces/common/users";
import {UsersService} from "../../../../core/backend/common/services/users.service";
import {
  USER_CONFIRM_PASSWORD_VALIDATOR,
  USER_EXISTING_PASSWORD_VALIDATOR,
  USER_PASSWORD_VALIDATOR
} from "../../../../shared/forms/form-validators/user-validators";

@Component({
  selector: 'my-account-change-password',
  templateUrl: './my-account-change-password.component.html',
  styleUrls: ['./my-account-change-password.component.scss']
})
export class MyAccountChangePasswordComponent extends FormReactive implements OnInit {
  error: string = null;
  user: IUser = null;

  constructor(
    protected formValidatorService: FormValidatorService,
    private notifier: Notifier,
    private authService: AuthService,
    private userService: UsersService
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm({
      'current-password': USER_EXISTING_PASSWORD_VALIDATOR,
      'new-password': USER_PASSWORD_VALIDATOR,
      'new-confirmed-password': USER_CONFIRM_PASSWORD_VALIDATOR
    });

    this.user = this.authService.getUser();

    const confirmPasswordControl = this.form.get('new-confirmed-password');

    confirmPasswordControl.valueChanges
      .pipe(filter(v => v !== this.form.value['new-password']))
      .subscribe(() => confirmPasswordControl.setErrors({matchPassword: true}));
  }

  changePassword() {
    const currentPassword = this.form.value['current-password'];
    const newPassword = this.form.value['new-password'];

    this.userService.changePassword(currentPassword, newPassword).subscribe(
      () => {
        this.notifier.success(`Password updated.`);

        this.form.reset();
        this.error = null;
      },

      err => {
        if (err.status === 401) {
          this.error = `You current password is invalid.`;
          return;
        }

        this.error = err.message;
      }
    );
  }
}
