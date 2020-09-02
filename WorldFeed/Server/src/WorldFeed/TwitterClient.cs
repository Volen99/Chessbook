// ReSharper disable once CheckNamespace
namespace WorldFeed
{
    using System;

    using WorldFeed.Common.Client;
    using WorldFeed.Common.Client.Interfaces;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Models.Authentication;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Client.Tools;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.RateLimit;
    using WorldFeed.Common.Settings;

    public class TwitterClientParameters
    {
        public TwitterClientParameters()
        {
            Settings = new TweetinviSettings();
        }

        public IRateLimitCache RateLimitCache { get; set; }

        public ITweetinviContainer Container { get; set; }

        public ITweetinviSettings Settings { get; set; }

        public event EventHandler<TweetinviContainerEventArgs> BeforeRegistrationCompletes;

        public void RaiseBeforeRegistrationCompletes(TweetinviContainerEventArgs args)
        {
            args.TweetinviContainer.Raise(BeforeRegistrationCompletes, args);
        }
    }

    public class TwitterClient : ITwitterClient
    {
        private IReadOnlyTwitterCredentials credentials;
        private readonly ITweetinviContainer tweetinviContainer;
        private readonly ITwitterClientEvents twitterClientEvents;

        /// <summary>
        /// IMPORTANT NOTE: The setter is for convenience. It is strongly recommended to create a new TwitterClient instead.
        /// As using this setter could result in unexpected concurrency between the time of set and the execution of previous
        /// non awaited async operations.
        /// </summary>
        public IReadOnlyTwitterCredentials Credentials
        {
            get => this.credentials;
            set => this.credentials = new ReadOnlyTwitterCredentials(value);
        }

        public ITweetinviSettings Config { get; }

        public TwitterClient(IReadOnlyConsumerCredentials credentials) : this(new ReadOnlyTwitterCredentials(credentials), new TwitterClientParameters())
        {
        }

        public TwitterClient(IReadOnlyTwitterCredentials credentials) : this(credentials, new TwitterClientParameters())
        {
        }

        public TwitterClient(string consumerKey, string consumerSecret) : this(new ReadOnlyTwitterCredentials(consumerKey, consumerSecret), new TwitterClientParameters())
        {
        }

        public TwitterClient(string consumerKey, string consumerSecret, string bearerToken) : this(new ReadOnlyTwitterCredentials(consumerKey, consumerSecret, bearerToken), new TwitterClientParameters())
        {
        }

        public TwitterClient(string consumerKey, string consumerSecret, string accessToken, string accessSecret) : this(new ReadOnlyTwitterCredentials(consumerKey, consumerSecret, accessToken, accessSecret), new TwitterClientParameters())
        {
        }

