import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../../store/app.state';
import {ConfigurationService} from "../../shared/services/configuration.service";

@Injectable({
  providedIn: 'root',
})
export class ScienceService {
  private http: HttpClient;
  private store: Store<AppState>;
  private configurationService: ConfigurationService;

  private uploadUrl: string;

  // private uploadPath: string = environment.scienceApiUrl + 'media' + '/upload';
  // private uploadPathWithoutSlash = this.uploadPath.slice(0, -1);

  constructor(store: Store<AppState>, http: HttpClient, configurationService: ConfigurationService) {
    this.store = store;
    this.http = http;
    this.configurationService = configurationService;

    if (this.configurationService.isReady) {
      this.uploadUrl = this.configurationService.serverSettings.uploadUrl;
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => this.uploadUrl = this.configurationService.serverSettings.uploadUrl);
    }
  }

  upload(formData) {
    return this.http.post<any>(this.uploadUrl + '/upload/image', formData, {
      // reportProgress: true,
      // observe: 'events',
    });
  }

  removeMedia(mediaId: number): Observable<string> {
    // @ts-ignore
    return this.http.post(this.removeMediaPath, mediaId, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
