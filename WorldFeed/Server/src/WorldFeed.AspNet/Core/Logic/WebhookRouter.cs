namespace WorldFeed.AspNet.Core.Logic
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Webhooks;
    using WorldFeed.Common.Public.Streaming.Webhooks;

    public interface IWebhookRouter
    {
        Task<bool> IsRequestManagedByTweetinviAsync(IWebhooksRequest request);

        Task<bool> TryRouteRequestAsync(IWebhooksRequest request, IConsumerOnlyCredentials credentials);
    }

    public class WebhookRouter : IWebhookRouter
    {
        private readonly IWebhookDispatcher webhookDispatcher;
        private readonly IWebhooksRoutes webhooksRoutes;
        private readonly IWebhooksHelper webhooksHelper;

        public WebhookRouter(IWebhookDispatcher webhookDispatcher, IWebhooksRoutes webhooksWebhooksRoutes, IWebhooksHelper webhooksHelper)
        {
            this.webhookDispatcher = webhookDispatcher;
            this.webhooksRoutes = webhooksWebhooksRoutes;
            this.webhooksHelper = webhooksHelper;
        }

        public Task<bool> IsRequestManagedByTweetinviAsync(IWebhooksRequest request)
        {
            return this.webhooksHelper.IsRequestManagedByTweetinviAsync(request);
        }

        public async Task<bool> TryRouteRequestAsync(IWebhooksRequest request, IConsumerOnlyCredentials credentials)
        {
            var isCrcChallenge = this.webhooksHelper.IsCrcChallenge(request);
            if (isCrcChallenge)
            {
                return await this.webhooksRoutes.TryToReplyToCrcChallengeAsync(request, credentials).ConfigureAwait(false);
            }

            var jsonBody = await request.GetJsonFromBodyAsync().ConfigureAwait(false);

            this.webhookDispatcher.WebhookMessageReceived(new WebhookMessage(jsonBody));

            return await Task.FromResult(true).ConfigureAwait(false);
        }
    }
}
