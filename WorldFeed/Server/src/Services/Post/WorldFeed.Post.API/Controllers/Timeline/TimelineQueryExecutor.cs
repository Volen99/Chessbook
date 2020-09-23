namespace WorldFeed.Post.API.Controllers.Timeline
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.Application.Parameters.TimelineClient;
    using WorldFeed.Post.Application.Requesters;
    using WorldFeed.Post.DTO;

    public interface ITimelineQueryExecutor
    {
        // Home Timeline
        Task<ITwitterResult<IPostDTO[]>> GetHomeTimelineAsync(IGetHomeTimelineParameters parameters, ITwitterRequest request);

        // User Timeline
        Task<ITwitterResult<IPostDTO[]>> GetUserTimelineAsync(IGetUserTimelineParameters parameters, ITwitterRequest request);

        // Mention Timeline
        Task<ITwitterResult<IPostDTO[]>> GetMentionsTimelineAsync(IGetMentionsTimelineParameters parameters, ITwitterRequest request);

        // Retweets Of Me Timeline
        Task<ITwitterResult<IPostDTO[]>> GetRetweetsOfMeTimelineAsync(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request);
    }

    public class TimelineQueryExecutor : ITimelineQueryExecutor
    {
        private readonly ITwitterAccessor twitterAccessor;
        private readonly ITimelineQueryGenerator timelineQueryGenerator;

        public TimelineQueryExecutor(ITwitterAccessor twitterAccessor, ITimelineQueryGenerator timelineQueryGenerator)
        {
            this.twitterAccessor = twitterAccessor;
            this.timelineQueryGenerator = timelineQueryGenerator;
        }

        // Home Timeline
        public Task<ITwitterResult<IPostDTO[]>> GetHomeTimelineAsync(IGetHomeTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetHomeTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO[]>(request);
        }

        public Task<ITwitterResult<IPostDTO[]>> GetUserTimelineAsync(IGetUserTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetUserTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO[]>(request);
        }

        // Mention Timeline
        public Task<ITwitterResult<IPostDTO[]>> GetMentionsTimelineAsync(IGetMentionsTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetMentionsTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO[]>(request);
        }

        // Retweets of Me Timeline
        public Task<ITwitterResult<IPostDTO[]>> GetRetweetsOfMeTimelineAsync(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetRetweetsOfMeTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPostDTO[]>(request);
        }
    }
}
