namespace Sharebook.Post.Client.Validators
{
    using System;

    using Sharebook.Post.Application.Parameters.TimelineClient;

    public interface ITimelineClientRequiredParametersValidator : ITimelineClientParametersValidator
    {
    }

    public class TimelineClientRequiredParametersValidator : ITimelineClientRequiredParametersValidator
    {
        private readonly IUserQueryValidator userQueryValidator;

        public TimelineClientRequiredParametersValidator(IUserQueryValidator userQueryValidator)
        {
            this.userQueryValidator = userQueryValidator;
        }

        public void Validate(IGetHomeTimelineParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetUserTimelineParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IGetMentionsTimelineParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetRetweetsOfMeTimelineParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }
    }
}
