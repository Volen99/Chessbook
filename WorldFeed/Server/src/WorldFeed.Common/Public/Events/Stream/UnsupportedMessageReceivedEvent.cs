﻿namespace WorldFeed.Common.Public.Events.Stream
{
    /// <summary>
    /// Tweetinvi received a message that it did not understood
    /// </summary>
    public class UnsupportedMessageReceivedEvent
    {
        public UnsupportedMessageReceivedEvent(string message)
        {
            Message = message;
        }

        public string Message { get; }
    }
}
