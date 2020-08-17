namespace WorldFeed.Common.Models
{
    using System.Linq;

    using global::WorldFeed.Common.Public;
    using global::WorldFeed.Common.Public.Models.Interfaces;
    using global::WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

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
