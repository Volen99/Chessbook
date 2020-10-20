namespace Sharebook.Post.Client.Validators
{
    using Sharebook.Common.Exceptions.Public;
    using Sharebook.Common.Settings;
    using Sharebook.Post.API.Infrastructure.Inject.Contracts;
    using Sharebook.Post.Application.Parameters.TimelineClient;

    public interface ITimelineClientParametersValidator
    {
        void Validate(IGetHomeTimelineParameters parameters);

        void Validate(IGetUserTimelineParameters parameters);

        void Validate(IGetMentionsTimelineParameters parameters);

        void Validate(IGetRetweetsOfMeTimelineParameters parameters);
    }

    public class TimelineClientParametersValidator : ITimelineClientParametersValidator
    {
        private readonly ITimelineClientRequiredParametersValidator timelineClientRequiredParametersValidator;
        private readonly ITwitterClient client;

        public TimelineClientParametersValidator(ITwitterClient client, ITimelineClientRequiredParametersValidator timelineClientRequiredParametersValidator)
        {
            this.client = client;
            this.timelineClientRequiredParametersValidator = timelineClientRequiredParametersValidator;
        }

        private WorldFeedLimits Limits => this.client.Config.Limits;

        public void Validate(IGetHomeTimelineParameters parameters)
        {
            this.timelineClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(IGetUserTimelineParameters parameters)
        {
            this.timelineClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TIMELINE_USER_PAGE_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.TIMELINE_USER_PAGE_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(IGetMentionsTimelineParameters parameters)
        {
            this.timelineClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(IGetRetweetsOfMeTimelineParameters parameters)
        {
            this.timelineClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE), "page size");
            }
        }
    }
}
