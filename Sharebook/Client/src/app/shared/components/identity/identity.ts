import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.html',
  styleUrls: ['./identity.scss']
})
export class Identity implements OnInit {
  private subscription: Subscription;

  constructor(private securityService: SecurityService) {

  }

  public isAuthenticated = false;
  public userName = '';

  ngOnInit() {
    this.subscription = this.securityService.authenticationChallenge$.subscribe(res => {
      this.isAuthenticated = res;
      this.userName = this.securityService.userData.profile.name;
    });

    if (window.location.hash) {
      this.securityService.AuthorizedCallback();
    }

    this.isAuthenticated = this.securityService.isAuthorized;
    console.log('identity component, checking authorized' + this.securityService.isAuthorized);

    if (this.isAuthenticated) {
      if (this.securityService.userData) {
        this.userName = this.securityService.userData.profile.name;
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
