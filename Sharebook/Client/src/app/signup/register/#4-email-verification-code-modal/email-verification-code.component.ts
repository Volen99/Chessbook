import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormReactive } from '../../../shared/shared-forms/form-reactive';
import { FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';
import { FormValidatorService } from '../../../shared/shared-forms/form-validator.service';
import { UserService } from '../../../core';
import { USER_EMAIL_VALIDATOR, USER_USERNAME_VALIDATOR } from '../../../shared/form-validators/user-validators';

@Component({
  selector: 'app-email-verification-code',
  templateUrl: './email-verification-code.component.html',
  styleUrls: ['./email-verification-code.component.scss']
})
export class EmailVerificationCodeComponent extends FormReactive implements OnInit {

  @Output() formBuilt = new EventEmitter<FormGroup>();

  constructor(protected formValidatorService: FormValidatorService, private userService: UserService,
              private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.buildForm({
      
    });

    setTimeout(() => this.formBuilt.emit(this.form));
  }

}
