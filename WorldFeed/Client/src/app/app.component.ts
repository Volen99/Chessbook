// This is our Main Method where everything starts

import {Title} from '@angular/platform-browser';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';

import {SecurityService} from './core/shared-core/services/security.service';
import {ConfigurationService} from './core/shared-core/services/configuration.service';
import {SignalrService} from './core/shared-core/services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Authenticated = false;
  subscription: Subscription;

  constructor(private titleService: Title,
              private securityService: SecurityService,
              private configurationService: ConfigurationService,
              private signalrService: SignalrService,
              vcr: ViewContainerRef
  ) {
    // TODO: Set Taster Root (Overlay) container
    //this.toastr.setRootViewContainerRef(vcr);
    this.Authenticated = this.securityService.IsAuthorized;
  }

  ngOnInit() {
    console.log('app on init');
    this.subscription = this.securityService.authenticationChallenge$.subscribe(res => this.Authenticated = res);

    //Get configuration from server environment variables:
    console.log('configuration');
    this.configurationService.load();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle('eShopOnContainers');
  }
}
