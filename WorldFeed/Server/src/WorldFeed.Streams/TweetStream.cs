namespace WorldFeed.Streams
{
    using System;
    using System.Text;
    using System.Threading.Tasks;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Tools;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.StreamsClient;
    using WorldFeed.Common.Streaming;
    using WorldFeed.Common.Wrappers;

    public class TweetStream : TwitterStream, ITweetStream
    {
        private readonly ITwitterClient client;
        private readonly ITwitterClientFactories factories;

        public event EventHandler<TweetReceivedEventArgs> TweetReceived;
        public override event EventHandler<StreamEventReceivedArgs> EventReceived;

        public TweetStream(
            ITwitterClient client,
            IStreamResultGenerator streamResultGenerator,
            IJsonObjectConverter jsonObjectConverter,
            IJObjectStaticWrapper jObjectStaticWrapper,
            ITwitterClientFactories factories,
            ICreateTweetStreamParameters createTweetStreamParameters)
            : base(streamResultGenerator, jsonObjectConverter, jObjectStaticWrapper, createTweetStreamParameters)
        {
            this.client = client;
            this.factories = factories;
        }

        public async Task StartAsync(string url)
        {
            ITwitterRequest createTwitterRequest()
            {
                var queryBuilder = new StringBuilder(url);
                AddBaseParametersToQuery(queryBuilder);

                var request = this.client.CreateRequest();
                request.Query.Url = queryBuilder.ToString();
                request.Query.HttpMethod = HttpMethod.GET;
                return request;
            }

            void onTweetReceived(string json)
            {
                this.Raise(EventReceived, new StreamEventReceivedArgs(json));

                if (IsEvent(json))
                {
                    TryInvokeGlobalStreamMessages(json);
                    return;
                }

                var tweet = this.factories.CreateTweet(json);
                if (tweet != null)
                {
                    this.Raise(TweetReceived, new TweetReceivedEventArgs(tweet, json));
                }
            }

            await this.streamResultGenerator.StartAsync(onTweetReceived, createTwitterRequest).ConfigureAwait(false);
        }
    }
}
