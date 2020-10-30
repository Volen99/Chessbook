import {ITwitterStream} from "../core/Core/Streaming/ITwitterStream";
import {IStreamResultGenerator} from "../core/Core/Streaming/IStreamResultGenerator";
import List from '../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/List';
import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {Action} from "../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
import {ICustomRequestParameters} from "../core/Public/Parameters/CustomRequestParameters";
import {ITwitterExecutionContext} from "../core/Core/Client/TwitterExecutionContext";
import { TweetMode } from '../core/Public/Settings/SharebookSettings';
import {StreamState} from "../core/Public/Streaming/StreamState";
import InvalidOperationException from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {StreamFilterLevel} from "../core/Public/Streaming/Parameters/StreamFilterLevel";
import {DisconnectMessage} from "./Model/DisconnectMessage";
import {TweetLocationRemovedInfo} from "./Model/TweetLocationRemovedInfo";
import {TweetWitheldInfo} from "./Model/TweetWitheldInfo";
import {UserWitheldInfo} from "./Model/UserWitheldInfo";

export abstract class TwitterStream implements ITwitterStream
    {
        protected _streamResultGenerator: IStreamResultGenerator
        private readonly _jsonObjectConverter: IJsonObjectConverter;
        private readonly _jObjectWrapper: IJObjectStaticWrapper;
        private readonly _customRequestParameters: ICustomRequestParameters;

        private readonly _filteredLanguages: List<string>;
        private readonly _streamEventsActions: Dictionary<string, Action<JToken>>;

        protected constructor(
          streamResultGenerator: IStreamResultGenerator,
          jsonObjectConverter: IJsonObjectConverter,
          jObjectWrapper: IJObjectStaticWrapper,
          customRequestParameters: ICustomRequestParameters)
        {
            this._streamResultGenerator = streamResultGenerator;
            this._jsonObjectConverter = jsonObjectConverter;
            this._jObjectWrapper = jObjectWrapper;
            this._customRequestParameters = customRequestParameters;

            this._streamEventsActions = new Dictionary<string, Action<JToken>>();
            this._filteredLanguages = new List<string>();

            StallWarnings = true;

            InitializeStreamEventsActions();
        }

        public ExecutionContext: ITwitterExecutionContext

        private _tweetMode?: TweetMode;

        get TweetMode(): TweetMode {
          return this._tweetMode;
        }

      set TweetMode(value: TweetMode): TweetMode {
        if (StreamState !== StreamState.Stop) {
          throw new InvalidOperationException("TweetMode cannot be changed while the stream is running.");
        }

        this._tweetMode = value;
      }

        private  InitializeStreamEventsActions(): void
        {
            this._streamEventsActions.Add("delete", TryRaiseTweetDeleted);
            this._streamEventsActions.Add("scrub_geo", TryRaiseTweetLocationRemoved);
            this._streamEventsActions.Add("disconnect", TryRaiseDisconnectMessageReceived);
            this._streamEventsActions.Add("limit", TryRaiseLimitReached);
            this._streamEventsActions.Add("status_withheld", TryRaiseTweetWitheld);
            this._streamEventsActions.Add("user_withheld", TryRaiseUserWitheld);
            this._streamEventsActions.Add("warning", TryRaiseWarning);
        }

        public event EventHandler StreamStarted
        {
            add => _streamResultGenerator.StreamStarted += value;
            remove => _streamResultGenerator.StreamStarted -= value;
        }

        public event EventHandler StreamResumed
        {
            add => _streamResultGenerator.StreamResumed += value;
            remove => _streamResultGenerator.StreamResumed -= value;
        }

        public event EventHandler StreamPaused
        {
            add => _streamResultGenerator.StreamPaused += value;
            remove => _streamResultGenerator.StreamPaused -= value;
        }

        public event EventHandler<StreamStoppedEventArgs> StreamStopped
        {
            add => _streamResultGenerator.StreamStopped += value;
            remove => _streamResultGenerator.StreamStopped -= value;
        }

        public event EventHandler KeepAliveReceived
        {
            add => _streamResultGenerator.KeepAliveReceived += value;
            remove => _streamResultGenerator.KeepAliveReceived -= value;
        }

        public event EventHandler<TweetDeletedEvent> TweetDeleted;
        public event EventHandler<TweetLocationDeletedEventArgs> TweetLocationInfoRemoved;
        public event EventHandler<DisconnectedEventArgs> DisconnectMessageReceived;
        public event EventHandler<TweetWitheldEventArgs> TweetWitheld;
        public event EventHandler<UserWitheldEventArgs> UserWitheld;

        public event EventHandler<LimitReachedEventArgs> LimitReached;
        public event EventHandler<WarningFallingBehindEventArgs> WarningFallingBehindDetected;
        public event EventHandler<UnsupportedMessageReceivedEvent> UnmanagedEventReceived;
        public abstract event EventHandler<StreamEventReceivedArgs> EventReceived;

        // Stream State
        get StreamState(): StreamState {
          return this._streamResultGenerator.StreamState;
        }

        public  Resume(): void
        {
            _streamResultGenerator.ResumeStream();
        }

        public  Pause(): void
        {
            _streamResultGenerator.PauseStream();
        }

        public  Stop(): void
        {
            _streamResultGenerator.StopStream();
        }

        protected  StopStream(ex: Exception): void
        {
            _streamResultGenerator.StopStream(ex, null);
        }

        // Parameters
        protected  AddBaseParametersToQuery(queryBuilder: StringBuilder): void
        {
            if (_filteredLanguages.Any())
            {
                var languages = string.Join(", ", _filteredLanguages.Select(x => x.ToLowerInvariant()));
                queryBuilder.AddParameterToQuery("language", languages);
            }

            queryBuilder.AddParameterToQuery("stall_warnings", StallWarnings);

            if (FilterLevel != StreamFilterLevel.None)
            {
                queryBuilder.AddParameterToQuery("filter_level", FilterLevel?.ToString().ToLowerInvariant());
            }

            queryBuilder.AddParameterToQuery("tweet_mode", TweetMode.ToString().ToLowerInvariant());
            queryBuilder.AddFormattedParameterToQuery(_customRequestParameters.FormattedCustomQueryParameters);
        }

        get LanguageFilters(): string[] {
          return this._filteredLanguages.ToArray()
        }

        public  AddLanguageFilter(language: string): void
        {
            if (!_filteredLanguages.Contains(language))
            {
                _filteredLanguages.Add(language);
            }
        }

        public  AddLanguageFilter(language: LanguageFilter): void
        {
            AddLanguageFilter(language.GetLanguageCode());
        }

        public  RemoveLanguageFilter(language: string): void
        {
            _filteredLanguages.Remove(language);
        }

        public  RemoveLanguageFilter(language: LanguageFilter): void
        {
            RemoveLanguageFilter(language.GetLanguageCode());
        }

        public  ClearLanguageFilters(): void
        {
            _filteredLanguages.Clear();
        }

        public  StallWarnings?: boolean

        public FilterLevel?: StreamFilterLevel;

        // #region Custom Query Parameters

        get CustomQueryParameters(): List<Tuple<string, string>> {
          return this._customRequestParameters.CustomQueryParameters;
        }

        get FormattedCustomQueryParameters(): string {
          return _customRequestParameters.FormattedCustomQueryParameters;
        }

        public  AddCustomQueryParameter(name: string, value: string): void
        {
            _customRequestParameters.AddCustomQueryParameter(name, value);
        }

        public  ClearCustomQueryParameters(): void
        {
            _customRequestParameters.ClearCustomQueryParameters();
        }

        // #endregion

        // Events
        protected  TryInvokeGlobalStreamMessages(json: string): void
        {
            if (string.IsNullOrEmpty(json))
            {
                return;
            }

            var jsonObject = _jObjectWrapper.GetJobjectFromJson(json);
            var jsonRootToken = jsonObject.Children().First();
            var messageType = _jObjectWrapper.GetNodeRootName(jsonRootToken);

            if (_streamEventsActions.ContainsKey(messageType))
            {
                var messageInfo = jsonObject[messageType];
                _streamEventsActions[messageType].Invoke(messageInfo);
            }
            else
            {
                var unmanagedMessageEventArgs = new UnsupportedMessageReceivedEvent(json);
                this.Raise(UnmanagedEventReceived, unmanagedMessageEventArgs);
            }
        }

        protected  IsEvent(json: string): boolean
        {
            if (string.IsNullOrEmpty(json))
            {
                return false;
            }

            var jsonObject = _jObjectWrapper.GetJobjectFromJson(json);
            var jsonRootChildren = jsonObject.Children().ToArray();

            return jsonRootChildren.Length <= 1;
        }

        private  TryRaiseTweetDeleted(jToken: JToken): void
        {
            jToken = jToken["status"];
            if (jToken == null)
            {
                return;
            }

            var deletedTweetInfo = _jsonObjectConverter.Deserialize<TweetDeletedInfo>(jToken.ToString());
            var deletedTweetEventArgs = new TweetDeletedEvent(new AccountActivityEvent<long>(deletedTweetInfo.Id)
            {
            }, deletedTweetInfo.UserId);
            // var deletedTweetEventArgs = new TweetDeletedEvent()
            // {
            //     TweetId = deletedTweetInfo.Id,
            //     UserId = deletedTweetInfo.UserId
            // };

            this.Raise(TweetDeleted, deletedTweetEventArgs);
        }

        private  TryRaiseTweetLocationRemoved(jToken: JToken): void
        {
            var tweetLocationDeleted = _jsonObjectConverter.Deserialize<TweetLocationRemovedInfo>(jToken.ToString());
            var tweetLocationDeletedEventArgs = new TweetLocationDeletedEventArgs(tweetLocationDeleted);
            this.Raise(TweetLocationInfoRemoved, tweetLocationDeletedEventArgs);
        }

        private  TryRaiseDisconnectMessageReceived(jToken: JToken): void
        {
            var disconnectMessage = _jsonObjectConverter.Deserialize<DisconnectMessage>(jToken.ToString());
            var disconnectMessageEventArgs = new DisconnectedEventArgs(disconnectMessage);
            this.Raise(DisconnectMessageReceived, disconnectMessageEventArgs);
            _streamResultGenerator.StopStream(null, disconnectMessage);
        }

        private  TryRaiseLimitReached(jToken: JToken): void
        {
            var nbTweetsMissed = jToken.Value<int>("track");
            this.Raise(LimitReached, new LimitReachedEventArgs(nbTweetsMissed));
        }

        private  TryRaiseTweetWitheld(jToken: JToken): void
        {
            var info = _jsonObjectConverter.Deserialize<TweetWitheldInfo>(jToken.ToString());
            var eventArgs = new TweetWitheldEventArgs(info);
            this.Raise(TweetWitheld, eventArgs);
        }

        private  TryRaiseUserWitheld(jToken: JToken): void
        {
            var info = _jsonObjectConverter.Deserialize<UserWitheldInfo>(jToken.ToString());
            var eventArgs = new UserWitheldEventArgs(info);
            this.Raise(UserWitheld, eventArgs);
        }

        private  TryRaiseWarning(jToken: JToken): void
        {
            TryRaiseFallingBehindWarning(jToken);
        }

        private  TryRaiseFallingBehindWarning(jsonWarning: JToken): void
        {
            if (jsonWarning["percent_full"] != null)
            {
                var warningMessage = _jsonObjectConverter.Deserialize<WarningMessageFallingBehind>(jsonWarning.ToString());
                this.Raise(WarningFallingBehindDetected, new WarningFallingBehindEventArgs(warningMessage));
            }
        }
    }
