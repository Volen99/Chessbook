namespace WorldFeed.Streams.Webhooks
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Webhooks;
    using WorldFeed.Common.Public.Streaming;
    using WorldFeed.Common.Public.Streaming.Webhooks;
    using WorldFeed.Common.Wrappers;

    public class WebhookDispatcher : IWebhookDispatcher
    {
        private readonly IJObjectStaticWrapper jObjectStaticWrapper;
        private readonly List<IAccountActivityStream> accountActivityStream;

        public WebhookDispatcher(IJObjectStaticWrapper jObjectStaticWrapper)
        {
            this.jObjectStaticWrapper = jObjectStaticWrapper;
            this.accountActivityStream = new List<IAccountActivityStream>();
        }

        public IAccountActivityStream[] SubscribedAccountActivityStreams => this.accountActivityStream.ToArray();

        public void WebhookMessageReceived(IWebhookMessage message)
        {
            var jsonObjectEvent = this.jObjectStaticWrapper.GetJobjectFromJson(message.Json);
            // Every webhook event includes a for_user_id user ID that indicates which subscription the event was delivered for
            var userId = jsonObjectEvent["for_user_id"].ToString();

            this.accountActivityStream.ForEach(activityStream =>
            {
                var isTargetingActivityStream = activityStream.AccountUserId.ToString() == userId;
                if (isTargetingActivityStream)
                {
                    activityStream.WebhookMessageReceived(message);
                }
            });
        }

        public void SubscribeAccountActivityStream(IAccountActivityStream accountActivityStream)
        {
            if (this.accountActivityStream.Contains(accountActivityStream))
            {
                return;
            }

            this.accountActivityStream.Add(accountActivityStream);
        }

        public void UnsubscribeAccountActivityStream(IAccountActivityStream accountActivityStream)
        {
            this.accountActivityStream.Remove(accountActivityStream);
        }
    }
}
