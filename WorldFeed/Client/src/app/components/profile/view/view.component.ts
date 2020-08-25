import {Component, OnInit} from '@angular/core';

import {StorageService} from '../../../core/shared-core/services/storage.service';
import {SecurityService} from '../../../core/shared-core/services/security.service';
import {Settings} from "../../../core/models/settings/models/settings.model";
import {User} from "oidc-client";

@Component({
  selector: 'app-profile-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private storageService: StorageService;
  private securityService: SecurityService;

  constructor(storageService: StorageService, securityService: SecurityService) {
    this.storageService = storageService;
    this.securityService = securityService;

  }

  public user: User;
  public settings: Settings;

  ngOnInit(): void {
    this.user = this.storageService.retrieve('userData');

    this.securityService.getSettings().subscribe(settings => {
      this.settings = settings;
    });
  }
}
