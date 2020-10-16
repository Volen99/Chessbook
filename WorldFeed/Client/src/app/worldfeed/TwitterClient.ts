﻿import {ITweetinviSettings, TweetinviSettings} from "../core/Public/Settings/TweetinviSettings";
import {IRateLimitCache} from "../core/Core/RateLimit/IRateLimitCache";
import {TweetinviContainerEventArgs} from "../core/Public/Events/TweetinviContainerEventArgs";
import {ITwitterClient} from "../core/Public/ITwitterClient";
import {
  IReadOnlyTwitterCredentials,
  ReadOnlyTwitterCredentials
} from '../core/Core/Models/Authentication/ReadOnlyTwitterCredentials';
import {ITwitterClientFactories} from "../core/Public/Client/Tools/ITwitterClientFactories";
import {IParametersValidator} from "../core/Core/Client/Validators/ParametersValidator";
import {ITwitterExecutionContext, TwitterExecutionContext} from "../core/Core/Client/TwitterExecutionContext";
import InvalidOperationException from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {IRawExecutors} from "../core/Public/Client/IRawExecutors";
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
import {IRateLimitCacheManager} from "../core/Core/RateLimit/IRateLimitCacheManager";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {TwitterRequest} from "../core/Public/TwitterRequest";
import {TwitterQuery} from "../core/Public/TwitterQuery";
import {TwitterCredentials} from "../core/Public/Models/Authentication/TwitterCredentials";

export class TwitterClientParameters {
  constructor() {
    this.Settings = new TweetinviSettings();
  }

  public RateLimitCache: IRateLimitCache;
  public Container: ITweetinviContainer;
  public Settings: ITweetinviSettings;

  // public event BeforeRegistrationCompletes: EventHandler<TweetinviContainerEventArgs>;

