import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from "rxjs/operators";

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
import {NbAuthOAuth2JWTToken} from "../../../../sharebook-nebular/auth/services/token/token";
import {HttpService} from "../../../../core/backend/common/api/http.service";

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

export interface IUtcStuff {
  countries: ICountryUtc[];
  timeZones: ITimeZoneUtc[];
}

export interface ICountryUtc {
  value: string;
  text: string;
}

export interface ITimeZoneUtc {
  value: string;
  text: string;
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
              private fb: FormBuilder,
              private httpService: HttpService) {
  }

  utcStuff: IUtcStuff;

  ngOnInit(): void {
    this.httpService.get('users/utc-stuff')
        .subscribe((data: IUtcStuff) => {
          this.utcStuff = data;

          this.countryId = data.countries[0].value;
          this.timeZoneId = data.timeZones[0].value;
        }, err => console.log(err.message));

    let date = new Date();
    for (let day = 1; day <= 31; day++) {
      this.days.push(day);
    }

    for (let year = date.getFullYear(); year >= date.getFullYear() - 115; year--) {
      this.years.push(year);
    }

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

  countryId: string;  // yeap - string xD
  timeZoneId: string; // yeap - string xD

  user: IUser;

  initUserForm() {
    this.userForm = this.fb.group({
      displayName: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]), // USER_DISPLAY_NAME_REQUIRED_VALIDATOR,
      description: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(160)]), // USER_DESCRIPTION_VALIDATOR,
      websiteLink: this.fb.control('', [Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),
      twitterLink: this.fb.control('', [Validators.pattern(/http(?:s)?:\/\/(?:www)?twitter\.com\/([a-zA-Z0-9_]+)/)]),
      twitchLink: this.fb.control('', [Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(twitch\.tv\/)([^\?&"'>]+)/)]),
      youtubeLink: this.fb.control('', [Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(youtu\.be\/|youtube\.com\/)([^\?&"'>]+)/)]),
      facebookLink: this.fb.control('', [Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+?(?:www.)?facebook.com\/([^\?&"'>]+)/)]),
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

      countryId: +this.countryId,
      timeZoneId: this.timeZoneId,
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

  changeCountry(id: string) {
    this.countryId = id;
  }

  changeTimeZone(id: string) {
    this.timeZoneId = id;
  }

}
