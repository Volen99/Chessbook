import { Observable } from 'rxjs';

export interface Settings {
    themeName: string;
}

export abstract class SettingsData {
    abstract getCurrentSetting(): Observable<Settings>;
    abstract updateCurrent(setting: Settings): Observable<Settings>;
}
