namespace WorldFeed.Upload.API.Controllers.Tweet
{
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public;
    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.DTO;

    public class TweetController : ITweetController
    {
        private readonly ITweetQueryExecutor tweetQueryExecutor;
        private readonly IUploadQueryExecutor uploadQueryExecutor;

        public TweetController(ITweetQueryExecutor tweetQueryExecutor, IUploadQueryExecutor uploadQueryExecutor)
        {
            this.tweetQueryExecutor = tweetQueryExecutor;           
            this.uploadQueryExecutor = uploadQueryExecutor;
        }

        public async Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request)
        {
            parameters.MediaIds.AddRange(parameters.Medias.Select(x => x.UploadedMediaInfo.MediaId));
            return await this.tweetQueryExecutor.PublishTweetAsync(parameters, request).ConfigureAwait(false);
        }

        public bool CanBePublished(IPublishTweetParameters publishTweetParameters)
        {
            return true;
            //return TweetinviConsts.MAX_TWEET_SIZE >= EstimateTweetLength(publishTweetParameters);
        }

        public bool CanBePublished(string text)
        {
            return true;
            //return TweetinviConsts.MAX_TWEET_SIZE >= EstimateTweetLength(text);
        }

        public static int EstimateTweetLength(string text)
        {
            var parameters = new PublishTweetParameters(text);
            return EstimateTweetLength(parameters);
        }

        private static int EstimateTweetLength(IPublishTweetParameters publishTweetParameters)
        {
            var text = publishTweetParameters.Text ?? "";
#pragma warning disable 618
            var textLength = StringExtensions.EstimateTweetLength(text);

            if (publishTweetParameters.QuotedTweet != null)
            {
                textLength = StringExtensions.EstimateTweetLength(text.TrimEnd()) +
                             1 + // for the space that needs to be added before the link to quoted tweet.
                             TweetinviConsts.MEDIA_CONTENT_SIZE;
#pragma warning restore 618
            }

            if (publishTweetParameters.HasMedia)
            {
                textLength += TweetinviConsts.MEDIA_CONTENT_SIZE;
            }

            return textLength;
        }

        // Retweets - Publish
        public Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.PublishRetweetAsync(parameters, request);
        }
    }
}
