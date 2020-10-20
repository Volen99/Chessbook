namespace Sharebook.Upload.API.Controllers.Tweet
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.Application.Parameters.TweetsClient;
    using Sharebook.Upload.Application.Requesters;
    using Sharebook.Upload.DTO;

    public interface ITweetQueryExecutor
    {
        Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters, ITwitterRequest request);
    }

    public class TweetQueryExecutor : ITweetQueryExecutor
    {
        private readonly ITweetQueryGenerator _tweetQueryGenerator;
        private readonly ITwitterAccessor _twitterAccessor;

        public TweetQueryExecutor(ITweetQueryGenerator tweetQueryGenerator, ITwitterAccessor twitterAccessor)
        {
            _tweetQueryGenerator = tweetQueryGenerator;
            _twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters, ITwitterRequest request)
        {
            var query = _tweetQueryGenerator.GetPublishTweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return _twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }

        public Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters, ITwitterRequest request)
        {
            var query = _tweetQueryGenerator.GetPublishRetweetQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return _twitterAccessor.ExecuteRequestAsync<ITweetDTO>(request);
        }
    }
}
