import { Observable } from 'rxjs';

export interface DeviceViewSettings {
  iconClass: string;
  type: string;
}

export interface DeviceParameter {
  id: number;
  name: string;
  value: number | string;
  min?: number;
  max?: number;
}

export interface Device {
  id: number;
  isOn: boolean;
  name: string;
  type: string;
  settings?: DeviceViewSettings;
  parameters?: DeviceParameter[];
}

export abstract class DevicesData {
  abstract list(): Observable<Device[]>;
  abstract edit(device: Device): Observable<Device>;
}
