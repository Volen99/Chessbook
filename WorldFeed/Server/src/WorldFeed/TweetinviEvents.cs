namespace WorldFeed
{
    using System;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Events;

    /// <summary>
    /// Take power and control the execution of requests based on the state of your environment!
    /// </summary>
    public static class TweetinviEvents
    {
        private static readonly ITweetinviEvents tweetinviEvents;

        static TweetinviEvents()
        {
            tweetinviEvents = TweetinviContainer.Resolve<ITweetinviEvents>();
        }

        public static void SubscribeToClientEvents(ITwitterClient client)
        {
            tweetinviEvents.SubscribeToClientEvents(client);
        }

        public static void UnsubscribeFromClientEvents(ITwitterClient client)
        {
            tweetinviEvents.UnsubscribeFromClientEvents(client);
        }

        /// <inheritdoc cref="IExternalClientEvents.BeforeWaitingForRequestRateLimits" />
        public static event EventHandler<BeforeExecutingRequestEventArgs> BeforeWaitingForRequestRateLimits
        {
            add => tweetinviEvents.BeforeWaitingForRequestRateLimits += value;
            remove => tweetinviEvents.BeforeWaitingForRequestRateLimits -= value;
        }


        /// <inheritdoc cref="IExternalClientEvents.BeforeExecutingRequest" />
        public static event EventHandler<BeforeExecutingRequestEventArgs> BeforeExecutingRequest
        {
            add => tweetinviEvents.BeforeExecutingRequest += value;
            remove => tweetinviEvents.BeforeExecutingRequest -= value;
        }

        /// <inheritdoc cref="IExternalClientEvents.AfterExecutingRequest" />
        public static event EventHandler<AfterExecutingQueryEventArgs> AfterExecutingRequest
        {
            add => tweetinviEvents.AfterExecutingRequest += value;
            remove => tweetinviEvents.AfterExecutingRequest -= value;
        }

        /// <inheritdoc cref="IExternalClientEvents.OnTwitterException" />
        public static event EventHandler<ITwitterException> OnTwitterException
        {
            add => tweetinviEvents.OnTwitterException += value;
            remove => tweetinviEvents.OnTwitterException -= value;
        }
    }
}
