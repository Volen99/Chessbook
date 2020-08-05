﻿namespace WorldFeed.Common.Streaming
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.Interfaces;

    public interface ITrackedStream : ITwitterStream, ITrackableStream<ITweet>
    {
        /// <summary>
        /// A tweet matching the specified filters has been received.
        /// </summary>
        event EventHandler<MatchedTweetReceivedEventArgs> MatchingTweetReceived;

        /// <summary>
        /// A tweet has been received, regardless of the fact that is matching the specified criteria.
        /// </summary>
        event EventHandler<MatchedTweetReceivedEventArgs> TweetReceived;

        /// <summary>
        /// A tweet has been received but it does not match all of the specified filters.
        /// </summary>
        event EventHandler<TweetEventArgs> NonMatchingTweetReceived;

        /// <summary>
        /// Start a stream ASYNCHRONOUSLY. The task will complete when the stream stops.
        /// </summary>
        Task StartAsync(string url);
    }
}
