namespace Sharebook.Upload.API.Application.Requesters
{
    using System.Threading.Tasks;

    using Sharebook.Upload.API.Controllers.Tweet;
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.Application.Parameters.TweetsClient;
    using Sharebook.Upload.Client;
    using Sharebook.Upload.Client.Validators;
    using Sharebook.Upload.DTO;
    using Sharebook.Upload.Events;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

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
