import { Component, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

import { concat, of } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../core';
import {
  USER_DAY_VALIDATOR,
  USER_DISPLAY_NAME_REQUIRED_VALIDATOR,
  USER_EMAIL_VALIDATOR, USER_MONTH_VALIDATOR,
  USER_PASSWORD_VALIDATOR,
  USER_USERNAME_VALIDATOR, USER_YEAR_VALIDATOR
} from '../../../shared/form-validators/user-validators';
import { FormReactive } from '../../../shared/shared-forms/form-reactive';
import { FormValidatorService } from '../../../shared/shared-forms/form-validator.service';
import { Month } from '../../../shared/shared-main/enums/month';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: [ './account-modal.component.scss' ]
})
export class AccountModalComponent extends FormReactive implements OnInit {
  @Output() formBuilt = new EventEmitter<FormGroup>();

  constructor(protected formValidatorService: FormValidatorService, private userService: UserService,
              private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    for (let day = 1; day <= 31; day++) {
      this.days.push(day);
    }

    for (let year = 2021; year >= 2021 - 121; year--) {
      this.years.push(year);
    }

    super.buildForm({
      username: USER_USERNAME_VALIDATOR,
      email: USER_EMAIL_VALIDATOR,
      password: USER_PASSWORD_VALIDATOR,
      birthday: {
        month: USER_MONTH_VALIDATOR,
        day: USER_DAY_VALIDATOR,
        year: USER_YEAR_VALIDATOR,
      },
    });

    // setTimeout(() => this.formBuilt.emit(this.form));

    setTimeout(() => {
      this.formBuilt.emit(this.form);
    });

    // concat(of(''),
    //   this.form.get('username').valueChanges
    // ).pipe(pairwise())
    //   .subscribe(([ oldValue, newValue ]) => this.onDisplayNameChange(oldValue, newValue));
  }

  public isNameCountOver40: boolean = false;

  public months = Month;
  public days: number[] = [];
  public years: number[] = [];

  changeMonth(ev: any) {
    this.form.get('birthday.month').setValue(ev.target.value, {
     // onlySelf: true,
    });
  }

  changeDay(ev: any) {
    this.form.get('birthday.day').setValue(ev.target.value, {
     // onlySelf: true
    });
  }

  changeYear(ev: any) {
    this.form.get('birthday.year').setValue(ev.target.value, {
      // onlySelf: true
    });
  }

  public get instanceHost() {
    return window.location.host;
  }

  private onDisplayNameChange(oldDisplayName: string, newDisplayName: string) {
    const username = this.form.value['username'] || '';

    const newUsername = this.userService.getNewUsername(oldDisplayName, newDisplayName, username);
    this.form.patchValue({ username: newUsername });
  }

  public show: boolean = false;
  public revealOrHidePasswordText: string = 'Reveal password';

  togalePass(): void {
    this.show = !this.show;
    this.revealOrHidePasswordText = this.show ? 'Hide password' : 'Reveal password';
  }

  public nameCurrentCount: number = 0;

  @HostListener('window:keyup', [ '$event' ])
  inputKeyupHandler(ev: KeyboardEvent): void {
    if ((ev.target as HTMLInputElement).maxLength === 40) {
      this.nameCurrentCount = (ev.target as HTMLInputElement).value.length;

      this.isNameCountOver40 = this.nameCurrentCount > 40;
    }
  }
}
