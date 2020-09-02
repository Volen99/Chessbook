import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

import {AccountSettings} from "../../../models/settings/models/settings.model";
import {ConfigurationService} from "../configuration.service";
import {DataService} from "../data.service";
import {tap} from "rxjs/operators";

// Implementing a Retry-Circuit breaker policy
// is pending to do for the SPA app
@Injectable()
export class AccountSettingsService {
  private http: HttpClient;
  private dataService: DataService;
  private configurationService: ConfigurationService;

  private apiGatewayUrl: string;

  constructor(http: HttpClient, dataService: DataService, configurationService: ConfigurationService) {
    this.http = http;
    this.dataService = dataService;
    this.configurationService = configurationService;

    if (this.configurationService.isReady) {
      this.apiGatewayUrl = this.configurationService.serverSettings.apiGatewayUrl;
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => this.apiGatewayUrl = this.configurationService.serverSettings.apiGatewayUrl);
    }
  }

  public getSettings(): Observable<AccountSettings> {
    const url = this.apiGatewayUrl + 'account/settings';

    return this.dataService.get(url).pipe<AccountSettings>(tap((response: any) => {
      return response;
    }));
  }

  public updateSettings(param: any): Observable<AccountSettings> {
    const url = this.apiGatewayUrl + 'account/settings';

    return this.dataService.post(url, param).pipe<AccountSettings>(tap((response: any) => {
      debugger
      return response;
    }));
  }
}
