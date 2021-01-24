import { Component, EventEmitter, Host, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormReactive } from '../../../shared/shared-forms/form-reactive';
import { FormGroup } from '@angular/forms';
import { FormValidatorService } from '../../../shared/shared-forms/form-validator.service';
import { UserService } from '../../../core';
import {
  USER_DISPLAY_NAME_REQUIRED_VALIDATOR, USER_EMAIL_VALIDATOR,
  USER_PASSWORD_VALIDATOR,
  USER_USERNAME_VALIDATOR
} from '../../../shared/form-validators/user-validators';
import { CdkStepper } from '@angular/cdk/stepper';
import { RegisterComponent } from '../register.component';

@Component({
  selector: 'app-create-your-account',
  templateUrl: './create-your-account.component.html',
  styleUrls: [ './create-your-account.component.scss' ]
})
export class CreateYourAccountComponent extends FormReactive implements OnInit {
  @Output() formBuilt = new EventEmitter<FormGroup>();

  @Input() username: string;
  @Input() email: string;
  @Input() birthday: string;

  @Input() cdkStepper: CdkStepper;

  constructor(@Host() public register: RegisterComponent, protected formValidatorService: FormValidatorService) {
    super();

  }

  ngOnInit(): void {
    // this.buildForm({
    //   username: USER_USERNAME_VALIDATOR,
    //   email: USER_EMAIL_VALIDATOR,
    //   password: USER_PASSWORD_VALIDATOR,
    // });

    // setTimeout(() => this.formBuilt.emit(this.form));
  }

}
