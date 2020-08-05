namespace WorldFeed.Streams
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Tools;
    using WorldFeed.Common.Public.Parameters.StreamsClient;
    using WorldFeed.Common.Public.Streaming;
    using WorldFeed.Common.Streaming;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Streams.Properties;

    public class SampleStream : TweetStream, ISampleStream
    {
        public SampleStream(ITwitterClient twitterClient, IStreamResultGenerator streamResultGenerator, IJsonObjectConverter jsonObjectConverter,
            IJObjectStaticWrapper jObjectStaticWrapper, ITwitterClientFactories factories, ICreateSampleStreamParameters createSampleStreamParameters)
            : base(twitterClient, streamResultGenerator, jsonObjectConverter, jObjectStaticWrapper, factories, createSampleStreamParameters)
        {
        }

        public async Task StartAsync()
        {
            await StartAsync(Resources.Stream_Sample).ConfigureAwait(false);
        }
    }
}
