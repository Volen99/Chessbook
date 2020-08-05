namespace WorldFeed.Common.Public.Models.Interfaces
{
    public interface IWebhookSubscriptionsCount
    {
        string AccountName { get; set; }

        string SubscriptionsCount { get; set; }

        string ProvisionedCount { get; set; }
    }
}
