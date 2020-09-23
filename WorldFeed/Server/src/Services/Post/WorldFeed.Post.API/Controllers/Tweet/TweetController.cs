namespace WorldFeed.Post.API.Controllers.Tweet
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.API.Iterators;
    using WorldFeed.Post.Application.Parameters.TweetsClient;
    using WorldFeed.Post.Application.Requesters;
    using WorldFeed.Post.DTO;

    public class TweetController : ITweetController
    {
        private readonly ITweetQueryExecutor tweetQueryExecutor;
        private readonly IPageCursorIteratorFactories pageCursorIteratorFactories;

        public TweetController(ITweetQueryExecutor tweetQueryExecutor, IPageCursorIteratorFactories pageCursorIteratorFactories)
        {
            this.tweetQueryExecutor = tweetQueryExecutor;
            this.pageCursorIteratorFactories = pageCursorIteratorFactories;
        }

        public Task<ITwitterResult<IPostDTO>> GetTweetAsync(IGetTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.GetTweetAsync(parameters, request);
        }

        public Task<ITwitterResult<IPostDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.GetTweetsAsync(parameters, request);
        }

        // Retweets - Destroy

        public Task<ITwitterResult<IPostDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.DestroyRetweetAsync(parameters, request);
        }

        #region GetRetweets

        public Task<ITwitterResult<IPostDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters, ITwitterRequest request)
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
        public Task<ITwitterResult<IPostDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.DestroyTweetAsync(parameters, request);
        }

        // Favorite Tweet
        public ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetFavoriteTweetsIterator(IGetUserFavoriteTweetsParameters parameters, ITwitterRequest request)
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

        public Task<ITwitterResult<IPostDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.FavoriteTweetAsync(parameters, request);
        }

        public Task<ITwitterResult<IPostDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.UnfavoriteTweetAsync(parameters, request);
        }

        public Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters, ITwitterRequest request)
        {
            return this.tweetQueryExecutor.GetOEmbedTweetAsync(parameters, request);
        }
    }
}
