import {Component, OnInit} from '@angular/core';

import {StorageService} from '../../../core/shared-core/services/storage.service';
import {SecurityService} from '../../../core/shared-core/services/security.service';
import {AccountSettings} from "../../../core/models/settings/models/settings.model";
import {User} from "oidc-client";
import {AccountSettingsService} from "../../../core/shared-core/services/account-settings/account-settings.service";
import {ConfigurationService} from "../../../core/shared-core/services/configuration.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [AccountSettingsService]
})
export class ViewComponent implements OnInit {
  private storageService: StorageService;
  private accountSettingsService: AccountSettingsService;
  private configurationService: ConfigurationService;
  private securityService: SecurityService;

  private authenticated = false;

  constructor(storageService: StorageService, accountSettingsService: AccountSettingsService,
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
      this.settings = settings;
    });
  }
}
