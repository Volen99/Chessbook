namespace Sharebook.Post.API.Controllers.Tweet
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.Application.Parameters.TweetsClient;
    using Sharebook.Post.Application.Requesters;
    using Sharebook.Post.DTO;

    public interface ITweetQueryExecutor
    {
        Task<ITwitterResult<IPostDTO>> GetTweetAsync(IGetTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IPostDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters, ITwitterRequest request);

        // UnRetweet
        Task<ITwitterResult<IPostDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters, ITwitterRequest request);

        // Get Retweets
        Task<ITwitterResult<IPostDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters, ITwitterRequest request);

        //Get Retweeters Ids
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetRetweeterIdsAsync(IGetRetweeterIdsParameters parameters, ITwitterRequest request);

        // Destroy Tweet
        Task<ITwitterResult<IPostDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters, ITwitterRequest request);

        // Favorite Tweet
        Task<ITwitterResult<IPostDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IPostDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IPostDTO[]>> GetFavoriteTweetsAsync(IGetUserFavoriteTweetsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters, ITwitterRequest request);
    }

    public class TweetQueryExecutor : ITweetQueryExecutor
    {
        private readonly ITweetQueryGenerator tweetQueryGenerator;
        private readonly ITwitterAccessor twitterAccessor;

        public TweetQueryExecutor(ITweetQueryGenerator tweetQueryGenerator, ITwitterAccessor twitterAccessor)
        {
            this.tweetQueryGenerator = tweetQueryGenerator;
            this.twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<IPostDTO>> GetTweetAsync(IGetTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetTweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO>(request);
        }

        public Task<ITwitterResult<IPostDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetTweetsQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO[]>(request);
        }

        public Task<ITwitterResult<IPostDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetRetweetsQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO[]>(request);
        }

        // Publish UnRetweet
        public Task<ITwitterResult<IPostDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetDestroyRetweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO>(request);
        }

        #region Get Retweeters IDs

        public Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetRetweeterIdsAsync(IGetRetweeterIdsParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetRetweeterIdsQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        #endregion

        // Destroy Tweet
        public Task<ITwitterResult<IPostDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetDestroyTweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }

        // Favorite Tweet
        public Task<ITwitterResult<IPostDTO[]>> GetFavoriteTweetsAsync(IGetUserFavoriteTweetsParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetFavoriteTweetsQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO[]>(request);
        }

        public Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetOEmbedTweetQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IOEmbedTweetDTO>(request);
        }

        public Task<ITwitterResult<IPostDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetCreateFavoriteTweetQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO>(request);
        }

        public Task<ITwitterResult<IPostDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetUnfavoriteTweetQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO>(request);
        }
    }
}
