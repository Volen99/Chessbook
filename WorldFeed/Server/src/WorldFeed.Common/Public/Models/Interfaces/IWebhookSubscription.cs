namespace WorldFeed.Common.Public.Models.Interfaces
{
    public interface IWebhookSubscription
    {
        /// <summary>
        /// User identifier of the subscription
        /// </summary>
        string UserId { get; }
    }
}
