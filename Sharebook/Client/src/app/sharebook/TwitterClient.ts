import {Inject, Injectable, Injector, Optional, ReflectiveInjector} from "@angular/core";

import {ISharebookSettings, SharebookSettings} from "../core/Public/Settings/SharebookSettings";
import {IRateLimitCache} from "../core/Core/RateLimit/IRateLimitCache";
import {ITwitterClient, ITwitterClientToken} from "../core/Public/ITwitterClient";
import {
  IReadOnlyTwitterCredentials,
  ReadOnlyTwitterCredentials
} from '../core/Core/Models/Authentication/ReadOnlyTwitterCredentials';
import {ITwitterClientFactories} from "../core/Public/Client/Tools/ITwitterClientFactories";
import {IParametersValidator, ParametersValidator} from "../core/Core/Client/Validators/ParametersValidator";
import {ITwitterExecutionContext, TwitterExecutionContext} from "../core/Core/Client/TwitterExecutionContext";
import {IRawExecutors, IRawExecutorsToken} from "../core/Public/Client/IRawExecutors";
import {IAuthClient} from "../core/Public/Client/Clients/IAuthClient";
import {IAccountSettingsClient} from "../core/Public/Client/Clients/IAccountSettingsClient";
import {IExecuteClient} from "../core/Public/Client/Clients/IExecuteClient";
import {IHelpClient} from "../core/Public/Client/Clients/IHelpClient";
import {IListsClient} from "../core/Public/Client/Clients/IListsClient";
import {IMessagesClient} from "../core/Public/Client/Clients/IMessagesClient";
import {IRateLimitsClient} from "../core/Public/Client/Clients/IRateLimitsClient";
import {ISearchClient} from "../core/Public/Client/Clients/ISearchClient";
import {IStreamsClient} from "../core/Public/Client/Clients/IStreamsClient";
import {ITimelinesClient} from "../core/Public/Client/Clients/ITimelinesClient";
import {ITrendsClient} from "../core/Public/Client/Clients/ITrendsClient";
import {ITweetsClient} from "../core/Public/Client/Clients/ITweetsClient";
import {IUploadClient} from "../core/Public/Client/Clients/IUploadClient";
import {IUsersClient} from "../core/Public/Client/Clients/IUsersClient";
import {IAccountActivityClient} from "../core/Public/Client/Clients/IAccountActivityClient";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {TwitterRequest} from "../core/Public/TwitterRequest";
import {TwitterQuery} from "../core/Public/TwitterQuery";
import {TwitterCredentials} from "../core/Public/Models/Authentication/TwitterCredentials";
import {IExternalClientEvents, ITwitterClientEvents} from "../core/Core/Events/TweetinviGlobalEvents";
import {IJsonClient} from "../core/Public/Client/Clients/IJsonClient";
import {UploadClient} from "./Client/Clients/UploadClient";
import {RawExecutors} from "./Client/RawExecutors";
import {IAccountActivityRequester} from "../core/Public/Client/Requesters/IAccountActivityRequester";
import {AccountActivityRequester} from "./Client/Requesters/AccountActivityRequester";
import {IAccountSettingsRequester} from "../core/Public/Client/Requesters/IAccountSettingsRequester";
import {IHelpRequester} from "../core/Public/Client/Requesters/IHelpRequester";
import {ISearchRequester} from "../core/Public/Client/Requesters/ISearchRequester";
import {ITwitterListsRequester} from "../core/Public/Client/Requesters/ITwitterListsRequester";
import {AuthRequester} from "./Client/Requesters/AuthRequester";
import {AccountSettingsRequester} from "./Client/Requesters/AccountSettingsRequester";
import {HelpRequester} from "./Client/Requesters/HelpRequester";
import {SearchRequester} from "./Client/Requesters/SearchRequester";
import {TwitterListsRequester} from "./Client/Requesters/TwitterListsRequester";
import {TimelinesRequester} from "./Client/Requesters/TimelinesRequester";
import {TrendsRequester} from "./Client/Requesters/TrendsRequester";
import {TweetsRequester} from "./Client/Requesters/TweetsRequester";
import {UploadRequester} from "./Client/Requesters/UploadRequester";
import {UsersRequester} from "./Client/Requesters/UsersRequester";
import {AuthClient} from "./Client/Clients/AuthClient";
import {AccountSettingsClient} from "./Client/Clients/AccountSettingsClient";
import {ExecuteClient} from "./Client/Clients/ExecuteClient";
import {HelpClient} from "./Client/Clients/HelpClient";
import {ListsClient} from "./Client/Clients/ListsClient";
import {MessagesClient} from "./Client/Clients/MessagesClient";
import {RateLimitsClient} from "./Client/Clients/RateLimitsClient";
import {SearchClient} from "./Client/Clients/SearchClient";
import {TimelinesClient} from "./Client/Clients/TimelinesClient";
import {TrendsClient} from "./Client/Clients/TrendsClient";
import {TweetsClient} from "./Client/Clients/TweetsClient";
import {UsersClient} from "./Client/Clients/UsersClient";
import {AccountActivityClient} from "./Client/Clients/AccountActivityClient";
import {AppInjector} from "./Injectinvi/app-injector";
import {IRateLimitCacheManager} from "../core/Core/RateLimit/IRateLimitCacheManager";
import {RateLimitCacheManager} from "../Tweetinvi.Credentials/RateLimit/RateLimitCacheManager";
import {App} from "../core/Core/Models/Properties/App";

@Injectable({
  providedIn: 'root',
})
export class TwitterClientParameters {
  constructor() {
    this.settings = new SharebookSettings();
  }

  public rateLimitCache: IRateLimitCache;

