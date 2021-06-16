import {Component, Input, OnInit} from '@angular/core';
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {FormValidatorService} from "../../../shared/shared-forms/form-validator.service";
import {FormReactive} from "../../../shared/shared-forms/form-reactive";
import {UsersService} from "../../../core/backend/common/services/users.service";
import {USER_PASSWORD_VALIDATOR} from "../../../shared/shared-forms/form-validators/user-validators";
import {UserUpdate} from "../../../shared/models/users/user-update.model";

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent extends FormReactive implements OnInit {
  error: string;
  username: string;
  showPassword = false;

  @Input() userId: number;

  constructor(
    protected formValidatorService: FormValidatorService,
    private notifier: NbToastrService,
    private userService: UsersService
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm({
      password: USER_PASSWORD_VALIDATOR
    });
  }

  formValidated() {
    this.error = undefined;

    const userUpdate: UserUpdate = this.form.value;

    this.userService.updateUser(this.userId, userUpdate).subscribe(
      () => {
        this.notifier.success(`Password changed for user ${this.username}.`);
      },

      err => this.error = err.message
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getFormButtonTitle() {
    return `Update user password`;
  }
}
