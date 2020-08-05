namespace WorldFeed.Common.Public.Events
{
    using System;

    using WorldFeed.Common.Public.Streaming.Events;

    /// <summary>
    /// Event to inform that a stream has stopped.
    /// </summary>
    public class StreamStoppedEventArgs : EventArgs
    {
        public StreamStoppedEventArgs()
        {
        }

        public StreamStoppedEventArgs(Exception ex, IDisconnectMessage disconnectMessage = null)
        {
            Exception = ex;
            DisconnectMessage = disconnectMessage;
        }

        public Exception Exception { get; }

        public IDisconnectMessage DisconnectMessage { get; }
    }
}
