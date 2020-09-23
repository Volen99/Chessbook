namespace WorldFeed.Post.API.Application.Validations
{
    using WorldFeed.Post.Application.Parameters.TimelineClient;
    using WorldFeed.Post.Application.Parameters.TweetsClient;
    using WorldFeed.Post.Client.Validators;

    public interface IParametersValidator : ITimelineClientParametersValidator, ITweetsClientParametersValidator
    {
    }

    public class ParametersValidator : IParametersValidator
    {
        private readonly ITimelineClientParametersValidator timelineClientParametersValidator;
        private readonly ITweetsClientParametersValidator tweetsClientParametersValidator;

        public ParametersValidator(
            ITimelineClientParametersValidator timelineClientParametersValidator,
            ITweetsClientParametersValidator tweetsClientParametersValidator)
        {
            this.timelineClientParametersValidator = timelineClientParametersValidator;
            this.tweetsClientParametersValidator = tweetsClientParametersValidator;
        }

        public void Validate(IGetHomeTimelineParameters parameters)
        {
            this.timelineClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetUserTimelineParameters parameters)
        {
            this.timelineClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetMentionsTimelineParameters parameters)
        {
            this.timelineClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetRetweetsOfMeTimelineParameters parameters)
        {
            this.timelineClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetTweetParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetTweetsParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IDestroyTweetParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetUserFavoriteTweetsParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetRetweetsParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IDestroyRetweetParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetRetweeterIdsParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IFavoriteTweetParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IUnfavoriteTweetParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetOEmbedTweetParameters parameters)
        {
            this.tweetsClientParametersValidator.Validate(parameters);
        }
    }
}
