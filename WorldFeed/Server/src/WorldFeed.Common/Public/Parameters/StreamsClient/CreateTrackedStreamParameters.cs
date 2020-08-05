namespace WorldFeed.Common.Public.Parameters.StreamsClient
{
    using WorldFeed.Common.Settings;

    public interface ICreateTrackedTweetStreamParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Decide whether to use Extended or Compat mode
        /// </summary>
        TweetMode? TweetMode { get; set; }
    }

    public class CreateTrackedTweetStreamParameters : CustomRequestParameters, ICreateTrackedTweetStreamParameters
    {
        public TweetMode? TweetMode { get; set; }
    }
}
