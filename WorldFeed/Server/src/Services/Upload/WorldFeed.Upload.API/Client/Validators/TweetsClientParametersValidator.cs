namespace WorldFeed.Upload.Client.Validators
{
    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public interface ITweetsClientParametersValidator
    {
        void Validate(IPublishTweetParameters parameters);

        void Validate(IPublishRetweetParameters parameters);
    }

    public class TweetsClientParametersValidator : ITweetsClientParametersValidator
    {
        private readonly ITweetsClientRequiredParametersValidator tweetsClientRequiredParametersValidator;
        private readonly ITwitterClient client;

        public TweetsClientParametersValidator(ITwitterClient client, ITweetsClientRequiredParametersValidator tweetsClientRequiredParametersValidator)
        {
            this.client = client;
            this.tweetsClientRequiredParametersValidator = tweetsClientRequiredParametersValidator;
        }

        private WorldFeedLimits Limits => this.client.Config.Limits;

        public void Validate(IPublishTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IPublishRetweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }
    }
}
