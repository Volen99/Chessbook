namespace WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks
{
    public interface IWebhookSubscriptionDTO
    {
        string UserId { get; set; }
    }


    public interface IWebhookEnvironmentSubscriptionsDTO
    {
        string Environment { get; set; }
        string ApplicationId { get; set; }
        IWebhookSubscriptionDTO[] Subscriptions { get; set; }
    }

}
