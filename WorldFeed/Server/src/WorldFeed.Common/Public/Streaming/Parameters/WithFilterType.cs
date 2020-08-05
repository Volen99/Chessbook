﻿namespace WorldFeed.Common.Public.Streaming.Parameters
{
    /// <summary>
    /// Filter the tweets based on their creator.
    /// https://dev.twitter.com/streaming/overview/request-parameters#with
    /// </summary>
    public enum WithFilterType
    {
        /// <summary>
        /// DEFAULT : User receives messages from himself and followers.
        /// (Twitter home timeline behavior)
        /// </summary>
        Followings,

        /// <summary>
        /// User receives messages that are related to himself exclusively.
        /// </summary>
        User
    }
}