  public settings: ISharebookSettings;

  // public event BeforeRegistrationCompletes: EventHandler<TweetinviContainerEventArgs>;

  // public RaiseBeforeRegistrationCompletes(args: TweetinviContainerEventArg): void {
  //   args.TweetinviContainer.Raise(BeforeRegistrationCompletes, args);
  // }
}

@Injectable({
  providedIn: 'root',
})
export class TwitterClient implements ITwitterClient {
  private _credentials: IReadOnlyTwitterCredentials;
  // private readonly _tweetinviContainer: ITweetinviContainer;
  private readonly _twitterClientEvents: ITwitterClientEvents;

  constructor(parameters?: TwitterClientParameters) {
    // this.credentials = credentials;
    this.config = parameters?.settings ?? new SharebookSettings();

    // if (parameters?.rateLimitCache != null) {
    //   _tweetinviContainer.RegisterInstance(typeof(IRateLimitCache), parameters.RateLimitCache);
    // }

    // Injector.create({
    //   providers: [{provide: TwitterClient, useValue: this}]
    // });
    // Injector.create({
    //   providers: [{provide: ITwitterClientToken, useValue: this}]
    // });
    // _tweetinviContainer.RegisterInstance(typeof(TwitterClient), this);
    // _tweetinviContainer.RegisterInstance(typeof(ITwitterClient), this);

    // Injector.create({providers: [{provide: TwitterClient, useValue: this}]});

    // debugger
    // let requestExecutor = this.injector.get(IRawExecutorsToken); // _tweetinviContainer.Resolve<IRawExecutors>();
    // this.raw = requestExecutor;

    // let parametersValidator = this._tweetinviContainer.Resolve<IParametersValidator>();
    // this.parametersValidator = parametersValidator;

    // this.auth = this._tweetinviContainer.Resolve<IAuthClient>();
    // this.accountSettings = this._tweetinviContainer.Resolve<IAccountSettingsClient>();
    // this.execute = this._tweetinviContainer.Resolve<IExecuteClient>();
    // this.help = this._tweetinviContainer.Resolve<IHelpClient>();
    // this.lists = this._tweetinviContainer.Resolve<IListsClient>();
    // this.messages = this._tweetinviContainer.Resolve<IMessagesClient>();
    // this.rateLimits = AppInjector.get(RateLimitsClient); // this._tweetinviContainer.Resolve<IRateLimitsClient>();
    // this.search = this._tweetinviContainer.Resolve<ISearchClient>();
    // this.streams = this._tweetinviContainer.Resolve<IStreamsClient>();
    // this.timelines = this._tweetinviContainer.Resolve<ITimelinesClient>();
    // this.trends = this._tweetinviContainer.Resolve<ITrendsClient>();
    // this.tweets = this._tweetinviContainer.Resolve<ITweetsClient>();
    // this.upload = new UploadClient(this); // this._tweetinviContainer.Resolve<IUploadClient>();
    // this.users = this._tweetinviContainer.Resolve<IUsersClient>();
    // this.accountActivity = this._tweetinviContainer.Resolve<IAccountActivityClient>();

    // this._tweetinviContainer.AssociatedClient = this;

    // this._twitterClientEvents = this._tweetinviContainer.Resolve<ITwitterClientEvents>();
    // this.factories = this._tweetinviContainer.Resolve<ITwitterClientFactories>();
    // this.json = this._tweetinviContainer.Resolve<IJsonClient>();

    // debugger
    // let rateLimitCacheManager = AppInjector.get(RateLimitCacheManager);
    // rateLimitCacheManager.rateLimitsClient = this.rateLimits;
  }

  // IMPORTANT NOTE: The setter is for convenience. It is strongly recommended to create a new TwitterClient instead.
  // As using this setter could result in unexpected concurrency between the time of set and the execution of previous
  // non awaited async operations.
  get credentials(): IReadOnlyTwitterCredentials {
    return this._credentials;
  }

  set credentials(value: IReadOnlyTwitterCredentials) {
    this._credentials = new ReadOnlyTwitterCredentials(value, null);
  }


  public config: ISharebookSettings;

  public auth: IAuthClient;
  public accountSettings: IAccountSettingsClient;
  public execute: IExecuteClient;
  public help: IHelpClient;
  public lists: IListsClient;
  public messages: IMessagesClient;
  public rateLimits: IRateLimitsClient;
  public search: ISearchClient;
  public streams: IStreamsClient;
  public timelines: ITimelinesClient;
  public trends: ITrendsClient;
  public tweets: ITweetsClient;
  public upload: IUploadClient;
  public users: IUsersClient;
  public accountActivity: IAccountActivityClient;

  get events(): IExternalClientEvents {
    return this._twitterClientEvents;
  }

  public factories: ITwitterClientFactories;
  public json: IJsonClient;

  public parametersValidator: IParametersValidator;
  public raw: IRawExecutors;

  public createTwitterExecutionContext(): ITwitterExecutionContext {
    let result = new TwitterExecutionContext();
    result.requestFactory = this.createRequest;
    // result.container = this._tweetinviContainer;
    result.events = this._twitterClientEvents;

    return result;
  }

  public createRequest(): ITwitterRequest {
    let twitterQuery = new TwitterQuery();
    // we are cloning here to ensure that the context will never be modified regardless of concurrency
    // @ts-ignore
    twitterQuery.twitterCredentials = new TwitterCredentials(this.credentials);

    let request = new TwitterRequest();
    request.executionContext = this.createTwitterExecutionContext();
    request.query = twitterQuery;

    request.query.initialize(this.config);
    request.executionContext.initialize(this.config);

    return request;
  }
}
