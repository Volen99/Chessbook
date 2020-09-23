namespace WorldFeed.Upload.API.Application.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.API.Controllers.Tweet;
    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;
    using WorldFeed.Upload.Client;
    using WorldFeed.Upload.Client.Validators;
    using WorldFeed.Upload.DTO;
    using WorldFeed.Upload.Events;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public class TweetsRequester : BaseRequester, ITweetsRequester
    {
        private readonly ITweetController _tweetController;
        private readonly ITweetsClientRequiredParametersValidator _tweetsClientRequiredParametersValidator;

        public TweetsRequester(ITwitterClient client, ITwitterClientEvents clientEvents, ITweetController tweetController,
            ITweetsClientRequiredParametersValidator tweetsClientRequiredParametersValidator)
        : base(client, clientEvents)
        {
            _tweetController = tweetController;
            _tweetsClientRequiredParametersValidator = tweetsClientRequiredParametersValidator;
        }

        // Tweets - Publish
        public Task<ITwitterResult<ITweetDTO>> PublishTweetAsync(IPublishTweetParameters parameters)
        {
            _tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => _tweetController.PublishTweetAsync(parameters, request));
        }

        // Retweets - Publish
        public Task<ITwitterResult<ITweetDTO>> PublishRetweetAsync(IPublishRetweetParameters parameters)
        {
            _tweetsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => _tweetController.PublishRetweetAsync(parameters, request));
        }
    }
}
