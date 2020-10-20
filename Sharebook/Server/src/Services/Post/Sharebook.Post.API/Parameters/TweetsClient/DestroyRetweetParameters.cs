namespace Sharebook.Post.Application.Parameters.TweetsClient
{
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Parameters;
    using Sharebook.Common.Settings;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-unretweet-id
    /// </summary>
    public interface IDestroyRetweetParameters : ICustomRequestParameters
    {
        /// <summary>
        /// The identifier of the retweet
        /// </summary>
        ITweetIdentifier Tweet { get; set; }

        /// <summary>
        /// Tweets author object will not be populated when set to true
        /// </summary>
        bool? TrimUser { get; set; }

        /// <summary>
        /// Decide whether to use Extended or Compat mode
        /// </summary>
        TweetMode? TweetMode { get; set; }
    }

    /// <inheritdoc/>
    public class DestroyRetweetParameters : CustomRequestParameters, IDestroyRetweetParameters
    {
        public DestroyRetweetParameters(long tweetId)
        {
            Tweet = new TweetIdentifier(tweetId);
        }

        public DestroyRetweetParameters(ITweetIdentifier tweet)
        {
            Tweet = tweet;
        }

        /// <inheritdoc/>
        public ITweetIdentifier Tweet { get; set; }
        /// <inheritdoc/>
        public bool? TrimUser { get; set; }
        /// <inheritdoc/>
        public TweetMode? TweetMode { get; set; }
    }
}
