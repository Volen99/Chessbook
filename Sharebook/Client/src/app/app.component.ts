import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {SecurityService} from './shared/services/security.service';
import {ConfigurationService} from './shared/services/configuration.service';
import {TwitterClient} from "./sharebook/TwitterClient";
import {RawExecutors} from "./sharebook/Client/RawExecutors";
import {UploadClient} from "./sharebook/Client/Clients/UploadClient";
import {AuthClient} from "./sharebook/Client/Clients/AuthClient";
import {AccountSettingsClient} from "./sharebook/Client/Clients/AccountSettingsClient";
import {ExecuteClient} from "./sharebook/Client/Clients/ExecuteClient";
import {HelpClient} from "./sharebook/Client/Clients/HelpClient";
import {ListsClient} from "./sharebook/Client/Clients/ListsClient";
import {MessagesClient} from "./sharebook/Client/Clients/MessagesClient";
import {RateLimitsClient} from "./sharebook/Client/Clients/RateLimitsClient";
import {SearchClient} from "./sharebook/Client/Clients/SearchClient";
import {StreamsClient} from "./sharebook/Client/Clients/StreamsClient";
import {TimelinesClient} from "./sharebook/Client/Clients/TimelinesClient";
import {TrendsClient} from "./sharebook/Client/Clients/TrendsClient";
import {TweetsClient} from "./sharebook/Client/Clients/TweetsClient";
import {UsersClient} from "./sharebook/Client/Clients/UsersClient";
import {AccountActivityClient} from "./sharebook/Client/Clients/AccountActivityClient";
import {ParametersValidator} from "./core/Core/Client/Validators/ParametersValidator";
import {AppInjector} from "./sharebook/Injectinvi/app-injector";
import {RateLimitCacheManager} from "./Tweetinvi.Credentials/RateLimit/RateLimitCacheManager";

// This is our Main Method where everything starts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/site.css', './app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private securityService: SecurityService, private configurationService: ConfigurationService,
              twitterClient: TwitterClient,
              rawExecutor: RawExecutors,
              upload: UploadClient,
              parametersValidator: ParametersValidator,
              authClient: AuthClient,
              accountSettingsClient: AccountSettingsClient,
              executeClient: ExecuteClient,
              helpClient: HelpClient,
              listsClient: ListsClient,
              messagesClient: MessagesClient,
              rateLimitsClient: RateLimitsClient,
              searchClient: SearchClient,
              // streamsClient: StreamsClient,
              timelinesClient: TimelinesClient,
              trendsClient: TrendsClient,
              tweetsClient: TweetsClient,
              uploadClient: UploadClient,
              usersClient: UsersClient,
              accountActivityClient: AccountActivityClient,
              ) {
    this.Authenticated = this.securityService.isAuthorized;


    twitterClient.raw = rawExecutor;
    twitterClient.parametersValidator = parametersValidator;
    twitterClient.auth = authClient;
    twitterClient.accountSettings = accountSettingsClient;
    twitterClient.execute = executeClient;
    twitterClient.help = helpClient;
    twitterClient.lists = listsClient;
    twitterClient.messages = messagesClient;

    twitterClient.rateLimits = rateLimitsClient;
    let rateLimitCacheManager = AppInjector.get(RateLimitCacheManager);
    rateLimitCacheManager.rateLimitsClient = twitterClient.rateLimits;

    twitterClient.search = searchClient;
    // twitterClient.streams = streamsClient;
    twitterClient.timelines = timelinesClient;
    twitterClient.trends = trendsClient;
    twitterClient.tweets = tweetsClient;
    twitterClient.upload = uploadClient;
    twitterClient.users = usersClient;
    twitterClient.accountActivity = accountActivityClient;
  }

  public Authenticated = false;
  public subscription: Subscription;

  ngOnInit() {
    // console.log('app on init');
    // this.subscription = this.securityService.authenticationChallenge$.subscribe(res => this.Authenticated = res);
    //
    // // Get configuration from server environment variables:
    // console.log('configuration');
    // this.configurationService.load();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
