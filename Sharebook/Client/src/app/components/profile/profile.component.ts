import {Component, OnInit} from '@angular/core';

import {StorageService} from '../../shared/services/storage.service';
import {SecurityService} from '../../shared/services/security.service';
import {User} from "oidc-client";
import {ProfileService} from "./profile.service";
import {ConfigurationService} from "../../shared/services/configuration.service";
import {Subscription} from "rxjs";
import {AccountSettings} from "../models/settings/settings.model";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  private storageService: StorageService;
  private accountSettingsService: ProfileService;
  private configurationService: ConfigurationService;
  private securityService: SecurityService;

  private authenticated = false;

  constructor(storageService: StorageService, accountSettingsService: ProfileService,
              configurationService: ConfigurationService, securityService: SecurityService) {
    this.storageService = storageService;
    this.accountSettingsService = accountSettingsService;
    this.configurationService = configurationService;
    this.securityService = securityService;

  }

  public user: User;
  public settings: AccountSettings;
  public authSubscription: Subscription;

  ngOnInit(): void {
    if (this.configurationService.isReady) {
      this.loadData();
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => {
        this.loadData();
      });
    }

    // Subscribe to login and logout observable
    this.authSubscription = this.securityService.authenticationChallenge$.subscribe(res => {
      this.authenticated = res;
    });
  }

  public loadData() {
    this.getSettings();
  }

  public getSettings() {
    this.user = this.storageService.retrieve('userData');

    this.accountSettingsService.getSettings().subscribe(settings => {
    });
  }
}
