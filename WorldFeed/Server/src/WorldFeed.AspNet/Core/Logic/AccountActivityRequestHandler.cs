namespace WorldFeed.AspNet.Core.Logic
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Webhooks;
    using WorldFeed.Common.Public.Streaming;
    using WorldFeed.Common.Public.Streaming.Webhooks;
    using WorldFeed.Streams;

    public class AccountActivityRequestHandler : IAccountActivityRequestHandler
    {
        private readonly IWebhookDispatcher dispatcher;
        private readonly IFactory<AccountActivityStream> accountActivityStreamFactory;
        private readonly IWebhookRouter router;
        private readonly IConsumerOnlyCredentials consumerOnlyCredentials;

        public AccountActivityRequestHandler(
            IWebhookDispatcher dispatcher,
            IWebhooksRoutes routes,
            IWebhooksHelper webhooksHelper,
            IFactory<AccountActivityStream> accountActivityStreamFactory,
            ITwitterClient client)
        {
            this.dispatcher = dispatcher;
            this.accountActivityStreamFactory = accountActivityStreamFactory;
            this.router = new WebhookRouter(dispatcher, routes, webhooksHelper);

            this.consumerOnlyCredentials = new ConsumerOnlyCredentials(client.Credentials);
        }

        public Task<bool> IsRequestManagedByTweetinviAsync(IWebhooksRequest request)
        {
            return this.router.IsRequestManagedByTweetinviAsync(request);
        }

        public async Task<bool> TryRouteRequestAsync(IWebhooksRequest request)
        {
            return await this.router.TryRouteRequestAsync(request, this.consumerOnlyCredentials).ConfigureAwait(false);
        }

        private readonly Dictionary<long, IAccountActivityStream> _accountActivityStreams = new Dictionary<long, IAccountActivityStream>();
        public IAccountActivityStream GetAccountActivityStream(long userId, string environment)
        {
            if (_accountActivityStreams.ContainsKey(userId))
            {
                return _accountActivityStreams[userId];
            }

            var stream = this.accountActivityStreamFactory.Create();
            stream.AccountUserId = userId;

            _accountActivityStreams.Add(userId, stream);
            this.dispatcher.SubscribeAccountActivityStream(stream);

            return stream;
        }
    }
}
