namespace Sharebook.Upload.API.Shared
{
    using System.Text;

    using Sharebook.Common.Settings;
    using Sharebook.Common.Extensions;

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
