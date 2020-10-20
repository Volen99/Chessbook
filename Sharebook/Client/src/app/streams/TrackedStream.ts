import {ITrackedStream} from "../core/Core/Streaming/ITrackedStream";
import {ITweet} from "../core/Public/Models/Interfaces/ITweet";
import {ITwitterClient} from "../core/Public/ITwitterClient";
import {ITwitterClientFactories} from "../core/Public/Client/Tools/ITwitterClientFactories";
import {ICreateTrackedTweetStreamParameters} from "../core/Public/Parameters/StreamsClient/CreateTrackedStreamParameters";
import {IStreamResultGenerator} from "../core/Core/Streaming/IStreamResultGenerator";
import {IStreamTrackManager} from "../core/Core/Streaming/IStreamTrackManager";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import StringBuilder from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {HttpMethod} from "../core/Public/Models/Enum/HttpMethod";
import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {StreamResources} from "./Properties/stream-resources";
import InvalidOperationException from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {StreamState} from "../core/Public/Streaming/StreamState";
import {Action} from "../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";

export class TrackedStream extends TwitterStream implements ITrackedStream {
  public event EventHandler<MatchedTweetReceivedEventArgs> TweetReceived;
  public event EventHandler<MatchedTweetReceivedEventArgs> MatchingTweetReceived;
  public event EventHandler<TweetEventArgs> NonMatchingTweetReceived;

  private readonly _client: ITwitterClient;
  private readonly _streamTrackManager: IStreamTrackManager<ITweet>;
  private readonly _factories: ITwitterClientFactories;

  public override event EventHandler<StreamEventReceivedArgs> EventReceived;

  constructor(
    client: ITwitterClient,
    streamTrackManager: IStreamTrackManager<ITweet>,
    jsonObjectConverter: IJsonObjectConverter,
    jObjectStaticWrapper: IJObjectStaticWrapper,
    streamResultGenerator: IStreamResultGenerator,
    factories: ITwitterClientFactories,
    createTrackedTweetStreamParameters: ICreateTrackedTweetStreamParameters) {
    super(streamResultGenerator, jsonObjectConverter, jObjectStaticWrapper, createTrackedTweetStreamParameters);
    this._client = client;
    this._streamTrackManager = streamTrackManager;
    this._factories = factories;
  }

        public async  StartAsync(url: string): Promise<void>
        {
            ITwitterRequest createTwitterRequest()
            {
              let queryBuilder = new StringBuilder(url);
                AddBaseParametersToQuery(queryBuilder);

                let request = this._client.createRequest();
                request.query.url = queryBuilder.toString();
                request.query.httpMethod = HttpMethod.GET;
                return request;
            }

             onJsonReceived(json: string): void
            {
                RaiseJsonObjectReceived(json);

                if (IsEvent(json))
                {
                    TryInvokeGlobalStreamMessages(json);
                    return;
                }

                var tweet = _factories.CreateTweet(json);

                var detectedTracksAndActions = _streamTrackManager.GetMatchingTracksAndActions(tweet.FullText);
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

            await _streamResultGenerator.StartAsync(onJsonReceived, createTwitterRequest).ConfigureAwait(false);
        }

        protected  RaiseJsonObjectReceived(json: string): void
        {
            this.Raise(EventReceived, new StreamEventReceivedArgs(json));
        }


  get TracksCount(): number {
    return this._streamTrackManager.TracksCount;
  }

  get MaxTracks(): number {
    return this._streamTrackManager.MaxTracks;
  }

  get Tracks(): Dictionary<string, Action<ITweet>> {
    return this._streamTrackManager.Tracks;
  }

        public  AddTrack(track: string, trackReceived: Action<ITweet> = null): void
        {
            if (_streamResultGenerator.StreamState != StreamState.Stop)
            {
                throw new InvalidOperationException(Resources.TrackedStream_ModifyTracks_NotStoppedException_Description);
            }

            _streamTrackManager.AddTrack(track, trackReceived);
        }

        public  RemoveTrack(track: string): void
        {
            if (_streamResultGenerator.StreamState != StreamState.Stop)
            {
                throw new InvalidOperationException(StreamResources.TrackedStream_ModifyTracks_NotStoppedException_Description);
            }

            _streamTrackManager.RemoveTrack(track);
        }

        public  ContainsTrack(track: string): boolean
        {
            return _streamTrackManager.ContainsTrack(track);
        }

        public  ClearTracks(): void
        {
            if (_streamResultGenerator.StreamState != StreamState.Stop)
            {
                throw new InvalidOperationException(StreamResources.TrackedStream_ModifyTracks_NotStoppedException_Description);
            }

            _streamTrackManager.ClearTracks();
        }

        protected  RaiseTweetReceived(eventArgs: MatchedTweetReceivedEventArgs): void
        {
            this.Raise(TweetReceived, eventArgs);
        }

        protected  RaiseMatchingTweetReceived(eventArgs: MatchedTweetReceivedEventArgs): void
        {
            this.Raise(MatchingTweetReceived, eventArgs);
        }

        protected  RaiseNonMatchingTweetReceived(eventArgs: TweetEventArgs): void
        {
            this.Raise(NonMatchingTweetReceived, eventArgs);
        }
    }
}
