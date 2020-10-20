namespace WorldFeed.Streams
{
    using System;
    using System.Collections.Generic;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Streaming;

    public interface IFilterStreamTweetMatcherFactory
    {
        IFilterStreamTweetMatcher Create(
            IStreamTrackManager<ITweet> streamTrackManager,
            Dictionary<ILocation, Action<ITweet>> locations,
            Dictionary<long?, Action<ITweet>> followingUserIds);
    }

    public class FilterStreamTweetMatcherFactory : IFilterStreamTweetMatcherFactory
    {
        public IFilterStreamTweetMatcher Create(
            IStreamTrackManager<ITweet> streamTrackManager, 
            Dictionary<ILocation, Action<ITweet>> locations,
            Dictionary<long?, Action<ITweet>> followingUserIds)
        {
            return new FilterStreamTweetMatcher(streamTrackManager, locations, followingUserIds);
        }
    }
}
