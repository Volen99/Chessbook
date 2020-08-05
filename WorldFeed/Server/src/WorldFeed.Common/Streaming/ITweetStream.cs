namespace WorldFeed.Common.Streaming
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Events;

    public interface ITweetStream : ITwitterStream
    {
        /// <summary>
        /// Event informing that a tweet has been received.
        /// </summary>
        event EventHandler<TweetReceivedEventArgs> TweetReceived;

        /// <summary>
        /// Start a stream SYNCHRONOUSLY. The thread will continue after the stream has stopped.
        /// </summary>
        Task StartAsync(string url);
    }
}
