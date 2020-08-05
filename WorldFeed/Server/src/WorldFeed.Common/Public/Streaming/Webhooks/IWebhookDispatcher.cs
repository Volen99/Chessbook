namespace WorldFeed.Common.Public.Streaming.Webhooks
{
    using WorldFeed.Common.Public.Models.Webhooks;

    public interface IWebhookDispatcher
    {
        IAccountActivityStream[] SubscribedAccountActivityStreams { get; }

        void WebhookMessageReceived(IWebhookMessage message);
        void SubscribeAccountActivityStream(IAccountActivityStream accountActivityStream);
        void UnsubscribeAccountActivityStream(IAccountActivityStream accountActivityStream);
    }
}
