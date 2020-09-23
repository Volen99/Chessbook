// ReSharper disable once CheckNamespace
namespace WorldFeed.Identity.API.Infrastructure.Inject
{
    using System;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Models.Authentication;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Settings;
    using WorldFeed.Identity.API.Application.IntegrationEvents.Events;
    using WorldFeed.Identity.API.Application.Requesters;
    using WorldFeed.Identity.API.Client;
    using WorldFeed.Identity.API.Client.Tools;

    public class TwitterClientParameters
    {
        public TwitterClientParameters()
        {
            Settings = new TweetinviSettings();
        }

        public IRateLimitCache RateLimitCache { get; set; }
        public IIdentityContainer Container { get; set; }
        public ITweetinviSettings Settings { get; set; }
        public event EventHandler<IdentityContainerEventArgs> BeforeRegistrationCompletes;

        public void RaiseBeforeRegistrationCompletes(IdentityContainerEventArgs args)
        {
            args.IdentityContainer.Raise(BeforeRegistrationCompletes, args);
        }
    }

    public class TwitterClient : ITwitterClient
    {
        private IReadOnlyTwitterCredentials _credentials;
        private readonly IIdentityContainer _tweetinviContainer;
        private readonly ITwitterClientEvents _twitterClientEvents;

        /// <summary>
        /// IMPORTANT NOTE: The setter is for convenience. It is strongly recommended to create a new TwitterClient instead.
        /// As using this setter could result in unexpected concurrency between the time of set and the execution of previous
        /// non awaited async operations.
        /// </summary>
        public IReadOnlyTwitterCredentials Credentials
        {
            get => _credentials;
            set => _credentials = new ReadOnlyTwitterCredentials(value);
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
                if (!Infrastructure.IdentityContainer.Container.IsInitialized)
                {
                    Infrastructure.IdentityContainer.Container.Initialize();
                }
            }
            else
            {
                if (!parameters.Container.IsInitialized)
                {
                    throw new InvalidOperationException("Cannot create a client with a non initialized container!");
                }
            }

            _tweetinviContainer = new IdentityContainer(parameters?.Container ?? Infrastructure.IdentityContainer.Container);
            _tweetinviContainer.RegisterInstance(typeof(ITweetinviContainer), _tweetinviContainer);

            if (parameters?.RateLimitCache != null)
            {
                _tweetinviContainer.RegisterInstance(typeof(IRateLimitCache), parameters.RateLimitCache);
            }

            _tweetinviContainer.RegisterInstance(typeof(TwitterClient), this);
            _tweetinviContainer.RegisterInstance(typeof(ITwitterClient), this);

            void BeforeRegistrationDelegate(object sender, IdentityContainerEventArgs args)
            {
                parameters?.RaiseBeforeRegistrationCompletes(args);
            }

            _tweetinviContainer.BeforeRegistrationCompletes += BeforeRegistrationDelegate;
            _tweetinviContainer.Initialize();
            _tweetinviContainer.BeforeRegistrationCompletes -= BeforeRegistrationDelegate;

            var requestExecutor = _tweetinviContainer.Resolve<IRawExecutors>();
            Raw = requestExecutor;

            var parametersValidator = _tweetinviContainer.Resolve<IParametersValidator>();
            ParametersValidator = parametersValidator;

            AccountSettings = _tweetinviContainer.Resolve<IAccountSettingsClient>();
            RateLimits = _tweetinviContainer.Resolve<IRateLimitsClient>();
            Users = _tweetinviContainer.Resolve<IUsersClient>();
            AccountActivity = _tweetinviContainer.Resolve<IAccountActivityClient>();

            _tweetinviContainer.AssociatedClient = this;

            _twitterClientEvents = _tweetinviContainer.Resolve<ITwitterClientEvents>();
            Factories = _tweetinviContainer.Resolve<ITwitterClientFactories>();
            Json = _tweetinviContainer.Resolve<IJsonClient>();

            var rateLimitCacheManager = _tweetinviContainer.Resolve<IRateLimitCacheManager>();
            rateLimitCacheManager.RateLimitsClient = RateLimits;
        }

        /// <inheritdoc/>
        public IAuthClient Auth { get; }
        /// <inheritdoc/>
        public IAccountSettingsClient AccountSettings { get; }
        /// <inheritdoc/>
        public IExecuteClient Execute { get; }
        /// <inheritdoc/>
        public IRateLimitsClient RateLimits { get; }
        /// <inheritdoc/>
        public IUsersClient Users { get; }
        /// <inheritdoc/>
        public IAccountActivityClient AccountActivity { get; }

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
                Container = _tweetinviContainer,
                Events = _twitterClientEvents
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
