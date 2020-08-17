namespace WorldFeed.Controllers.Tweet
{
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Web;
    using WorldFeed.Controllers.Upload;
    using WorldFeed.Core.Controllers;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.TweetsClient;
    using WorldFeed.Common.Public.Parameters.TweetsClients;

    public class TweetController : ITweetController
    {
        private readonly ITweetQueryExecutor tweetQueryExecutor;
        private readonly IUploadQueryExecutor uploadQueryExecutor;
        private readonly IPageCursorIteratorFactories pageCursorIteratorFactories;

        public TweetController(ITweetQueryExecutor tweetQueryExecutor, IUploadQueryExecutor uploadQueryExecutor, 
            IPageCursorIteratorFactories pageCursorIteratorFactories)
        {
            this.tweetQueryExecutor = tweetQueryExecutor;
            this.uploadQueryExecutor = uploadQueryExecutor;
            this.pageCursorIteratorFactories = pageCursorIteratorFactories;
        }

        public Task<ITwitterResult<ITweetDTO>> GetTweetAsync(IGetTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.GetTweetAsync(parameters, request);
        }

        public Task<ITwitterResult<ITweetDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.GetTweetsAsync(parameters, request);
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

        // Retweets - Destroy

        public Task<ITwitterResult<ITweetDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.DestroyRetweetAsync(parameters, request);
        }

        #region GetRetweets

        public Task<ITwitterResult<ITweetDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.GetRetweetsAsync(parameters, request);
        }

        #endregion

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetRetweeterIdsIterator(IGetRetweeterIdsParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetRetweeterIdsParameters(parameters)
                {
                    Cursor = cursor
                };

                return this.tweetQueryExecutor.GetRetweeterIdsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        // Destroy Tweet
        public Task<ITwitterResult<ITweetDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.DestroyTweetAsync(parameters, request);
        }

        // Favorite Tweet
        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetFavoriteTweetsIterator(IGetUserFavoriteTweetsParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetUserFavoriteTweetsParameters(parameters)
                {
                    MaxId = cursor
                };

                return this.tweetQueryExecutor.GetFavoriteTweetsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public Task<ITwitterResult<ITweetDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.FavoriteTweetAsync(parameters, request);
        }

        public Task<ITwitterResult<ITweetDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.UnfavoriteTweetAsync(parameters, request);
        }

        public Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.GetOEmbedTweetAsync(parameters, request);
        }
    }
}
