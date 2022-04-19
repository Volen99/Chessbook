import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { EMAIL_PATTERN } from '../constants';
import {NB_AUTH_OPTIONS, NbAuthSocialLink} from "../../../sharebook-nebular/auth/auth.options";
import {NbAuthService} from "../../../sharebook-nebular/auth/services/auth.service";
import {NbAuthResult} from "../../../sharebook-nebular/auth/services/auth-result";

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit {
  minDisplayNameLength: number = this.getConfigValue(('forms.validation.displayName.minLength'));
  maxDisplayNameLength: number = this.getConfigValue(('forms.validation.displayName.maxLength'));
  minUsernameLength: number = this.getConfigValue(('forms.validation.username.minLength'));
  maxUsernameLength: number = this.getConfigValue(('forms.validation.username.maxLength'));

  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  isDisplayNameRequired: boolean = this.getConfigValue('forms.validation.displayName.required');
  isUsernameRequired: boolean = this.getConfigValue('forms.validation.username.required');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  registerForm: FormGroup;
  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    protected router: Router) {
  }

  get displayName() { return this.registerForm.get('displayName'); }
  get username() { return this.registerForm.get('username'); }      // screenName
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }

  ngOnInit(): void {
    const loginValidators = [
      Validators.minLength(this.minDisplayNameLength),
      Validators.maxLength(this.maxDisplayNameLength),
    ];
    this.isDisplayNameRequired && loginValidators.push(Validators.required);

    const usernameValidators = [
      Validators.minLength(this.minUsernameLength),
      Validators.maxLength(this.maxUsernameLength),
    ];
    this.isUsernameRequired && usernameValidators.push(Validators.required);

    const emailValidators = [
      // Validators.pattern(EMAIL_PATTERN),
      Validators.email
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.registerForm = this.fb.group({
      displayName: this.fb.control('', [...loginValidators]),
      username: this.fb.control('', [...usernameValidators]),
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
      terms: this.fb.control(''),
    });
  }

  register(): void {
    this.user = this.registerForm.value;
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          alert('You need to activate your account from your email to use Chessbook fully');
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
