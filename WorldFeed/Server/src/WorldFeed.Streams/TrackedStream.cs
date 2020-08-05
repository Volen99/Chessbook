namespace WorldFeed.Streams
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
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
    using WorldFeed.Common.Public.Streaming.Enums;
    using WorldFeed.Common.Streaming;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Streams.Properties;

    public class TrackedStream : TwitterStream, ITrackedStream
    {
        public event EventHandler<MatchedTweetReceivedEventArgs> TweetReceived;
        public event EventHandler<MatchedTweetReceivedEventArgs> MatchingTweetReceived;
        public event EventHandler<TweetEventArgs> NonMatchingTweetReceived;

        private readonly ITwitterClient client;
        private readonly IStreamTrackManager<ITweet> streamTrackManager;
        private readonly ITwitterClientFactories factories;

        public override event EventHandler<StreamEventReceivedArgs> EventReceived;

        public TrackedStream(
            ITwitterClient client,
            IStreamTrackManager<ITweet> streamTrackManager,
            IJsonObjectConverter jsonObjectConverter,
            IJObjectStaticWrapper jObjectStaticWrapper,
            IStreamResultGenerator streamResultGenerator,
            ITwitterClientFactories factories,
            ICreateTrackedTweetStreamParameters createTrackedTweetStreamParameters)

            : base(streamResultGenerator, jsonObjectConverter, jObjectStaticWrapper, createTrackedTweetStreamParameters)
        {
            this.client = client;
            this.streamTrackManager = streamTrackManager;
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

            void onJsonReceived(string json)
            {
                RaiseJsonObjectReceived(json);

                if (IsEvent(json))
                {
                    TryInvokeGlobalStreamMessages(json);
                    return;
                }

                var tweet = this.factories.CreateTweet(json);

                var detectedTracksAndActions = this.streamTrackManager.GetMatchingTracksAndActions(tweet.FullText);
                var detectedTracks = detectedTracksAndActions.Select(x => x.Item1);

                var eventArgs = new MatchedTweetReceivedEventArgs(tweet, json) { MatchingTracks = detectedTracks.ToArray(), };

                if (detectedTracksAndActions.Any())
                {
                    eventArgs.MatchOn = MatchOn.TweetText;

                    RaiseTweetReceived(eventArgs);
                    RaiseMatchingTweetReceived(eventArgs);
                }
                else
                {
                    RaiseTweetReceived(eventArgs);
                    RaiseNonMatchingTweetReceived(new TweetEventArgs(tweet, json));
                }
            }

            await this.streamResultGenerator.StartAsync(onJsonReceived, createTwitterRequest).ConfigureAwait(false);
        }

        protected void RaiseJsonObjectReceived(string json)
        {
            this.Raise(EventReceived, new StreamEventReceivedArgs(json));
        }

        public int TracksCount => this.streamTrackManager.TracksCount;
        public int MaxTracks => this.streamTrackManager.MaxTracks;
        public Dictionary<string, Action<ITweet>> Tracks => this.streamTrackManager.Tracks;

        public void AddTrack(string track, Action<ITweet> trackReceived = null)
        {
            if (this.streamResultGenerator.StreamState != StreamState.Stop)
            {
                throw new InvalidOperationException(Resources.TrackedStream_ModifyTracks_NotStoppedException_Description);
            }

            this.streamTrackManager.AddTrack(track, trackReceived);
        }

        public void RemoveTrack(string track)
        {
            if (this.streamResultGenerator.StreamState != StreamState.Stop)
            {
                throw new InvalidOperationException(Resources.TrackedStream_ModifyTracks_NotStoppedException_Description);
            }

            this.streamTrackManager.RemoveTrack(track);
        }

        public bool ContainsTrack(string track)
        {
            return this.streamTrackManager.ContainsTrack(track);
        }

        public void ClearTracks()
        {
            if (this.streamResultGenerator.StreamState != StreamState.Stop)
            {
                throw new InvalidOperationException(Resources.TrackedStream_ModifyTracks_NotStoppedException_Description);
            }

            this.streamTrackManager.ClearTracks();
        }

        protected void RaiseTweetReceived(MatchedTweetReceivedEventArgs eventArgs)
        {
            this.Raise(TweetReceived, eventArgs);
        }

        protected void RaiseMatchingTweetReceived(MatchedTweetReceivedEventArgs eventArgs)
        {
            this.Raise(MatchingTweetReceived, eventArgs);
        }

        protected void RaiseNonMatchingTweetReceived(TweetEventArgs eventArgs)
        {
            this.Raise(NonMatchingTweetReceived, eventArgs);
        }
    }
}
