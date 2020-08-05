namespace WorldFeed.Client.Clients
{
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Parameters.StreamsClient;
    using WorldFeed.Common.Public.Streaming;
    using WorldFeed.Common.Streaming;
    
    public class StreamsClient : IStreamsClient
    {
        private readonly ITwitterClient client;
        private readonly IFactory<ISampleStream> sampleStreamFactory;
        private readonly IFactory<IFilteredStream> filteredStreamFactory;
        private readonly IFactory<ITrackedStream> trackedStreamFactory;
        private readonly IFactory<ITweetStream> tweetStreamFactory;

        public StreamsClient(
            ITwitterClient client,
            IFactory<ISampleStream> sampleStreamFactory,
            IFactory<IFilteredStream> filteredStreamFactory,
            IFactory<ITrackedStream> trackedStreamFactory,
            IFactory<ITweetStream> tweetStreamFactory)
        {
            this.client = client;
            this.sampleStreamFactory = sampleStreamFactory;
            this.filteredStreamFactory = filteredStreamFactory;
            this.trackedStreamFactory = trackedStreamFactory;
            this.tweetStreamFactory = tweetStreamFactory;
        }

        public ISampleStream CreateSampleStream()
        {
            return CreateSampleStream(new CreateSampleStreamParameters());
        }

        public ISampleStream CreateSampleStream(ICreateSampleStreamParameters parameters)
        {
            parameters ??= new CreateSampleStreamParameters();
            var customRequestParameters = this.sampleStreamFactory.GenerateParameterOverrideWrapper("createSampleStreamParameters", parameters);
            var stream = this.sampleStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.TweetMode ?? this.client.Config.TweetMode;
            return stream;
        }

        public IFilteredStream CreateFilteredStream()
        {
            return CreateFilteredStream(new CreateFilteredTweetStreamParameters());
        }

        public IFilteredStream CreateFilteredStream(ICreateFilteredTweetStreamParameters parameters)
        {
            parameters ??= new CreateFilteredTweetStreamParameters();
            var customRequestParameters = this.filteredStreamFactory.GenerateParameterOverrideWrapper("createFilteredTweetStreamParameters", parameters);
            var stream = this.filteredStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.TweetMode ?? this.client.Config.TweetMode;
            return stream;
        }

        public ITweetStream CreateTweetStream()
        {
            return CreateTweetStream(new CreateTweetStreamParameters());
        }

        public ITweetStream CreateTweetStream(ICreateTweetStreamParameters parameters)
        {
            parameters ??= new CreateTweetStreamParameters();
            var customRequestParameters = this.tweetStreamFactory.GenerateParameterOverrideWrapper("createTweetStreamParameters", parameters);
            var stream = this.tweetStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.TweetMode ?? this.client.Config.TweetMode;
            return stream;
        }

        public ITrackedStream CreateTrackedTweetStream()
        {
            return CreateTrackedTweetStream(new CreateTrackedTweetStreamParameters());
        }

        public ITrackedStream CreateTrackedTweetStream(ICreateTrackedTweetStreamParameters parameters)
        {
            parameters ??= new CreateTrackedTweetStreamParameters();
            var customRequestParameters = this.trackedStreamFactory.GenerateParameterOverrideWrapper("createTrackedTweetStreamParameters", parameters);
            var stream = this.trackedStreamFactory.Create(customRequestParameters);
            stream.TweetMode = parameters.TweetMode ?? this.client.Config.TweetMode;
            return stream;
        }
    }
}