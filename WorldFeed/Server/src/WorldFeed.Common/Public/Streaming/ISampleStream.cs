namespace WorldFeed.Common.Public.Streaming
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Streaming;
    public interface ISampleStream : ITwitterStream
    {
        /// <summary>
        /// A tweet has been received.
        /// </summary>
        event EventHandler<TweetReceivedEventArgs> TweetReceived;

        /// <summary>
        /// Start a stream ASYNCHRONOUSLY. The task will complete when the stream stops.
        /// </summary>
        Task StartAsync();
    }
}
