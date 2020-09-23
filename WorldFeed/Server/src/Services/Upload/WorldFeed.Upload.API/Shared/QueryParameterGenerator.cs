namespace WorldFeed.Upload.API.Shared
{
    using System.Text;

    using WorldFeed.Common.Settings;
    using WorldFeed.Common.Extensions;

    public interface IQueryParameterGenerator
    {
        void AppendTweetModeParameter(StringBuilder query, TweetMode? tweetMode);
    }

    public class QueryParameterGenerator : IQueryParameterGenerator
    {
        public void AppendTweetModeParameter(StringBuilder query, TweetMode? tweetMode)
        {
            if (tweetMode == TweetMode.None)
            {
                return;
            }

            query.AddParameterToQuery("tweet_mode", tweetMode?.ToString().ToLowerInvariant());
        }
    }
}
