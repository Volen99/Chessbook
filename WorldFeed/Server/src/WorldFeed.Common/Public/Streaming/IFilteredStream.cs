﻿namespace WorldFeed.Common.Public.Streaming
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Streaming.Enums;
    using WorldFeed.Common.Streaming;

    public interface IFilteredStream : ITwitterStream, ITrackableStream<ITweet>
    {
        /// <summary>
        /// Tweet matching the specified filter criteria has been received.
        /// </summary>
        event EventHandler<MatchedTweetReceivedEventArgs> MatchingTweetReceived;

        /// <summary>
        /// Tweet not matching the specified filters has been received.
        /// </summary>
        event EventHandler<TweetEventArgs> NonMatchingTweetReceived;

        /// <summary>
        /// Specify the fields that need to be used to filter the stream.
        /// </summary>
        MatchOn MatchOn { get; set; }

        /// <summary>
        /// A tweet will match if ANY of the global parameters are successfully been matched.
        /// { 'Track' OR 'Location' OR 'Follower' }.
        /// </summary>
        Task StartMatchingAnyConditionAsync();

        /// <summary>
        /// A tweet will match if ALL of the global parameters are successfully been matched.
        /// { 'Track' AND 'Location' AND 'Follower' }.
        /// </summary>
        Task StartMatchingAllConditionsAsync();

        #region Follow
        /// <summary>
        /// List of UserId followed by the stream
        /// </summary>
        Dictionary<long?, Action<ITweet>> FollowingUserIds { get; }

        /// <summary>
        /// Follow a specific userId
        /// </summary>
        void AddFollow(long userId, Action<ITweet> userPublishedTweet = null);

        /// <summary>
        /// Follow a specific user
        /// </summary>
        void AddFollow(IUserIdentifier user, Action<ITweet> userPublishedTweet = null);

        /// <summary>
        /// Unfollow a specific userId
        /// </summary>
        void RemoveFollow(long userId);

        /// <summary>
        /// Unfollow a specific user
        /// </summary>
        void RemoveFollow(IUserIdentifier user);

        /// <summary>
        /// Tells you whether you are following a userId
        /// </summary>
        bool ContainsFollow(long userId);

        /// <summary>
        /// Tells you whether you are following a user
        /// </summary>
        bool ContainsFollow(IUserIdentifier user);

        /// <summary>
        /// Unfollow all the currently followed users
        /// </summary>
        void ClearFollows();
        #endregion

        #region Location

        /// <summary>
        /// List of locations analyzed by the stream
        /// </summary>
        Dictionary<ILocation, Action<ITweet>> Locations { get; }

        /// <summary>
        /// Add a location for the stream to analyze
        /// </summary>
        void AddLocation(ILocation location, Action<ITweet> locationDetected = null);

        /// <summary>
        /// Add a location for the stream to analyze
        /// </summary>
        ILocation AddLocation(ICoordinates coordinate1, ICoordinates coordinate2, Action<ITweet> locationDetected = null);

        /// <summary>
        /// Remove a location for the stream to analyze
        /// </summary>
        void RemoveLocation(ILocation location);

        /// <summary>
        /// Remove a location for the stream to analyze
        /// </summary>
        void RemoveLocation(ICoordinates coordinate1, ICoordinates coordinate2);

        /// <summary>
        /// Tells you whether you are analyzing a specific location
        /// </summary>
        bool ContainsLocation(ILocation location);

        /// <summary>
        /// Tells you whether you are analyzing a specific location
        /// </summary>
        bool ContainsLocation(ICoordinates coordinate1, ICoordinates coordinate2);

        /// <summary>
        /// Remove all the currently analyzed locations
        /// </summary>
        void ClearLocations();

        #endregion

        /// <summary>
        /// For any tweet you have this method allow you to know if it would be matched by the Strem
        /// </summary>
        MatchOn CheckIfTweetMatchesStreamFilters(ITweet tweet);
    }
}
