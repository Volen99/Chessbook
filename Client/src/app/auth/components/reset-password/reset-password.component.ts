import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import {NbAuthService} from "../../../sharebook-nebular/auth/services/auth.service";
import {NB_AUTH_OPTIONS} from "../../../sharebook-nebular/auth/auth.options";
import {NbAuthResult} from "../../../sharebook-nebular/auth/services/auth-result";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxResetPasswordComponent implements OnInit, OnDestroy {
  @Input() hide: boolean;

  private routeSub: Subscription;

  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.resetPassword.redirectDelay');
  showMessages: any = this.getConfigValue('forms.resetPassword.showMessages');
  strategy: string = this.getConfigValue('forms.resetPassword.strategy');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  resetPasswordForm: FormGroup;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(queryParams => {
      this.token = queryParams['token'];
      this.email = queryParams['email'];
    });

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.resetPasswordForm = this.fb.group({
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  token: string;
  email: string;

  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.user = this.resetPasswordForm.value;

    this.user.token = this.token;
    this.user.email = this.email;

    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
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
