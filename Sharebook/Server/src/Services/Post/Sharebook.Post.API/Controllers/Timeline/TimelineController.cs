namespace Sharebook.Post.API.Controllers.Timeline
{
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Iterators;
    using Sharebook.Post.Application.Parameters.TimelineClient;
    using Sharebook.Post.Application.Requesters;
    using Sharebook.Post.DTO;

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
