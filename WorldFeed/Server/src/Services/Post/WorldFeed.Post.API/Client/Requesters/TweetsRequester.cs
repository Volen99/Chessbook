namespace WorldFeed.Post.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Client;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.TweetsClient;
    using WorldFeed.Common.Public.Parameters.TweetsClients;
    using WorldFeed.Post.Controllers;

    public class TweetsRequester : BaseRequester, ITweetsRequester
    {
        private readonly ITweetController tweetController;
        private readonly ITweetsClientRequiredParametersValidator tweetsClientRequiredParametersValidator;

        public TweetsRequester(
            ITwitterClient client,
            ITwitterClientEvents clientEvents,
            ITweetController tweetController,
            ITweetsClientRequiredParametersValidator tweetsClientRequiredParametersValidator)
        : base(client, clientEvents)
        {
            this.tweetController = tweetController;
            this.tweetsClientRequiredParametersValidator = tweetsClientRequiredParametersValidator;
        }

        // Tweets
        public Task<ITwitterResult<ITweetDTO>> GetTweetAsync(IGetTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.GetTweetAsync(parameters, request));
        }

        public Task<ITwitterResult<ITweetDTO[]>> GetTweetsAsync(IGetTweetsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.GetTweetsAsync(parameters, request));
        }

        // Tweets - Publish
        public Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.PublishTweetAsync(parameters, request));
        }

        // Tweets - Destroy
        public Task<ITwitterResult<ITweetDTO>> DestroyTweetAsync(IDestroyTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.DestroyTweetAsync(parameters, request));
        }

        // Retweets
        public Task<ITwitterResult<ITweetDTO[]>> GetRetweetsAsync(IGetRetweetsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.GetRetweetsAsync(parameters, request));
        }

        // Retweets - Publish
        public Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.PublishRetweetAsync(parameters, request));
        }

        // Retweets - Destroy
        public Task<ITwitterResult<ITweetDTO>> DestroyRetweetAsync(IDestroyRetweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.DestroyRetweetAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetRetweeterIdsIterator(IGetRetweeterIdsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.tweetController.GetRetweeterIdsIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetUserFavoriteTweetsIterator(IGetUserFavoriteTweetsParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            var request = TwitterClient.CreateRequest();
            return this.tweetController.GetFavoriteTweetsIterator(parameters, request);
        }

        public Task<ITwitterResult<ITweetDTO>> FavoriteTweetAsync(IFavoriteTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.FavoriteTweetAsync(parameters, request));
        }

        public Task<ITwitterResult<ITweetDTO>> UnfavoriteTweetAsync(IUnfavoriteTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.UnfavoriteTweetAsync(parameters, request));
        }

        public Task<ITwitterResult<IOEmbedTweetDTO>> GetOEmbedTweetAsync(IGetOEmbedTweetParameters parameters)
        {
            this.tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.tweetController.GetOEmbedTweetAsync(parameters, request));
        }
    }
}