  public RaiseBeforeRegistrationCompletes(args: TweetinviContainerEventArg): void {
    args.TweetinviContainer.Raise(BeforeRegistrationCompletes, args);
  }
}

    export class TwitterClient implements ITwitterClient
    {
        private _credentials: IReadOnlyTwitterCredentials;
        private readonly _tweetinviContainer: ITweetinviContainer;
        private readonly _twitterClientEvents: ITwitterClientEvents;

        // IMPORTANT NOTE: The setter is for convenience. It is strongly recommended to create a new TwitterClient instead.
        // As using this setter could result in unexpected concurrency between the time of set and the execution of previous
        // non awaited async operations.
        get Credentials(): IReadOnlyTwitterCredentials {
          return this._credentials;
        }

        set Credentials(value: IReadOnlyTwitterCredentials) {
          this._credentials = new ReadOnlyTwitterCredentials(value);
        }


        constructor (parameters?: TwitterClientParameters) {
          this.Credentials = credentials;
          this.Config = parameters?.Settings ?? new TweetinviSettings();

          if (parameters?.Container == null) {
            if (!TweetinviContainer.Container.IsInitialized) {
              TweetinviContainer.Container.Initialize();
            }
          } else {
            if (!parameters.Container.IsInitialized) {
              throw new InvalidOperationException("Cannot create a client with a non initialized container!");
            }
          }

          this._tweetinviContainer = new TweetinviContainer(parameters?.Container ?? TweetinviContainer.Container);
          this._tweetinviContainer.RegisterInstance(typeof(ITweetinviContainer), this._tweetinviContainer);

          if (parameters?.RateLimitCache != null) {
            this._tweetinviContainer.RegisterInstance(typeof(IRateLimitCache), parameters.RateLimitCache);
          }

          this._tweetinviContainer.RegisterInstance(typeof(TwitterClient), this);
          this._tweetinviContainer.RegisterInstance(typeof(ITwitterClient), this);

          void BeforeRegistrationDelegate(sender: object, args: TweetinviContainerEventArgs)
          {
            parameters?.RaiseBeforeRegistrationCompletes(args);
          }

          this._tweetinviContainer.BeforeRegistrationCompletes += BeforeRegistrationDelegate;
          this._tweetinviContainer.Initialize();
          this._tweetinviContainer.BeforeRegistrationCompletes -= BeforeRegistrationDelegate;

          let requestExecutor = this._tweetinviContainer.Resolve<IRawExecutors>();
          this.Raw = requestExecutor;

          let parametersValidator = this._tweetinviContainer.Resolve<IParametersValidator>();
          this.ParametersValidator = parametersValidator;

          this.Auth = this._tweetinviContainer.Resolve<IAuthClient>();
          this.AccountSettings = this._tweetinviContainer.Resolve<IAccountSettingsClient>();
          this.Execute = this._tweetinviContainer.Resolve<IExecuteClient>();
          this.Help = this._tweetinviContainer.Resolve<IHelpClient>();
          this.Lists = this._tweetinviContainer.Resolve<IListsClient>();
          this.Messages = this._tweetinviContainer.Resolve<IMessagesClient>();
          this.RateLimits = this._tweetinviContainer.Resolve<IRateLimitsClient>();
          this.Search = this._tweetinviContainer.Resolve<ISearchClient>();
          this.Streams = this._tweetinviContainer.Resolve<IStreamsClient>();
          this.Timelines = this._tweetinviContainer.Resolve<ITimelinesClient>();
          this.Trends = this._tweetinviContainer.Resolve<ITrendsClient>();
          this.Tweets = this._tweetinviContainer.Resolve<ITweetsClient>();
          this.Upload = this._tweetinviContainer.Resolve<IUploadClient>();
          this.Users = this._tweetinviContainer.Resolve<IUsersClient>();
          this.AccountActivity = this._tweetinviContainer.Resolve<IAccountActivityClient>();

          this._tweetinviContainer.AssociatedClient = this;

          this._twitterClientEvents = this._tweetinviContainer.Resolve<ITwitterClientEvents>();
          this.Factories = this._tweetinviContainer.Resolve<ITwitterClientFactories>();
          this.Json = this._tweetinviContainer.Resolve<IJsonClient>();

          let rateLimitCacheManager = this._tweetinviContainer.Resolve<IRateLimitCacheManager>();
          rateLimitCacheManager.RateLimitsClient = this.RateLimits;
        }

      public Config: ITweetinviSettings;

      public Auth: IAuthClient;
      public AccountSettings: IAccountSettingsClient;
      public Execute: IExecuteClient;
      public Help: IHelpClient;
      public Lists: IListsClient;
      public Messages: IMessagesClient;
      public RateLimits: IRateLimitsClient;
      public Search: ISearchClient;
      public Streams: IStreamsClient;
      public Timelines: ITimelinesClient;
      public Trends: ITrendsClient;
      public Tweets: ITweetsClient;
      public Upload: IUploadClient;
      public Users: IUsersClient;
      public AccountActivity: IAccountActivityClient;

        get Events(): IExternalClientEvents {
          return this._twitterClientEvents;
        }

        public Factories: ITwitterClientFactories;
        public Json: IJsonClient;

        public ParametersValidator: IParametersValidator;
        public Raw: IRawExecutor;

      public CreateTwitterExecutionContext(): ITwitterExecutionContext {
        let result = new TwitterExecutionContext();
        result.requestFactory = this.CreateRequest;
        result.container = this._tweetinviContainer;
        result.events = this._twitterClientEvents;

        return result;
      }

      public CreateRequest(): ITwitterRequest {
        let twitterQuery = new TwitterQuery();
        // we are cloning here to ensure that the context will never be modified regardless of concurrency
        twitterQuery.twitterCredentials = new TwitterCredentials(this.Credentials);

        let request = new TwitterRequest();
        request.executionContext = this.CreateTwitterExecutionContext();
        request.query = twitterQuery;

        request.query.initialize(this.Config);
        request.executionContext.Initialize(this.Config);

        return request;
      }
    }