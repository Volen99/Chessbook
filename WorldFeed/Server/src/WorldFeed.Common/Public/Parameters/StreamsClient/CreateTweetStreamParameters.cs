namespace WorldFeed.Common.Public.Parameters.StreamsClient
{
    using WorldFeed.Common.Settings;

    public interface ICreateTweetStreamParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Decide whether to use Extended or Compat mode
        /// </summary>
        TweetMode? TweetMode { get; set; }
    }

    public class CreateTweetStreamParameters : CustomRequestParameters, ICreateTweetStreamParameters
    {
        public TweetMode? TweetMode { get; set; }
    }
}
