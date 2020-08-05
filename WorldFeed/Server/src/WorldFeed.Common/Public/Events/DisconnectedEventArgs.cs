namespace WorldFeed.Common.Public.Events
{
    using System;

    using WorldFeed.Common.Public.Streaming.Events;

    /// <summary>
    /// The stream was disconnected
    /// </summary>
    public class DisconnectedEventArgs : EventArgs
    {
        public DisconnectedEventArgs(IDisconnectMessage disconnectMessage)
        {
            DisconnectMessage = disconnectMessage;
        }

        public IDisconnectMessage DisconnectMessage { get; }
    }
}
