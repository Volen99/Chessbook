namespace Sharebook.Post.Client.Requesters
{
    using Sharebook.Client;
    using Sharebook.Common.Client.Validators;
    using Sharebook.Common.Events;
    using Sharebook.Common.Iterators;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Core.Controllers;
    using Sharebook.Post.Application.Parameters.TimelineClient;
    using Sharebook.Post.Application.Web;

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