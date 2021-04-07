import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SettingsData, Settings } from '../../interfaces/common/settings';

@Injectable()
export class SettingsService extends SettingsData {

  getCurrentSetting(): Observable<Settings> {
    return of({
      themeName: 'cosmic',
    });
  }

  updateCurrent(setting: any): Observable<Settings> {
    return of({
      themeName: 'corporate',
    });
  }
}
