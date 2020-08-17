namespace WorldFeed.Common.Models
{
    using global::WorldFeed.Common.Public.Models.Interfaces;
    using global::WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;
    
    public class WebhookSubscription : IWebhookSubscription
    {
        private readonly IWebhookSubscriptionDTO subscriptionDTO;

        public WebhookSubscription(IWebhookSubscriptionDTO subscriptionDTO)
        {
            this.subscriptionDTO = subscriptionDTO;
        }

        public string UserId => this.subscriptionDTO.UserId;
    }
}