        public TwitterClient(IReadOnlyTwitterCredentials credentials, TwitterClientParameters parameters)
        {
            Credentials = credentials;
            Config = parameters?.Settings ?? new TweetinviSettings();

            if (parameters?.Container == null)
            {
                if (!TweetinviContainer.Container.IsInitialized)
                {
                    TweetinviContainer.Container.Initialize();
                }
            }
            else
            {
                if (!parameters.Container.IsInitialized)
                {
                    throw new InvalidOperationException("Cannot create a client with a non initialized container!");
                }
            }

            this.tweetinviContainer = new Injectinvi.TweetinviContainer(parameters?.Container ?? TweetinviContainer.Container);
            this.tweetinviContainer.RegisterInstance(typeof(ITweetinviContainer), this.tweetinviContainer);

            if (parameters?.RateLimitCache != null)
            {
                this.tweetinviContainer.RegisterInstance(typeof(IRateLimitCache), parameters.RateLimitCache);
            }

            this.tweetinviContainer.RegisterInstance(typeof(TwitterClient), this);
            this.tweetinviContainer.RegisterInstance(typeof(ITwitterClient), this);

            void BeforeRegistrationDelegate(object sender, TweetinviContainerEventArgs args)
            {
                parameters?.RaiseBeforeRegistrationCompletes(args);
            }

            this.tweetinviContainer.BeforeRegistrationCompletes += BeforeRegistrationDelegate;
            this.tweetinviContainer.Initialize();
            this.tweetinviContainer.BeforeRegistrationCompletes -= BeforeRegistrationDelegate;

            var requestExecutor = this.tweetinviContainer.Resolve<IRawExecutors>();
            Raw = requestExecutor;

            var parametersValidator = this.tweetinviContainer.Resolve<IParametersValidator>();
            ParametersValidator = parametersValidator;

            // When it’s time to resolve services, you may find that you need to pass parameters to the resolution.
            // (If you know the values at registration time, you can provide them in the registration instead.)
            Auth = this.tweetinviContainer.Resolve<IAuthClient>();
            AccountSettings = this.tweetinviContainer.Resolve<IAccountSettingsClient>();
            Execute = this.tweetinviContainer.Resolve<IExecuteClient>();
            Help = this.tweetinviContainer.Resolve<IHelpClient>();
            Lists = this.tweetinviContainer.Resolve<IListsClient>();
            Messages = this.tweetinviContainer.Resolve<IMessagesClient>();
            RateLimits = this.tweetinviContainer.Resolve<IRateLimitsClient>();
            Search = this.tweetinviContainer.Resolve<ISearchClient>();
            Streams = this.tweetinviContainer.Resolve<IStreamsClient>();
            Timelines = this.tweetinviContainer.Resolve<ITimelinesClient>();
            Trends = this.tweetinviContainer.Resolve<ITrendsClient>();
            Tweets = this.tweetinviContainer.Resolve<ITweetsClient>();
            Upload = this.tweetinviContainer.Resolve<IUploadClient>();
            Users = this.tweetinviContainer.Resolve<IUsersClient>();
            AccountActivity = this.tweetinviContainer.Resolve<IAccountActivityClient>();

            this.tweetinviContainer.AssociatedClient = this;

            this.twitterClientEvents = this.tweetinviContainer.Resolve<ITwitterClientEvents>();
            this.Factories = this.tweetinviContainer.Resolve<ITwitterClientFactories>();
            this.Json = this.tweetinviContainer.Resolve<IJsonClient>();

            var rateLimitCacheManager = this.tweetinviContainer.Resolve<IRateLimitCacheManager>();
            rateLimitCacheManager.RateLimitsClient = RateLimits;
        }

        /// <inheritdoc/>
        public IAuthClient Auth { get; }

        /// <inheritdoc/>
        public IAccountSettingsClient AccountSettings { get; }

        /// <inheritdoc/>
        public IExecuteClient Execute { get; }

        /// <inheritdoc/>
        public IHelpClient Help { get; }

        /// <inheritdoc/>
        public IListsClient Lists { get; }

        /// <inheritdoc/>
        public IMessagesClient Messages { get; }

        /// <inheritdoc/>
        public IRateLimitsClient RateLimits { get; }

        /// <inheritdoc/>
        public ISearchClient Search { get; }

        /// <inheritdoc/>
        public IStreamsClient Streams { get; }

        /// <inheritdoc/>
        public ITimelinesClient Timelines { get; }

        /// <inheritdoc/>
        public ITrendsClient Trends { get; }

        /// <inheritdoc/>
        public ITweetsClient Tweets { get; }

        /// <inheritdoc/>
        public IUploadClient Upload { get; }

        /// <inheritdoc/>
        public IUsersClient Users { get; }

        /// <inheritdoc/>
        public IAccountActivityClient AccountActivity { get; }

        /// <inheritdoc/>
        public IExternalClientEvents Events => this.twitterClientEvents;

        /// <inheritdoc/>
        public ITwitterClientFactories Factories { get; }

        /// <inheritdoc/>
        public IJsonClient Json { get; }

        /// <inheritdoc/>
        public IParametersValidator ParametersValidator { get; }

        /// <inheritdoc/>
        public IRawExecutors Raw { get; }

        public ITwitterExecutionContext CreateTwitterExecutionContext()
        {
            return new TwitterExecutionContext
            {
                RequestFactory = CreateRequest,
                Container = this.tweetinviContainer,
                Events = this.twitterClientEvents
            };
        }

        public ITwitterRequest CreateRequest()
        {
            var request = new TwitterRequest
            {
                ExecutionContext = CreateTwitterExecutionContext(),
                Query =
                {
                    // we are cloning here to ensure that the context will never be modified regardless of concurrency
                    TwitterCredentials = new TwitterCredentials(Credentials),
                }
            };

            request.Query.Initialize(Config);
            request.ExecutionContext.Initialize(Config);

            return request;
        }
    }
}
