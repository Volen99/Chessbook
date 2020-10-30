import {ITweetinviSettings, SharebookSettings} from "../core/Public/Settings/SharebookSettings";
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
import {ITwitterClientEvents} from "../core/Core/Events/TweetinviGlobalEvents";
import {Injectable} from "@angular/core";

@Injectable()
export class TwitterClientParameters {
  constructor() {
    this.settings = new SharebookSettings();
  }

  public RateLimitCache: IRateLimitCache;
  // public Container: ITweetinviContainer;
  public settings: ITweetinviSettings;

  // public event BeforeRegistrationCompletes: EventHandler<TweetinviContainerEventArgs>;

  // public RaiseBeforeRegistrationCompletes(args: TweetinviContainerEventArg): void {
  //   args.TweetinviContainer.Raise(BeforeRegistrationCompletes, args);
  // }
}

export class TwitterClient implements ITwitterClient {
  private _credentials: IReadOnlyTwitterCredentials;
  // private readonly _tweetinviContainer: ITweetinviContainer;
  private readonly _twitterClientEvents: ITwitterClientEvents;

  // IMPORTANT NOTE: The setter is for convenience. It is strongly recommended to create a new TwitterClient instead.
  // As using this setter could result in unexpected concurrency between the time of set and the execution of previous
  // non awaited async operations.
  get credentials(): IReadOnlyTwitterCredentials {
    return this._credentials;
  }

  set credentials(value: IReadOnlyTwitterCredentials) {
    this._credentials = new ReadOnlyTwitterCredentials(value);
  }


        constructor (parameters?: TwitterClientParameters) {
          // this.credentials = credentials;
          this.config = parameters?.settings ?? new SharebookSettings();

          // if (parameters?.Container == null) {
          //   if (!TweetinviContainer.Container.IsInitialized) {
          //     TweetinviContainer.Container.Initialize();
          //   }
          // } else {
          //   if (!parameters.Container.IsInitialized) {
          //     throw new InvalidOperationException("Cannot create a client with a non initialized container!");
          //   }
          // }

          // this._tweetinviContainer = new TweetinviContainer(parameters?.Container ?? TweetinviContainer.Container);
          // this._tweetinviContainer.RegisterInstance(typeof(ITweetinviContainer), this._tweetinviContainer);
          //
          // if (parameters?.RateLimitCache != null) {
          //   this._tweetinviContainer.RegisterInstance(typeof(IRateLimitCache), parameters.RateLimitCache);
          // }

          // this._tweetinviContainer.RegisterInstance(typeof(TwitterClient), this);
          // this._tweetinviContainer.RegisterInstance(typeof(ITwitterClient), this);
          //
          // void BeforeRegistrationDelegate(sender: object, args: TweetinviContainerEventArgs)
          // {
          //   parameters?.RaiseBeforeRegistrationCompletes(args);
          // }
          //
          // this._tweetinviContainer.BeforeRegistrationCompletes += BeforeRegistrationDelegate;
          // this._tweetinviContainer.Initialize();
          // this._tweetinviContainer.BeforeRegistrationCompletes -= BeforeRegistrationDelegate;

          let requestExecutor = this._tweetinviContainer.Resolve<IRawExecutors>();
          this.raw = requestExecutor;

          let parametersValidator = this._tweetinviContainer.Resolve<IParametersValidator>();
          this.parametersValidator = parametersValidator;

          this.auth = this._tweetinviContainer.Resolve<IAuthClient>();
          this.accountSettings = this._tweetinviContainer.Resolve<IAccountSettingsClient>();
          this.execute = this._tweetinviContainer.Resolve<IExecuteClient>();
          this.help = this._tweetinviContainer.Resolve<IHelpClient>();
          this.lists = this._tweetinviContainer.Resolve<IListsClient>();
          this.messages = this._tweetinviContainer.Resolve<IMessagesClient>();
          this.rateLimits = this._tweetinviContainer.Resolve<IRateLimitsClient>();
          this.search = this._tweetinviContainer.Resolve<ISearchClient>();
          this.streams = this._tweetinviContainer.Resolve<IStreamsClient>();
          this.timelines = this._tweetinviContainer.Resolve<ITimelinesClient>();
          this.trends = this._tweetinviContainer.Resolve<ITrendsClient>();
          this.tweets = this._tweetinviContainer.Resolve<ITweetsClient>();
          this.upload = this._tweetinviContainer.Resolve<IUploadClient>();
          this.users = this._tweetinviContainer.Resolve<IUsersClient>();
          this.accountActivity = this._tweetinviContainer.Resolve<IAccountActivityClient>();

          this._tweetinviContainer.AssociatedClient = this;

          this._twitterClientEvents = this._tweetinviContainer.Resolve<ITwitterClientEvents>();
          this.factories = this._tweetinviContainer.Resolve<ITwitterClientFactories>();
          this.json = this._tweetinviContainer.Resolve<IJsonClient>();

          let rateLimitCacheManager = this._tweetinviContainer.Resolve<IRateLimitCacheManager>();
          rateLimitCacheManager.RateLimitsClient = this.rateLimits;
        }

      public config: ITweetinviSettings;

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
        public raw: IRawExecutor;

      public createTwitterExecutionContext(): ITwitterExecutionContext {
        let result = new TwitterExecutionContext();
        result.requestFactory = this.createRequest;
        result.container = this._tweetinviContainer;
        result.events = this._twitterClientEvents;

        return result;
      }

      public createRequest(): ITwitterRequest {
        let twitterQuery = new TwitterQuery();
        // we are cloning here to ensure that the context will never be modified regardless of concurrency
        twitterQuery.twitterCredentials = new TwitterCredentials(this.credentials);

        let request = new TwitterRequest();
        request.executionContext = this.createTwitterExecutionContext();
        request.query = twitterQuery;

        request.query.initialize(this.config);
        request.executionContext.initialize(this.config);

        return request;
      }
    }
