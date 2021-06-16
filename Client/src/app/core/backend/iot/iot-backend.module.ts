import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonBackendModule } from '../common/common-backend.module';

import { PhoneApi } from './api/phone.api';

import { PhoneData } from '../../interfaces/iot/phone';


import { PhoneService } from './services/phone.service';

const API = [
  PhoneApi,
];

const SERVICES = [
  { provide: PhoneData, useClass: PhoneService },
];

// const INTERNAL_SERVICES = [DeviceTypeService];

@NgModule({
  imports: [CommonModule, CommonBackendModule],
  exports: [CommonBackendModule],
})
export class IotBackendModule {
  static forRoot(): ModuleWithProviders<IotBackendModule> {
    return {
      ngModule: IotBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
