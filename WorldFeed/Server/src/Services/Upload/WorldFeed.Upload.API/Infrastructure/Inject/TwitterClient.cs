// ReSharper disable once CheckNamespace
namespace WorldFeed.Upload.Infrastructure.Inject
{
    using System;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.API.Application.Requesters;
    using WorldFeed.Upload.API.Client.Clients;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.Application.Validations;
    using WorldFeed.Upload.Client;
    using WorldFeed.Upload.Client.Clients;
    using WorldFeed.Upload.Client.Tools;
    using WorldFeed.Upload.Events;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public class TwitterClientParameters
    {
        public TwitterClientParameters()
        {
            this.Settings = new TweetinviSettings();
        }

        public IUploadContainer Container { get; set; }

        public ITweetinviSettings Settings { get; set; }

        public event EventHandler<UploadContainerEventArgs> BeforeRegistrationCompletes;

        public void RaiseBeforeRegistrationCompletes(UploadContainerEventArgs args)
        {
            args.UploadContainer.Raise(BeforeRegistrationCompletes, args);
        }
    }

    public class TwitterClient : ITwitterClient
    {
        private readonly IUploadContainer uploadContainer;
        private readonly ITwitterClientEvents twitterClientEvents;

        public TwitterClient(TwitterClientParameters parameters)
        {
            this.Config = parameters?.Settings ?? new TweetinviSettings();

            if (parameters?.Container == null)
            {
                if (!Infrastructure.UploadContainer.Container.IsInitialized)
                {
                    Infrastructure.UploadContainer.Container.Initialize();
                }
            }
            else
            {
                if (parameters.Container.IsInitialized == false)
                {
                    throw new InvalidOperationException("Cannot create a client with a non initialized container!");
                }
            }

            this.uploadContainer = new UploadContainer(parameters?.Container ?? Infrastructure.UploadContainer.Container);
            this.uploadContainer.RegisterInstance(typeof(IUploadContainer), this.uploadContainer);

            this.uploadContainer.RegisterInstance(typeof(TwitterClient), this);
            this.uploadContainer.RegisterInstance(typeof(ITwitterClient), this);

            void BeforeRegistrationDelegate(object sender, UploadContainerEventArgs args)
            {
                parameters?.RaiseBeforeRegistrationCompletes(args);
            }

            this.uploadContainer.BeforeRegistrationCompletes += BeforeRegistrationDelegate;
            this.uploadContainer.Initialize();
            this.uploadContainer.BeforeRegistrationCompletes -= BeforeRegistrationDelegate;

            // *** RESOLVE ***
            var requestExecutor = this.uploadContainer.Resolve<IRawExecutors>();
            this.Raw = requestExecutor;

            var parametersValidator = this.uploadContainer.Resolve<IParametersValidator>();
            this.ParametersValidator = parametersValidator;  

            this.Upload = this.uploadContainer.Resolve<IUploadClient>();

            this.uploadContainer.AssociatedClient = this;

            this.twitterClientEvents = this.uploadContainer.Resolve<ITwitterClientEvents>();
            this.Factories = this.uploadContainer.Resolve<ITwitterClientFactories>();
            this.Json = this.uploadContainer.Resolve<IJsonClient>();
        }

        public ITweetinviSettings Config { get; }

        public IExecuteClient Execute { get; }

        /// <inheritdoc/>
        public IUploadClient Upload { get; }

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
                Container = this.uploadContainer,
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
