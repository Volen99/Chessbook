// This is our Main Method where everything starts
import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {SecurityService} from './shared/services/security.service';
import {ConfigurationService} from './shared/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private securityService: SecurityService, private configurationService: ConfigurationService) {
    this.Authenticated = this.securityService.isAuthorized;
  }

  public Authenticated = false;
  public subscription: Subscription;

  ngOnInit() {
    console.log('app on init');
    this.subscription = this.securityService.authenticationChallenge$.subscribe(res => this.Authenticated = res);

    // Get configuration from server environment variables:
    console.log('configuration');
    this.configurationService.load();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle('WorldFeedOnContainers');
  }
}
