import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {ConfigurationService} from "../../core/configuration.service";
import {IRootState} from "../../+store";

@Injectable({
  providedIn: 'root',
})
export class ScienceService {
  private http: HttpClient;
  private store: Store<IRootState>;
  private configurationService: ConfigurationService;

  private storageUrl: string;

  // private uploadPath: string = environment.scienceApiUrl + 'media' + '/upload';
  // private uploadPathWithoutSlash = this.uploadPath.slice(0, -1);

  constructor(store: Store<IRootState>, http: HttpClient, configurationService: ConfigurationService) {
    this.store = store;
    this.http = http;
    this.configurationService = configurationService;

    if (this.configurationService.isReady) {
      this.storageUrl = this.configurationService.serverSettings.storageUrl;
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => this.storageUrl = this.configurationService.serverSettings.storageUrl);
    }
  }

  upload(formData) {
    return this.http.post<any>(this.storageUrl + '/upload/image', formData, {
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
