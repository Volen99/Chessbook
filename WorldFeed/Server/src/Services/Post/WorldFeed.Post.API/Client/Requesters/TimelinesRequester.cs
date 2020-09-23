namespace WorldFeed.Post.Client.Requesters
{
    using WorldFeed.Client;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Core.Controllers;
    using WorldFeed.Post.Application.Parameters.TimelineClient;
    using WorldFeed.Post.Application.Web;

    public class TimelinesRequester : BaseRequester, ITimelinesRequester
    {
        private readonly ITimelineController timelineController;
        private readonly ITimelineClientRequiredParametersValidator validator;

        public TimelinesRequester(ITwitterClient client, ITwitterClientEvents clientEvents, ITimelineController timelineController,
            ITimelineClientRequiredParametersValidator validator)
        : base(client, clientEvents)
        {
            this.timelineController = timelineController;
            this.validator = validator;
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetUserTimelineIterator(IGetUserTimelineParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return this.timelineController.GetUserTimelineIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetHomeTimelineIterator(IGetHomeTimelineParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return this.timelineController.GetHomeTimelineIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetRetweetsOfMeTimelineIterator(IGetRetweetsOfMeTimelineParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return this.timelineController.GetRetweetsOfMeTimelineIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetMentionsTimelineIterator(IGetMentionsTimelineParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return this.timelineController.GetMentionsTimelineIterator(parameters, request);
        }
    }
}