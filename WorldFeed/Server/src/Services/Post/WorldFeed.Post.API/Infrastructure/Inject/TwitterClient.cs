// ReSharper disable once CheckNamespace
namespace WorldFeed.Post.API.Infrastructure.Inject
{
    using System;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Settings;
    using WorldFeed.Post.API.Application.Validations;
    using WorldFeed.Post.API.Client;
    using WorldFeed.Post.API.Events;
    using WorldFeed.Post.API.Infrastructure.Inject.Contracts;
    using WorldFeed.Post.Application.Requesters;
    using WorldFeed.Post.Client.Clients;
    using WorldFeed.Post.Client.Tools;

    public class TwitterClientParameters
    {
        public TwitterClientParameters()
        {
            this.Settings = new TweetinviSettings();
        }

        public IPostContainer Container { get; set; }

        public ITweetinviSettings Settings { get; set; }

        public event EventHandler<PostContainerEventArgs> BeforeRegistrationCompletes;

        public void RaiseBeforeRegistrationCompletes(PostContainerEventArgs args)
        {
            args.PostContainer.Raise(BeforeRegistrationCompletes, args);
        }
    }

    public class TwitterClient : ITwitterClient
    {
        private readonly IPostContainer postContainer;
        private readonly ITwitterClientEvents twitterClientEvents;

        public TwitterClient(TwitterClientParameters parameters)
        {
            this.Config = parameters?.Settings ?? new TweetinviSettings();

            if (parameters?.Container == null)
            {
                if (!Infrastructure.PostContainer.Container.IsInitialized)
                {
                    Infrastructure.PostContainer.Container.Initialize();
                }
            }
            else
            {
                if (!parameters.Container.IsInitialized)
                {
                    throw new InvalidOperationException("Cannot create a client with a non initialized container!");
                }
            }

            this.postContainer = new PostContainer(parameters?.Container ?? Infrastructure.PostContainer.Container);
            this.postContainer.RegisterInstance(typeof(IPostContainer), this.postContainer);

            this.postContainer.RegisterInstance(typeof(TwitterClient), this);
            this.postContainer.RegisterInstance(typeof(ITwitterClient), this);

            void BeforeRegistrationDelegate(object sender, PostContainerEventArgs args)
            {
                parameters?.RaiseBeforeRegistrationCompletes(args);
            }

            this.postContainer.BeforeRegistrationCompletes += BeforeRegistrationDelegate;
            this.postContainer.Initialize();
            this.postContainer.BeforeRegistrationCompletes -= BeforeRegistrationDelegate;

            var requestExecutor = this.postContainer.Resolve<IRawExecutors>();
            this.Raw = requestExecutor;

            var parametersValidator = this.postContainer.Resolve<IParametersValidator>();
            this.ParametersValidator = parametersValidator;


            this.Timelines = this.postContainer.Resolve<ITimelinesClient>();
            this.Tweets = this.postContainer.Resolve<ITweetsClient>();

            this.postContainer.AssociatedClient = this;

            this.twitterClientEvents = this.postContainer.Resolve<ITwitterClientEvents>();
            this.Factories = this.postContainer.Resolve<ITwitterClientFactories>();
            this.Json = this.postContainer.Resolve<IJsonClient>();
        }

        public ITweetinviSettings Config { get; }

        /// <inheritdoc/>
        public ITimelinesClient Timelines { get; }

        /// <inheritdoc/>
        public ITweetsClient Tweets { get; }

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
                Container = this.postContainer,
                Events = this.twitterClientEvents
            };
        }

        public ITwitterRequest CreateRequest()
        {
            var request = new TwitterRequest
            {
                ExecutionContext = CreateTwitterExecutionContext(),
                //Query =
                //{
                //    // we are cloning here to ensure that the context will never be modified regardless of concurrency
                //    TwitterCredentials = new TwitterCredentials(Credentials),
                //}
            };

            request.Query.Initialize(Config);
            request.ExecutionContext.Initialize(Config);

            return request;
        }
    }
}
