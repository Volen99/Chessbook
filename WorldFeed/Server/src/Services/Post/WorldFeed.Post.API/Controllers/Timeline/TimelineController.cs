namespace WorldFeed.Post.API.Controllers.Timeline
{
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.API.Iterators;
    using WorldFeed.Post.Application.Parameters.TimelineClient;
    using WorldFeed.Post.Application.Requesters;
    using WorldFeed.Post.DTO;

    public class TimelineController : ITimelineController
    {
        private readonly ITimelineQueryExecutor timelineQueryExecutor;
        private readonly IPageCursorIteratorFactories pageCursorIteratorFactories;

        public TimelineController(ITimelineQueryExecutor timelineQueryExecutor,
            IPageCursorIteratorFactories pageCursorIteratorFactories)
        {
            this.timelineQueryExecutor = timelineQueryExecutor;
            this.pageCursorIteratorFactories = pageCursorIteratorFactories;
        }

        /// <summary>
        /// The Home timeline contains the tweets available on the authenticated user's home page - docs
        /// </summary>
        public ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetHomeTimelineIterator(IGetHomeTimelineParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetHomeTimelineParameters(parameters)
                {
                    MaxId = cursor,
                };

                return this.timelineQueryExecutor.GetHomeTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public ITwitterPageIterator<ITwitterResult<IPostDTO[]>, long?> GetRetweetsOfMeTimelineIterator(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetRetweetsOfMeTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return this.timelineQueryExecutor.GetRetweetsOfMeTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }
    }
}
