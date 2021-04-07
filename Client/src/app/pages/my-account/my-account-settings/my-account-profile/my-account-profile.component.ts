import {Observable, Subject} from 'rxjs';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormReactive} from "../../../../shared/forms/form-reactive";
import {User} from "../../../../shared/shared-main/user/user.model";
import {FormValidatorService} from "../../../../shared/forms/form-validator.service";
import {Notifier} from "../../../../core/notification/notifier.service";
import {
  USER_DESCRIPTION_VALIDATOR,
  USER_DISPLAY_NAME_REQUIRED_VALIDATOR
} from "../../../../shared/forms/form-validators/user-validators";
import {UsersService} from "../../../../core/backend/common/services/users.service";
import {takeUntil, tap} from "rxjs/operators";
import {IUser, UserData} from "../../../../core/interfaces/common/users";
import {UserStore} from "../../../../core/stores/user.store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserFormMode} from "../../../users/user/user.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NbTokenService} from "../../../../sharebook-nebular/auth/services/token/token.service";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {EMAIL_PATTERN, NUMBERS_PATTERN} from "../../../../auth/components";
import {NbAuthOAuth2JWTToken} from "../../../../sharebook-nebular/auth/services/token/token";

@Component({
  selector: 'my-account-profile',
  templateUrl: './my-account-profile.component.html',
  styleUrls: ['./my-account-profile.component.scss']
})
export class MyAccountProfileComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  protected readonly unsubscribe$ = new Subject<void>();

  get login() { return this.userForm.get('login'); }

  get email() { return this.userForm.get('email'); }


  mode: UserFormMode;
  setViewMode(viewMode: UserFormMode) {
    this.mode = viewMode;
  }

  constructor(private usersService: UserData,
              private router: Router,
              private route: ActivatedRoute,
              private tokenService: NbTokenService,
              private userStore: UserStore,
              private toasterService: NbToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserData();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      id: this.fb.control(''),
      role: this.fb.control(''),
      firstName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      login: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      age: this.fb.control('', [Validators.required, Validators.min(1),
        Validators.max(120), Validators.pattern(NUMBERS_PATTERN)]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      address: this.fb.group({
        street: this.fb.control(''),
        city: this.fb.control(''),
        zipCode: this.fb.control(''),
      }),
    });
  }

  get canEdit(): boolean {
    return this.mode !== UserFormMode.VIEW;
  }


  loadUserData() {
    const id = this.route.snapshot.paramMap.get('id');
    const isProfile = this.route.snapshot.queryParamMap.get('profile');
    if (isProfile) {
      this.setViewMode(UserFormMode.EDIT_SELF);
      this.loadUser();
    } else {
      if (id) {
        const currentUserId = this.userStore.getUser().id;
        this.setViewMode(currentUserId.toString() === id ? UserFormMode.EDIT_SELF : UserFormMode.EDIT);
        this.loadUser(id);
      } else {
        this.setViewMode(UserFormMode.ADD);
      }
    }
  }

  loadUser(id?) {
    const loadUser = this.mode === UserFormMode.EDIT_SELF
      ? this.usersService.getCurrentUser() : this.usersService.get(id);
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.userForm.setValue({
          id: user.id ? user.id : '',
          role: user.role ? user.role : '',
          name: user.name ? user.name : '',
          age: user.age ? user.age : '',
          email: user.email,
        });

        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });
  }


  convertToUser(value: any): IUser {
    const user: IUser = value;
    return user;
  }

  save() {
    const user: IUser = this.convertToUser(this.userForm.value);

    let observable = new Observable<IUser>();
    if (this.mode === UserFormMode.EDIT_SELF) {
      this.usersService.updateCurrent(user).subscribe((result: any) => {
          this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
          this.handleSuccessResponse();
        },
        err => {
          this.handleWrongResponse();
        });
    } else {
      observable = user.id
        ? this.usersService.update(user)
        : this.usersService.create(user);
    }

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
          this.handleSuccessResponse();
        },
        err => {
          this.handleWrongResponse();
        });
  }

  handleSuccessResponse() {
    this.toasterService.success('', `Item ${this.mode === UserFormMode.ADD ? 'created' : 'updated'}!`);
    this.back();
  }

  handleWrongResponse() {
    this.toasterService.danger('', `This email has already taken!`);
  }

  back() {
    this.router.navigate(['/pages/users/list']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }





  // @Input() user: IUser = null; // was User
  // @Input() userInformationLoaded: Subject<any>;
  //
  // error: string = null;
  //
  // constructor(protected formValidatorService: FormValidatorService, private notifier: Notifier,
  //             private userService: UsersService,
  //             private userStore: UserStore) {
  //   super();
  // }
  //
  // ngOnInit() {
  //   this.buildForm({
  //     username: null,
  //     'display-name': USER_DISPLAY_NAME_REQUIRED_VALIDATOR,
  //     description: USER_DESCRIPTION_VALIDATOR
  //   });
  //   this.form.controls['username'].disable();
  //
  //   // this.userInformationLoaded.subscribe(() => {
  //   //   this.form.patchValue({
  //   //     username: this.user.screenName,
  //   //     'display-name': this.user.name,
  //   //     description: this.user.description
  //   //   });
  //   // });
  //
  //   this.user = this.userStore.getUser();
  // }
  //
  // get instanceHost() {
  //   return window.location.host;
  // }
  //
  // updateMyProfile() {
  //   const displayName = this.form.value['display-name'];
  //   const description = this.form.value['description'] || null;
  //
  //   this.error = null;
  //
  //   this.userService.updateMyProfile({displayName, description}).subscribe(
  //     () => {
  //       this.user.name = displayName;
  //       this.user.description = description;
  //
  //       this.notifier.success(`Profile updated.`);
  //     },
  //
  //     err => this.error = err.message
  //   );
  // }
}
