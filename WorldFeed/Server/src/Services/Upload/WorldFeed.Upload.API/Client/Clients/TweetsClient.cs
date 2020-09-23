namespace WorldFeed.Upload.API.Client.Clients
{
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Upload.API.Application.Requesters;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;
    using WorldFeed.Upload.Client.Validators;
    using WorldFeed.Upload.Domain;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public class TweetsClient : ITweetsClient
    {
        private readonly ITwitterClient _client;
        private readonly ITweetsRequester _tweetsRequester;

        public TweetsClient(ITwitterClient client)
        {
            _client = client;
            _tweetsRequester = client.Raw.Tweets;
        }

        public ITweetsClientParametersValidator ParametersValidator => _client.ParametersValidator;

        // Tweets - Publish

        public Task<ITweet> PublishTweetAsync(string text)
        {
            return PublishTweetAsync(new PublishTweetParameters(text));
        }

        public async Task<ITweet> PublishTweetAsync(IPublishTweetParameters parameters)
        {
            var requestResult = await _tweetsRequester.PublishTweetAsync(parameters).ConfigureAwait(false);
            return _client.Factories.CreateTweet(requestResult?.Model);
        }

        public Task<ITweet> PublishRetweetAsync(long tweetId)
        {
            return PublishRetweetAsync(new PublishRetweetParameters(tweetId));
        }

        public Task<ITweet> PublishRetweetAsync(ITweetIdentifier tweet)
        {
            return PublishRetweetAsync(new PublishRetweetParameters(tweet));
        }

        public async Task<ITweet> PublishRetweetAsync(IPublishRetweetParameters parameters)
        {
            var requestResult = await _tweetsRequester.PublishRetweetAsync(parameters).ConfigureAwait(false);
            return _client.Factories.CreateTweet(requestResult?.Model);
        }
    }
}
