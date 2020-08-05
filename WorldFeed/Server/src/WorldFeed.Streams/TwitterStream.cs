namespace WorldFeed.Streams
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Newtonsoft.Json.Linq;

    using WorldFeed.Common.Client.Interfaces;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Events.AccountActivity;
    using WorldFeed.Common.Public.Events.Stream;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Public.Streaming.Enums;
    using WorldFeed.Common.Public.Streaming.Parameters;
    using WorldFeed.Common.Settings;
    using WorldFeed.Common.Streaming;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Streams.Model;

    public abstract class TwitterStream : ITwitterStream
    {
        protected IStreamResultGenerator streamResultGenerator { get; }
        private readonly IJsonObjectConverter jsonObjectConverter;
        private readonly IJObjectStaticWrapper jObjectWrapper;
        private readonly ICustomRequestParameters customRequestParameters;

        private readonly List<string> filteredLanguages;
        private readonly Dictionary<string, Action<JToken>> streamEventsActions;

        protected TwitterStream(
            IStreamResultGenerator streamResultGenerator,
            IJsonObjectConverter jsonObjectConverter,
            IJObjectStaticWrapper jObjectWrapper,
            ICustomRequestParameters customRequestParameters)
        {
            this.streamResultGenerator = streamResultGenerator;
            this.jsonObjectConverter = jsonObjectConverter;
            this.jObjectWrapper = jObjectWrapper;
            this.customRequestParameters = customRequestParameters;

            this.streamEventsActions = new Dictionary<string, Action<JToken>>();
            this.filteredLanguages = new List<string>();

            StallWarnings = true;

            InitializeStreamEventsActions();
        }

        public ITwitterExecutionContext ExecutionContext { get; set; }

        private TweetMode? tweetMode;

        public TweetMode? TweetMode
        {
            get => this.tweetMode;
            set
            {
                if (StreamState != StreamState.Stop)
                {
                    throw new InvalidOperationException("TweetMode cannot be changed while the stream is running.");
                }

                this.tweetMode = value;
            }
        }

        private void InitializeStreamEventsActions()
        {
            this.streamEventsActions.Add("delete", TryRaiseTweetDeleted);
            this.streamEventsActions.Add("scrub_geo", TryRaiseTweetLocationRemoved);
            this.streamEventsActions.Add("disconnect", TryRaiseDisconnectMessageReceived);
            this.streamEventsActions.Add("limit", TryRaiseLimitReached);
            this.streamEventsActions.Add("status_withheld", TryRaiseTweetWitheld);
            this.streamEventsActions.Add("user_withheld", TryRaiseUserWitheld);
            this.streamEventsActions.Add("warning", TryRaiseWarning);
        }

        public event EventHandler StreamStarted
        {
            add => this.streamResultGenerator.StreamStarted += value;
            remove => this.streamResultGenerator.StreamStarted -= value;
        }

        public event EventHandler StreamResumed
        {
            add => this.streamResultGenerator.StreamResumed += value;
            remove => this.streamResultGenerator.StreamResumed -= value;
        }

        public event EventHandler StreamPaused
        {
            add => this.streamResultGenerator.StreamPaused += value;
            remove => this.streamResultGenerator.StreamPaused -= value;
        }

        public event EventHandler<StreamStoppedEventArgs> StreamStopped
        {
            add => this.streamResultGenerator.StreamStopped += value;
            remove => this.streamResultGenerator.StreamStopped -= value;
        }

        public event EventHandler KeepAliveReceived
        {
            add => this.streamResultGenerator.KeepAliveReceived += value;
            remove => this.streamResultGenerator.KeepAliveReceived -= value;
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
        public StreamState StreamState => this.streamResultGenerator.StreamState;

        public void Resume()
        {
            this.streamResultGenerator.ResumeStream();
        }

        public void Pause()
        {
            this.streamResultGenerator.PauseStream();
        }

        public void Stop()
        {
            this.streamResultGenerator.StopStream();
        }

        protected void StopStream(Exception ex)
        {
            this.streamResultGenerator.StopStream(ex, null);
        }

        // Parameters
        protected void AddBaseParametersToQuery(StringBuilder queryBuilder)
        {
            if (this.filteredLanguages.Any())
            {
                var languages = string.Join(", ", this.filteredLanguages.Select(x => x.ToLowerInvariant()));
                queryBuilder.AddParameterToQuery("language", languages);
            }

            queryBuilder.AddParameterToQuery("stall_warnings", StallWarnings);

            if (FilterLevel != StreamFilterLevel.None)
            {
                queryBuilder.AddParameterToQuery("filter_level", FilterLevel?.ToString().ToLowerInvariant());
            }

            queryBuilder.AddParameterToQuery("tweet_mode", TweetMode.ToString().ToLowerInvariant());
            queryBuilder.AddFormattedParameterToQuery(this.customRequestParameters.FormattedCustomQueryParameters);
        }

        public string[] LanguageFilters => this.filteredLanguages.ToArray();

        public void AddLanguageFilter(string language)
        {
            if (!this.filteredLanguages.Contains(language))
            {
                this.filteredLanguages.Add(language);
            }
        }

        public void AddLanguageFilter(LanguageFilter language)
        {
            AddLanguageFilter(language.GetLanguageCode());
        }

        public void RemoveLanguageFilter(string language)
        {
            this.filteredLanguages.Remove(language);
        }

        public void RemoveLanguageFilter(LanguageFilter language)
        {
            RemoveLanguageFilter(language.GetLanguageCode());
        }

        public void ClearLanguageFilters()
        {
            this.filteredLanguages.Clear();
        }

        public bool? StallWarnings { get; set; }

        public StreamFilterLevel? FilterLevel { get; set; }

        #region Custom Query Parameters

        public List<Tuple<string, string>> CustomQueryParameters => this.customRequestParameters.CustomQueryParameters;
        public string FormattedCustomQueryParameters => this.customRequestParameters.FormattedCustomQueryParameters;

        public void AddCustomQueryParameter(string name, string value)
        {
            this.customRequestParameters.AddCustomQueryParameter(name, value);
        }

        public void ClearCustomQueryParameters()
        {
            this.customRequestParameters.ClearCustomQueryParameters();
        }

        #endregion

        // Events
        protected void TryInvokeGlobalStreamMessages(string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                return;
            }

            var jsonObject = this.jObjectWrapper.GetJobjectFromJson(json);
            var jsonRootToken = jsonObject.Children().First();
            var messageType = this.jObjectWrapper.GetNodeRootName(jsonRootToken);

            if (this.streamEventsActions.ContainsKey(messageType))
            {
                var messageInfo = jsonObject[messageType];
                this.streamEventsActions[messageType].Invoke(messageInfo);
            }
            else
            {
                var unmanagedMessageEventArgs = new UnsupportedMessageReceivedEvent(json);
                this.Raise(UnmanagedEventReceived, unmanagedMessageEventArgs);
            }
        }

        protected bool IsEvent(string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                return false;
            }

            var jsonObject = this.jObjectWrapper.GetJobjectFromJson(json);
            var jsonRootChildren = jsonObject.Children().ToArray();

            return jsonRootChildren.Length <= 1;
        }

        private void TryRaiseTweetDeleted(JToken jToken)
        {
            jToken = jToken["status"];
            if (jToken == null)
            {
                return;
            }

            var deletedTweetInfo = this.jsonObjectConverter.Deserialize<TweetDeletedInfo>(jToken.ToString());
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

        private void TryRaiseTweetLocationRemoved(JToken jToken)
        {
            var tweetLocationDeleted = this.jsonObjectConverter.Deserialize<TweetLocationRemovedInfo>(jToken.ToString());
            var tweetLocationDeletedEventArgs = new TweetLocationDeletedEventArgs(tweetLocationDeleted);
            this.Raise(TweetLocationInfoRemoved, tweetLocationDeletedEventArgs);
        }

        private void TryRaiseDisconnectMessageReceived(JToken jToken)
        {
            var disconnectMessage = this.jsonObjectConverter.Deserialize<DisconnectMessage>(jToken.ToString());
            var disconnectMessageEventArgs = new DisconnectedEventArgs(disconnectMessage);
            this.Raise(DisconnectMessageReceived, disconnectMessageEventArgs);
            this.streamResultGenerator.StopStream(null, disconnectMessage);
        }

        private void TryRaiseLimitReached(JToken jToken)
        {
            var nbTweetsMissed = jToken.Value<int>("track");
            this.Raise(LimitReached, new LimitReachedEventArgs(nbTweetsMissed));
        }

        private void TryRaiseTweetWitheld(JToken jToken)
        {
            var info = this.jsonObjectConverter.Deserialize<TweetWitheldInfo>(jToken.ToString());
            var eventArgs = new TweetWitheldEventArgs(info);
            this.Raise(TweetWitheld, eventArgs);
        }

        private void TryRaiseUserWitheld(JToken jToken)
        {
            var info = this.jsonObjectConverter.Deserialize<UserWitheldInfo>(jToken.ToString());
            var eventArgs = new UserWitheldEventArgs(info);
            this.Raise(UserWitheld, eventArgs);
        }

        private void TryRaiseWarning(JToken jToken)
        {
            TryRaiseFallingBehindWarning(jToken);
        }

        private void TryRaiseFallingBehindWarning(JToken jsonWarning)
        {
            if (jsonWarning["percent_full"] != null)
            {
                var warningMessage = this.jsonObjectConverter.Deserialize<WarningMessageFallingBehind>(jsonWarning.ToString());
                this.Raise(WarningFallingBehindDetected, new WarningFallingBehindEventArgs(warningMessage));
            }
        }
    }
}
