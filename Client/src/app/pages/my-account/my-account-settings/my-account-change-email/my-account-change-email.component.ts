import {forkJoin, Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUser, UserData} from "../../../../core/interfaces/common/users";
import {FormReactive} from "../../../../shared/forms/form-reactive";
import {FormValidatorService} from "../../../../shared/forms/form-validator.service";
import {USER_EMAIL_VALIDATOR, USER_PASSWORD_VALIDATOR} from "../../../../shared/forms/form-validators/user-validators";
import {ServerService} from "../../../../core/server/server.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {UsersService} from "../../../../core/backend/common/services/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserFormMode} from "../../../users/user/user.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NbTokenService} from "../../../../sharebook-nebular/auth/services/token/token.service";
import {UserStore} from "../../../../core/stores/user.store";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {EMAIL_PATTERN, NUMBERS_PATTERN} from "../../../../auth/components";
import {NbAuthOAuth2JWTToken} from "../../../../sharebook-nebular/auth/services/token/token";
import {User} from "../../../../shared/shared-main/user/user.model";

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
    private authService: AuthService,
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


  // @Input() user: IUser = null;
  //
  // userForm: FormGroup;
  //
  // protected readonly unsubscribe$ = new Subject<void>();
  //
  // get email() {
  //   return this.userForm.get('email');
  // }
  //
  // constructor(private usersService: UserData,
  //             private router: Router,
  //             private route: ActivatedRoute,
  //             private tokenService: NbTokenService,
  //             private userStore: UserStore,
  //             private toasterService: NbToastrService,
  //             private fb: FormBuilder) {
  // }
  //
  // ngOnInit(): void {
  //   this.initUserForm();
  //   this.loadUser();
  // }
  //
  // initUserForm() {
  //   this.userForm = this.fb.group({
  //     email: this.fb.control('', [
  //       Validators.required,
  //       Validators.pattern(EMAIL_PATTERN),
  //     ]),
  //   });
  // }
  //
  // loadUser(id?) {
  //   const loadUser = this.usersService.getCurrentUser();
  //   loadUser
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((user) => {
  //       this.userForm.setValue({
  //         email: '',
  //       });
  //
  //       // this is a place for value changes handling
  //       this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
  //         this.userForm.setValue({
  //           email: value,
  //         });
  //       });
  //     });
  // }
  //
  //
  // convertToUser(value: any): IUser {
  //   const user: IUser = value;
  //   return user;
  // }
  //
  // save() {
  //   const user: IUser = this.convertToUser(this.userForm.value);
  //
  //   let observable = new Observable<IUser>();
  //
  //   this.usersService.updateCurrent(user).subscribe((result: any) => {
  //       this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
  //       this.handleSuccessResponse();
  //     },
  //     err => {
  //       this.handleWrongResponse();
  //     });
  //   /*else {
  //    observable = user.id
  //      ? this.usersService.update(user)
  //      : this.usersService.create(user);
  //  }*/
  //
  //   observable
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(() => {
  //         this.handleSuccessResponse();
  //       },
  //       err => {
  //         this.handleWrongResponse();
  //       });
  // }
  //
  // handleSuccessResponse() {
  //   this.toasterService.success('', `Item updated!`);
  //   this.back();
  // }
  //
  // handleWrongResponse() {
  //   this.toasterService.danger('', `This email has already taken!`);
  // }
  //
  // back() {
  //   this.router.navigate(['/pages/users/list']);
  // }
  //
  // ngOnDestroy(): void {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }


}
