namespace WorldFeed.Post.Application.Parameters.TweetsClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id
    /// </summary>
    public interface IGetRetweetsParameters : ICustomRequestParameters
    {
        /// <summary>
        /// The identifier of the tweet you want to retrieve
        /// </summary>
        ITweetIdentifier Tweet { get; set; }

        /// <summary>
        /// Tweets author object will not be populated when set to true
        /// </summary>
        bool? TrimUser { get; set; }

        /// <summary>
        /// Specifies the number of records to retrieve.
        /// </summary>
        int PageSize { get; set; }

        /// <summary>
        /// Decide whether to use Extended or Compat mode
        /// </summary>
        TweetMode? TweetMode { get; set; }
    }

    /// <inheritdoc/>
    public class GetRetweetsParameters : CustomRequestParameters, IGetRetweetsParameters
    {
        public GetRetweetsParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.TWEETS_GET_RETWEETS_MAX_SIZE;
        }

        public GetRetweetsParameters(long tweetId) : this()
        {
            Tweet = new TweetIdentifier(tweetId);
        }

        public GetRetweetsParameters(ITweetIdentifier tweet) : this()
        {
            Tweet = tweet;
        }

        /// <inheritdoc/>
        public ITweetIdentifier Tweet { get; set; }
        /// <inheritdoc/>
        public bool? TrimUser { get; set; }
        /// <inheritdoc/>
        public int PageSize { get; set; }
        /// <inheritdoc/>
        public TweetMode? TweetMode { get; set; }
    }
}