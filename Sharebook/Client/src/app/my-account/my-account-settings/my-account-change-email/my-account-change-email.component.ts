import {forkJoin} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {FormReactive} from "../../../shared/shared-forms/form-reactive";
import {User} from "../../../shared/models/users/user.model";
import {FormValidatorService} from "../../../shared/shared-forms/form-validator.service";
import {UserService} from "../../../core/users/user.service";
import {ServerService} from "../../../core/server";
import {USER_EMAIL_VALIDATOR, USER_PASSWORD_VALIDATOR} from "../../../shared/form-validators/user-validators";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'my-account-change-email',
  templateUrl: './my-account-change-email.component.html',
  styleUrls: ['./my-account-change-email.component.scss']
})
export class MyAccountChangeEmailComponent extends FormReactive implements OnInit {
  error: string = null;
  success: string = null;
  user: User = null;

  constructor(
    protected formValidatorService: FormValidatorService,
    private authService: AuthService,
    private userService: UserService,
    private serverService: ServerService,
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm({
      'new-email': USER_EMAIL_VALIDATOR,
      'password': USER_PASSWORD_VALIDATOR
    });

    this.user = this.authService.getUser();
  }

  changeEmail() {
    this.error = null;
    this.success = null;

    const password = this.form.value['password'];
    const email = this.form.value['new-email'];

    forkJoin([
      this.serverService.getConfig(),
      this.userService.changeEmail(password, email)
    ]).pipe(tap(() => this.authService.refreshUserInformation()))
      .subscribe(
        ([config]) => {
          this.form.reset();

          if (config.signup.requiresEmailVerification) {
            this.success = $localize`Please check your emails to verify your new email.`;
          } else {
            this.success = $localize`Email updated.`;
          }
        },

        err => {
          if (err.status === 401) {
            this.error = $localize`You current password is invalid.`;
            return;
          }

          this.error = err.message;
        }
      );
  }
}
