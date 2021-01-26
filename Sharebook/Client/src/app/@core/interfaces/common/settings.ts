import { Observable } from 'rxjs';

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_PERSONAL / LICENSE_COMMERCIAL in the project root for license information on type of purchased license.
 */

export interface Settings {
    themeName: string;
}

export abstract class SettingsData {
    abstract getCurrentSetting(): Observable<Settings>;
    abstract updateCurrent(setting: Settings): Observable<Settings>;
}
