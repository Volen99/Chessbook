namespace WorldFeed.Post.Client.Validators
{
    using WorldFeed.Common.Exceptions.Public;
    using WorldFeed.Common.Settings;
    using WorldFeed.Post.API.Infrastructure.Inject.Contracts;
    using WorldFeed.Post.Application.Parameters.TweetsClient;

    public interface ITweetsClientParametersValidator
    {
        void Validate(IGetTweetParameters parameters);

        void Validate(IGetTweetsParameters parameters);

        void Validate(IDestroyTweetParameters parameters);

        void Validate(IGetUserFavoriteTweetsParameters parameters);

        void Validate(IGetRetweetsParameters parameters);

        void Validate(IDestroyRetweetParameters parameters);

        void Validate(IGetRetweeterIdsParameters parameters);

        void Validate(IFavoriteTweetParameters parameters);

        void Validate(IUnfavoriteTweetParameters parameters);

        void Validate(IGetOEmbedTweetParameters parameters);
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

        public void Validate(IGetTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetTweetsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TWEETS_GET_TWEETS_REQUEST_MAX_SIZE;
            if (parameters.Tweets.Length > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.Tweets)}", maxPageSize, nameof(Limits.TWEETS_GET_TWEETS_REQUEST_MAX_SIZE), "items");
            }
        }

        public void Validate(IDestroyTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetUserFavoriteTweetsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE), "page size");
            }
        }

        public void Validate(IGetRetweetsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TWEETS_GET_RETWEETS_MAX_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.TWEETS_GET_RETWEETS_MAX_SIZE), "page size");
            }
        }

        public void Validate(IDestroyRetweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetRetweeterIdsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(IFavoriteTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IUnfavoriteTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetOEmbedTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
        }
    }
}
