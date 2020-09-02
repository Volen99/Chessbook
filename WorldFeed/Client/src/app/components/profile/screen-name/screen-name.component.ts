import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

import {SecurityService} from "../../../core/shared-core/services/security.service";
import {AccountSettingsService} from "../../../core/shared-core/services/account-settings/account-settings.service";
import {AccountSettings} from "../../../core/models/settings/models/settings.model";
import {TimeZone} from "../../../core/models/settings/models/time-zone.model";
import { UpdateAccountSettingsParameters } from 'src/app/core/models/settings/models/update-account-settings-parameters.model';

@Component({
  selector: 'app-profile-screen-name',
  templateUrl: './screen-name.component.html',
  styleUrls: ['./screen-name.component.css']
})
export class ScreenNameComponent implements OnInit {
  // The FormBuilder provides syntactic sugar that shortens creating instances of a FormControl, FormGroup,
  // or FormArray. It reduces the amount of boilerplate needed to build complex forms
  private fb: FormBuilder;
  private http: HttpClient;
  private accountSettingsService: AccountSettingsService;

  private accountSettings: AccountSettings = {} as AccountSettings;

  constructor(http: HttpClient, fb: FormBuilder, accountSettingsService: AccountSettingsService) {
    this.http = http;
    this.fb = fb;
    this.accountSettingsService = accountSettingsService;
  }

  public usernameForm: FormGroup;
  public updateAccountSettingsParameters: UpdateAccountSettingsParameters = {} as UpdateAccountSettingsParameters;


  ngOnInit() {
    this.usernameForm = this.fb.group({
      screen_name: ['', [Validators.required]],
    });
  }

  async onSubmit(value: any) {
    this.accountSettingsService.getSettings().subscribe(settings => {
      debugger
      this.accountSettings = settings;
    });

    const form = this.usernameForm.value;

    const username = form.screen_name;

    this.mapUpdateAccountSettingsParametersToAccountSettings();

    debugger
    this.accountSettingsService.updateSettings(this.updateAccountSettingsParameters).subscribe(x => console.log('account updated ' + x));
  }

  public mapUpdateAccountSettingsParametersToAccountSettings() {
    this.updateAccountSettingsParameters.displayLanguage = this.accountSettings.language;
    this.updateAccountSettingsParameters.startSleepHour = this.accountSettings.sleep_time.start_time;
    this.updateAccountSettingsParameters.endSleepHour = this.accountSettings.sleep_time.end_time;
    this.updateAccountSettingsParameters.sleepTimeEnabled = this.accountSettings.sleep_time.enabled;
    this.updateAccountSettingsParameters.timeZone = this.accountSettings.time_zone.name;
    this.updateAccountSettingsParameters.trendLocationWoeid = this.accountSettings.trend_location.code;
  }
}
