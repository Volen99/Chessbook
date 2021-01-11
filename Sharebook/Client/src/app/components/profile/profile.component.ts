import {Component, OnInit} from '@angular/core';

import {StorageService} from '../../api-authorization/services/storage.service';
import {SecurityService} from '../../api-authorization/from-shared/security.service';
import {User} from "oidc-client";
import {ProfileService} from "./profile.service";
import {ConfigurationService} from "../../core/configuration.service";
import {Subscription} from "rxjs";
import {TwitterClient} from "../../sharebook/TwitterClient";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/css/site.css', './profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  private storageService: StorageService;
  private accountSettingsService: ProfileService;
  private configurationService: ConfigurationService;
  private securityService: SecurityService;
  private twitterClient: TwitterClient;

  private authenticated = false;

  constructor(storageService: StorageService, accountSettingsService: ProfileService,
              configurationService: ConfigurationService, securityService: SecurityService,
              twitterClient: TwitterClient) {
    this.storageService = storageService;
    this.accountSettingsService = accountSettingsService;
    this.configurationService = configurationService;
    this.securityService = securityService;
    this.twitterClient = twitterClient;

  }

  public user: User;
  public authSubscription: Subscription;

  async ngOnInit(): Promise<void> {
    let user = await this.twitterClient.users.getUserAsync('volen1999@gmail.com');

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
