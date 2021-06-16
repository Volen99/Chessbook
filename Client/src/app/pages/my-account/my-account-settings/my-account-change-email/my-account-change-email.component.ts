import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';

import {IUser} from "../../../../core/interfaces/common/users";
import {FormReactive} from "../../../../shared/shared-forms/form-reactive";
import {FormValidatorService} from "../../../../shared/shared-forms/form-validator.service";
import {USER_EMAIL_VALIDATOR, USER_PASSWORD_VALIDATOR} from "../../../../shared/shared-forms/form-validators/user-validators";
import {ServerService} from "../../../../core/server/server.service";
import {UsersService} from "../../../../core/backend/common/services/users.service";
import {NbTokenService} from "../../../../sharebook-nebular/auth/services/token/token.service";
import {UserStore} from "../../../../core/stores/user.store";
import {EMAIL_PATTERN, NUMBERS_PATTERN} from "../../../../auth/components";
import {NbAuthOAuth2JWTToken} from "../../../../sharebook-nebular/auth/services/token/token";

@Component({
  selector: 'my-account-change-email',
  templateUrl: './my-account-change-email.component.html',
  styleUrls: ['./my-account-change-email.component.scss']
})
export class MyAccountChangeEmailComponent extends FormReactive implements OnInit {
  error: string = null;
  success: string = null;
  user: IUser = null;

  constructor(
    protected formValidatorService: FormValidatorService,
    private userStore: UserStore,
    private userService: UsersService,
    private serverService: ServerService,
    private tokenService: NbTokenService,
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm({
      'new-email': USER_EMAIL_VALIDATOR,
      'password': USER_PASSWORD_VALIDATOR
    });

    this.user = this.userStore.getUser();
  }

  changeEmail() {
    this.error = null;
    this.success = null;

    const password = this.form.value['password'];
    const email = this.form.value['new-email'];

    forkJoin([
      // this.serverService.getConfig(),
      this.userService.changeEmail(password, email)
    ]).pipe()
      .subscribe(
        (result: any) => {
          this.form.reset();

          // I want to die.
          this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
          this.success = `Email updated.`;
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
