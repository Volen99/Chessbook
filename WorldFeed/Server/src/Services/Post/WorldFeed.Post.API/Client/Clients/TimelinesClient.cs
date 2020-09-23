namespace WorldFeed.Post.Client.Clients
{
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Post.Application.Parameters.TimelineClient;

    public class TimelinesClient : ITimelinesClient
    {
        private readonly ITwitterClient client;
        private readonly ITimelinesRequester timelinesRequester;

        public TimelinesClient(ITwitterClient client)
        {
            this.client = client;
            this.timelinesRequester = this.client.Raw.Timelines;
        }

        public ITimelineClientParametersValidator ParametersValidator => this.client.ParametersValidator;
        public Task<ITweet[]> GetHomeTimelineAsync()
        {
            return GetHomeTimelineAsync(new GetHomeTimelineParameters());
        }

        public async Task<ITweet[]> GetHomeTimelineAsync(IGetHomeTimelineParameters parameters)
        {
            var iterator = GetHomeTimelineIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITweet, long?> GetHomeTimelineIterator()
        {
            return GetHomeTimelineIterator(new GetHomeTimelineParameters());
        }

        public ITwitterIterator<ITweet, long?> GetHomeTimelineIterator(IGetHomeTimelineParameters parameters)
        {
            var pageIterator = this.timelinesRequester.GetHomeTimelineIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, long?>(pageIterator,
                twitterResult => this.client.Factories.CreateTweets(twitterResult?.Model));
        }

        public Task<ITweet[]> GetUserTimelineAsync(long userId)
        {
            return GetUserTimelineAsync(new GetUserTimelineParameters(userId));
        }

        public Task<ITweet[]> GetUserTimelineAsync(string username)
        {
            return GetUserTimelineAsync(new GetUserTimelineParameters(username));
        }

        public Task<ITweet[]> GetUserTimelineAsync(IUserIdentifier user)
        {
            return GetUserTimelineAsync(new GetUserTimelineParameters(user));
        }

        public async Task<ITweet[]> GetUserTimelineAsync(IGetUserTimelineParameters parameters)
        {
            var iterator = GetUserTimelineIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITweet, long?> GetUserTimelineIterator(long userId)
        {
            return GetUserTimelineIterator(new GetUserTimelineParameters(userId));
        }

        public ITwitterIterator<ITweet, long?> GetUserTimelineIterator(string username)
        {
            return GetUserTimelineIterator(new GetUserTimelineParameters(username));
        }

        public ITwitterIterator<ITweet, long?> GetUserTimelineIterator(IUserIdentifier user)
        {
            return GetUserTimelineIterator(new GetUserTimelineParameters(user));
        }

        public ITwitterIterator<ITweet, long?> GetUserTimelineIterator(IGetUserTimelineParameters parameters)
        {
            var pageIterator = this.timelinesRequester.GetUserTimelineIterator(parameters);

            return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, long?>(pageIterator,
                twitterResult => this.client.Factories.CreateTweets(twitterResult?.Model));
        }

        public Task<ITweet[]> GetMentionsTimelineAsync()
        {
            return GetMentionsTimelineAsync(new GetMentionsTimelineParameters());
        }

        public async Task<ITweet[]> GetMentionsTimelineAsync(IGetMentionsTimelineParameters parameters)
        {
            var iterator = GetMentionsTimelineIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITweet, long?> GetMentionsTimelineIterator()
        {
            return GetMentionsTimelineIterator(new GetMentionsTimelineParameters());
        }

        public ITwitterIterator<ITweet, long?> GetMentionsTimelineIterator(IGetMentionsTimelineParameters parameters)
        {
            var pageIterator = this.timelinesRequester.GetMentionsTimelineIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, long?>(pageIterator,
                twitterResult => this.client.Factories.CreateTweets(twitterResult?.Model));
        }

        public Task<ITweet[]> GetRetweetsOfMeTimelineAsync()
        {
            return GetRetweetsOfMeTimelineAsync(new GetRetweetsOfMeTimelineParameters());
        }

        public async Task<ITweet[]> GetRetweetsOfMeTimelineAsync(IGetRetweetsOfMeTimelineParameters parameters)
        {
            var iterator = GetRetweetsOfMeTimelineIterator(parameters);
            var firstResults = await iterator.NextPageAsync().ConfigureAwait(false);
            return firstResults?.ToArray();
        }

        public ITwitterIterator<ITweet, long?> GetRetweetsOfMeTimelineIterator()
        {
            return GetRetweetsOfMeTimelineIterator(new GetRetweetsOfMeTimelineParameters());
        }

        public ITwitterIterator<ITweet, long?> GetRetweetsOfMeTimelineIterator(IGetRetweetsOfMeTimelineParameters parameters)
        {
            var pageIterator = this.timelinesRequester.GetRetweetsOfMeTimelineIterator(parameters);

            return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, long?>(pageIterator,
                twitterResult => this.client.Factories.CreateTweets(twitterResult?.Model));
        }
    }
}