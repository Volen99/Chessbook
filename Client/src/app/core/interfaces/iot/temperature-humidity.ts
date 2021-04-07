import { Observable } from 'rxjs';
import { Device, DeviceParameter } from './devices';

export abstract class TemperatureHumidityData {
  abstract getTemperatureDevice(): Observable<Device>;
  abstract getHumidityDevice(): Observable<Device>;

  abstract setTemperatureDevice(device: Device): Observable<Device>;
  abstract setHumidityDevice(device: Device): Observable<Device>;

  abstract setTemperatureParameter(parameter: DeviceParameter): Observable<DeviceParameter>;
  abstract setHumidityParameter(parameter: DeviceParameter): Observable<DeviceParameter>;
}
