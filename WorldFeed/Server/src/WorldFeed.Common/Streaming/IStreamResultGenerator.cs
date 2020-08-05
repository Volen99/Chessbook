namespace WorldFeed.Common.Streaming
{
    using System;
    using System.Threading.Tasks;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Streaming.Enums;
    using WorldFeed.Common.Public.Streaming.Events;

    /// <summary>
    /// Set of methods to extract objects from any kind of stream
    /// </summary>
    public interface IStreamResultGenerator
    {
        /// <summary>
        /// The stream has started.
        /// </summary>
        event EventHandler StreamStarted;

        /// <summary>
        /// The stream has resumed after being paused.
        /// </summary>
        event EventHandler StreamResumed;

        /// <summary>
        /// The stream has paused.
        /// </summary>
        event EventHandler StreamPaused;

        /// <summary>
        /// The stream has stopped. This can be due by an exception.
        /// If it is the case the event args will contain the exception details.
        /// </summary>
        event EventHandler<StreamStoppedEventArgs> StreamStopped;

        /// <summary>
        /// A keep-alive message has been received.
        /// Twitter sends these every 30s so we know the stream's still working.
        /// </summary>
        event EventHandler KeepAliveReceived;

        /// <summary>
        /// Get the current state of the stream analysis
        /// </summary>
        StreamState StreamState { get; }

        /// <summary>
        /// Start extracting objects from the stream
        /// </summary>
        Task StartAsync(Action<string> onJsonReceivedCallback, Func<ITwitterRequest> createTwitterRequest);

        /// <summary>
        /// Start extracting objects from the stream
        /// </summary>
        /// <param name="onJsonReceivedCallback">Method to call foreach object</param>
        /// <param name="createTwitterRequest">Func to generate a request</param>
        Task StartAsync(Func<string, bool> onJsonReceivedCallback, Func<ITwitterRequest> createTwitterRequest);

        /// <summary>
        /// Run the stream
        /// </summary>
        void ResumeStream();

        /// <summary>
        /// Pause the stream
        /// </summary>
        void PauseStream();

        /// <summary>
        /// Stop the stream
        /// </summary>
        void StopStream();

        /// <summary>
        /// Stop a stream an define which exception made it fail
        /// </summary>
        void StopStream(Exception exception, IDisconnectMessage disconnectMessage);
    }
}
