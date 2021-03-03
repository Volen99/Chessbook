import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonBackendModule } from '../common/common-backend.module';

import { DevicesApi } from './api/devices.api';
import { DeviceParametersApi } from './api/device-parameters.api';
import { EnergyAggregatedApi } from './api/energy-aggregated.api';
import { PhoneApi } from './api/phone.api';
import { TrafficAggregatedApi } from './api/traffic-aggregated.api';

import { PhoneData } from '../../interfaces/iot/phone';


import { PhoneService } from './services/phone.service';

const API = [
  DevicesApi,
  DeviceParametersApi,
  EnergyAggregatedApi,
  PhoneApi,
  TrafficAggregatedApi,
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
