namespace WorldFeed.Post.Application.Parameters.TweetsClient
{ 
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids
    /// </summary>
    public interface IGetRetweeterIdsParameters : ICursorQueryParameters
    {
        /// <summary>
        /// The identifier of the retweet
        /// </summary>
        ITweetIdentifier Tweet { get; set; }
    }

    /// <inheritdoc/>
    public class GetRetweeterIdsParameters : CursorQueryParameters, IGetRetweeterIdsParameters
    {
        public GetRetweeterIdsParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
        }

        public GetRetweeterIdsParameters(long tweetId) : this()
        {
            Tweet = new TweetIdentifier(tweetId);
        }

        public GetRetweeterIdsParameters(ITweetIdentifier tweet) : this()
        {
            Tweet = tweet;
        }

        public GetRetweeterIdsParameters(IGetRetweeterIdsParameters source) : base(source)
        {
            if (source == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
                return;
            }

            Tweet = source.Tweet;
        }

        /// <inheritdoc/>
        public ITweetIdentifier Tweet { get; set; }
    }
}
