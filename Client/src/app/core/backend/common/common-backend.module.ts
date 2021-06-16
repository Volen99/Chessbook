import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserData } from '../../interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';
import { CountriesApi } from './api/countries.api';
import { SettingsApi } from './api/settings.api';
import { SettingsData } from '../../interfaces/common/settings';
import { SettingsService } from './services/settings.service';
import {NbAuthModule} from "../../../sharebook-nebular/auth/auth.module";

const API = [UsersApi, CountriesApi, SettingsApi, HttpService];

const SERVICES = [
  { provide: UserData, useClass: UsersService },
  { provide: SettingsData, useClass: SettingsService },
];

@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
