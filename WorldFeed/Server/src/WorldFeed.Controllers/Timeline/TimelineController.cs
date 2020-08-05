namespace WorldFeed.Controllers.Timeline
{
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.TimelineClient;
    using WorldFeed.Common.Web;
    using WorldFeed.Core.Controllers;

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

        // Home Timeline

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetHomeTimelineIterator(IGetHomeTimelineParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetHomeTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return this.timelineQueryExecutor.GetHomeTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetUserTimelineIterator(IGetUserTimelineParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetUserTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return this.timelineQueryExecutor.GetUserTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetMentionsTimelineIterator(IGetMentionsTimelineParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetMentionsTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return this.timelineQueryExecutor.GetMentionsTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetRetweetsOfMeTimelineIterator(IGetRetweetsOfMeTimelineParameters parameters, ITwitterRequest request)
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
