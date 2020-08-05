namespace WorldFeed.Common.Models
{
    using System.Linq;

    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public class WebhookEnvironmentSubscriptions : IWebhookEnvironmentSubscriptions
    {
        public WebhookEnvironmentSubscriptions(IWebhookEnvironmentSubscriptionsDTO webhookEnvironmentSubscriptionsDTO, ITwitterClient client)
        {
            WebhookEnvironmentSubscriptionsDTO = webhookEnvironmentSubscriptionsDTO;
            Client = client;
        }

        public ITwitterClient Client { get; set; }

        public IWebhookEnvironmentSubscriptionsDTO WebhookEnvironmentSubscriptionsDTO { get; }

        public string EnvironmentName => WebhookEnvironmentSubscriptionsDTO.Environment;
        public string ApplicationId => WebhookEnvironmentSubscriptionsDTO.ApplicationId;
        public IWebhookSubscription[] Subscriptions => WebhookEnvironmentSubscriptionsDTO.Subscriptions.Select(x => new WebhookSubscription(x) as IWebhookSubscription).ToArray();
    }
}
