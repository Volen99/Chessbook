import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsApi } from '../api/settings.api';
import { SettingsData, Settings } from '../../../interfaces/common/settings';

@Injectable()
export class SettingsService extends SettingsData {
  constructor(private api: SettingsApi) {
    super();
  }

  getCurrentSetting(): Observable<Settings> {
    return this.api.getCurrent();
  }

  updateCurrent(setting: any): Observable<Settings> {
    return this.api.updateCurrent(setting);
  }
}
