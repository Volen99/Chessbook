namespace WorldFeed.Common.Public.Events
{
    using System;

    using WorldFeed.Common.InjectWorldFeed;

    /// <summary>
    /// Event informing of operations being performed on a container lifecycle.
    /// <para>This is for advance use cases and debugging of the library</para>
    /// </summary>
    public class TweetinviContainerEventArgs : EventArgs
    {
        public TweetinviContainerEventArgs(ITweetinviContainer tweetinviContainer)
        {
            TweetinviContainer = tweetinviContainer;
        }

        public ITweetinviContainer TweetinviContainer { get; }
    }
}
