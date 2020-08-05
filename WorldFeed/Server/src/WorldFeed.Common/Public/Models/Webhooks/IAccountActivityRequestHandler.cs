namespace WorldFeed.Common.Public.Models.Webhooks
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Streaming;

    public interface IAccountActivityRequestHandler
    {
        Task<bool> IsRequestManagedByTweetinviAsync(IWebhooksRequest request);

        Task<bool> TryRouteRequestAsync(IWebhooksRequest request);

        IAccountActivityStream GetAccountActivityStream(long userId, string environment);
    }
}
