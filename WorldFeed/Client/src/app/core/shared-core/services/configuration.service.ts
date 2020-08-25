import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { Configuration } from '../../models/configuration.model';
import {StorageService} from './storage.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ConfigurationService {
  // observable that is fired when settings are loaded from server
  private settingsLoadedSource = new Subject();
  private storageService: StorageService;
  private http: HttpClient;

  serverSettings: Configuration;
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady = false;

  constructor(http: HttpClient, storageService: StorageService) {
    this.http = http;
    this.storageService = storageService;
  }

  load() {
    const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
    const url = environment.homeApiUrl; // `${baseURI}Home/Configuration`;
    this.http.get(url, {
      headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'}, // by me!!!
    } ).subscribe((response) => {
      console.log('server settings loaded');
      this.serverSettings = response as Configuration;
      console.log(this.serverSettings);
      this.storageService.store('identityUrl', this.serverSettings.identityUrl);
      this.isReady = true;
      this.settingsLoadedSource.next();
    });
  }
}
