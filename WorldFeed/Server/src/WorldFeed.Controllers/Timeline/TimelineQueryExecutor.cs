namespace WorldFeed.Controllers.Timeline
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.TimelineClient;
    using WorldFeed.Common.Web;

    public interface ITimelineQueryExecutor
    {
        // Home Timeline
        Task<ITwitterResult<ITweetDTO[]>> GetHomeTimelineAsync(IGetHomeTimelineParameters parameters, ITwitterRequest request);

        // User Timeline
        Task<ITwitterResult<ITweetDTO[]>> GetUserTimelineAsync(IGetUserTimelineParameters parameters, ITwitterRequest request);

        // Mention Timeline
        Task<ITwitterResult<ITweetDTO[]>> GetMentionsTimelineAsync(IGetMentionsTimelineParameters parameters, ITwitterRequest request);

        // Retweets Of Me Timeline
        Task<ITwitterResult<ITweetDTO[]>> GetRetweetsOfMeTimelineAsync(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request);
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
        public Task<ITwitterResult<ITweetDTO[]>> GetHomeTimelineAsync(IGetHomeTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetHomeTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }

        public Task<ITwitterResult<ITweetDTO[]>> GetUserTimelineAsync(IGetUserTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetUserTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }

        // Mention Timeline
        public Task<ITwitterResult<ITweetDTO[]>> GetMentionsTimelineAsync(IGetMentionsTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetMentionsTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }

        // Retweets of Me Timeline
        public Task<ITwitterResult<ITweetDTO[]>> GetRetweetsOfMeTimelineAsync(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request)
        {
            var query = this.timelineQueryGenerator.GetRetweetsOfMeTimelineQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }
    }
}
