namespace WorldFeed.Common.Public.Models.Interfaces
{
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;

    public interface IWebhookEnvironmentSubscriptions
    {
        ITwitterClient Client { get; set; }
        IWebhookEnvironmentSubscriptionsDTO WebhookEnvironmentSubscriptionsDTO { get; }

        /// <summary>
        /// Name of the webhook environment
        /// </summary>
        string EnvironmentName { get; }

        /// <summary>
        /// Application id associated with the environment
        /// </summary>
        string ApplicationId { get; }

        /// <summary>
        /// List of users who subscribed to that environment
        /// </summary>
        IWebhookSubscription[] Subscriptions { get; }
    }
}
