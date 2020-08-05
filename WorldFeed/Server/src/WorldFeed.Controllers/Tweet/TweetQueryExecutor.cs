namespace WorldFeed.Controllers.Tweet
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.TweetsClient;
    using WorldFeed.Common.Public.Parameters.TweetsClients;
    using WorldFeed.Common.QueryGenerators;
    using WorldFeed.Common.Web;

    public interface ITweetQueryExecutor
    {
        Task<ITwitterResult<ITweetDTO>> GetTweetAsync(IGetTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITweetDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request);


        // Publish Retweet
        Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters, ITwitterRequest request);

        // UnRetweet
        Task<ITwitterResult<ITweetDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters, ITwitterRequest request);

        // Get Retweets
        Task<ITwitterResult<ITweetDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters, ITwitterRequest request);

        //Get Retweeters Ids
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetRetweeterIdsAsync(IGetRetweeterIdsParameters parameters, ITwitterRequest request);

        // Destroy Tweet
        Task<ITwitterResult<ITweetDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters, ITwitterRequest request);

        // Favorite Tweet
        Task<ITwitterResult<ITweetDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITweetDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<ITweetDTO[]>> GetFavoriteTweetsAsync(IGetUserFavoriteTweetsParameters parameters, ITwitterRequest request);

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

        public Task<ITwitterResult<ITweetDTO>> GetTweetAsync(IGetTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetTweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }

        public Task<ITwitterResult<ITweetDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetTweetsQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }

        public Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetPublishTweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }

        // Publish Retweet
        public Task<ITwitterResult<ITweetDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetRetweetsQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }

        public Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetPublishRetweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }

        // Publish UnRetweet
        public Task<ITwitterResult<ITweetDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetDestroyRetweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
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
        public Task<ITwitterResult<ITweetDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetDestroyTweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }

        // Favorite Tweet
        public Task<ITwitterResult<ITweetDTO[]>> GetFavoriteTweetsAsync(IGetUserFavoriteTweetsParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetFavoriteTweetsQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }

        public Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetOEmbedTweetQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IOEmbedTweetDTO>(request);
        }

        public Task<ITwitterResult<ITweetDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetCreateFavoriteTweetQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }

        public Task<ITwitterResult<ITweetDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters, ITwitterRequest request)
        {
            var query = this.tweetQueryGenerator.GetUnfavoriteTweetQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }
    }
}
