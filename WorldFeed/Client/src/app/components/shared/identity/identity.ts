import {Component, OnInit, OnChanges, Output, Input, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs';

import {SecurityService} from '../../../core/shared-core/services/security.service';

import {User, UserManager, UserManagerSettings} from 'oidc-client';
import * as Oidc from 'oidc-client';

import axios from 'axios';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.html',
  styleUrls: ['./identity.scss']
})
export class Identity implements OnInit {
  private userManager: UserManager;
  private subscription: Subscription;

  isAuthenticated = false;
  public userName = ''; // was private

  constructor(private securityService: SecurityService) {

  }

  ngOnInit() {
    this.subscription = this.securityService.authenticationChallenge$.subscribe(res => {
      this.isAuthenticated = res;
      this.userName = this.securityService.UserData.email;
    });

    if (window.location.hash) {
      this.securityService.AuthorizedCallback();
    }

    this.isAuthenticated = this.securityService.IsAuthorized;
    console.log('identity component, checking authorized' + this.securityService.IsAuthorized);

    if (this.isAuthenticated) {
      if (this.securityService.UserData) {
        this.userName = this.securityService.UserData.email;
      }
    }
  }

  logoutClicked(event: any) {
    event.preventDefault();
    console.log('Logout clicked');
    this.logout();
  }

  login() {
    this.securityService.Authorize();
  }

  logout() {
    // this.signalrService.stop();
    this.securityService.Logoff();
  }
}
