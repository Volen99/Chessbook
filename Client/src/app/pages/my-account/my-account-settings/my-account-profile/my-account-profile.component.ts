import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from "rxjs/operators";

import {FormReactive} from "../../../../shared/shared-forms/form-reactive";
import {User} from "../../../../shared/shared-main/user/user.model";
import {FormValidatorService} from "../../../../shared/shared-forms/form-validator.service";
import {Notifier} from "../../../../core/notification/notifier.service";
import {
  USER_DESCRIPTION_VALIDATOR,
  USER_DISPLAY_NAME_REQUIRED_VALIDATOR
} from "../../../../shared/shared-forms/form-validators/user-validators";

import {
  faChessKingAlt,
  faChessQueenAlt,
} from '@fortawesome/pro-solid-svg-icons';


import {IUser, UserData} from "../../../../core/interfaces/common/users";
import {UserStore} from "../../../../core/stores/user.store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserFormMode} from "../../../users/user/user.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NbTokenService} from "../../../../sharebook-nebular/auth/services/token/token.service";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {EMAIL_PATTERN, NUMBERS_PATTERN} from "../../../../auth/components";
import {NbAuthOAuth2JWTToken} from "../../../../sharebook-nebular/auth/services/token/token";
import {Util} from "leaflet";
import formatNum = Util.formatNum;

export enum Month {
  Jan = 1,
  Feb = 2,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

@Component({
  selector: 'my-account-profile',
  templateUrl: './my-account-profile.component.html',
  styleUrls: ['./my-account-profile.component.scss']
})
export class MyAccountProfileComponent implements OnInit, OnDestroy {

  userForm: FormGroup;

  protected readonly unsubscribe$ = new Subject<void>();

  get email() {
    return this.userForm.get('email');
  }

  get displayName() {
    return this.userForm.get('displayName');
  }

  get description() {
    return this.userForm.get('description');
  }

  get websiteLink() {
    return this.userForm.get('websiteLink');
  }

  get twitterLink() {
    return this.userForm.get('twitterLink');
  }

  get twitchLink() {
    return this.userForm.get('twitchLink');
  }

  get youtubeLink() {
    return this.userForm.get('youtubeLink');
  }

  get facebookLink() {
    return this.userForm.get('facebookLink');
  }


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
    let date = new Date();
    for (let day = 1; day <= 31; day++) {
      this.days.push(day);
    }

    for (let year = date.getFullYear(); year >= date.getFullYear() - 115; year--) {
      this.years.push(year);
    }

    debugger
    this.initUserForm();
    this.loadUserData();
  }


  genderSelected = '';

  monthSelected: number;
  daySelected: number;
  yearSelected: number;

  faChessKingAlt = faChessKingAlt;
  faChessQueenAlt = faChessQueenAlt;

  public months = Month;
  public days: number[] = [];
  public years: number[] = [];

  user: IUser;

  initUserForm() {
    this.userForm = this.fb.group({
      displayName: USER_DISPLAY_NAME_REQUIRED_VALIDATOR,
      description: USER_DESCRIPTION_VALIDATOR,
      websiteLink: this.fb.control('', [Validators.minLength(16), Validators.maxLength(72)]),
      twitterLink: this.fb.control('', [Validators.minLength(16), Validators.maxLength(72)]),
      twitchLink: this.fb.control('', [Validators.minLength(16), Validators.maxLength(72)]),
      youtubeLink: this.fb.control('', [Validators.minLength(16), Validators.maxLength(72)]),
      facebookLink: this.fb.control('', [Validators.minLength(16), Validators.maxLength(72)]),
    });

    this.user = this.userStore.getUser();

    this.userForm.patchValue({
      displayName: this.user.displayName,
      description: this.user.description,

      websiteLink: this.user.websiteLink ?? '',
      twitterLink: this.user.twitterLink ?? '',
      twitchLink: this.user.twitchLink ?? '',
      youtubeLink: this.user.youtubeLink ?? '',
      facebookLink: this.user.facebookLink ?? '',
    });
  }

  get canEdit(): boolean {
    return this.mode !== UserFormMode.VIEW;
  }

  changeMonth(month: number) {
    this.monthSelected = month;
  }

  changeDay(day: number) {
    this.daySelected = day;
  }

  changeYear(year: number) {
    this.yearSelected = year;
  }


  loadUserData() {
    const currentUserId = this.userStore.getUser().id;

    this.usersService.getYourBirthday(currentUserId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((birthday) => {
        this.monthSelected = birthday.dateOfBirthMonth;
        this.daySelected = birthday.dateOfBirthDay?.toString();
        this.yearSelected = birthday.dateOfBirthYear?.toString();

        this.genderSelected = birthday.gender;
      });

    this.loadUser(currentUserId);
  }

  loadUser(id?) {
    const loadUser = this.usersService.getCurrentUser();
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.userForm.setValue({
          displayName: user.displayName ? user.displayName : '',
          description: user.description ? user.description : '',
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
    let body = {
      displayName: this.userForm.get('displayName').value,
      description: this.userForm.get('description').value,

      websiteLink: this.userForm.get('websiteLink').value,
      twitterLink: this.userForm.get('twitterLink').value,
      twitchLink: this.userForm.get('twitchLink').value,
      youtubeLink: this.userForm.get('youtubeLink').value,
      facebookLink: this.userForm.get('facebookLink').value,

      gender: this.genderSelected,

      dateOfBirthMonth: +this.monthSelected,
      dateOfBirthDay: +this.daySelected,
      dateOfBirthYear: +this.yearSelected,
    };

    let observable = new Observable<IUser>();
    this.usersService.updateCurrentPersonal(body).subscribe((result: any) => {
        this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
        this.handleSuccessResponse();
      },
      err => {
        this.handleWrongResponse();
      });

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
    this.toasterService.success('', `Profile updated!`);
    this.back();
  }

  handleWrongResponse() {
    this.toasterService.danger('', `This email has already taken!`);
  }

  back() {
    this.router.navigate(['/', this.userStore.getUser().screenName.substring(1)]);
    // this.router.navigate(['/pages/users/list']);
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
