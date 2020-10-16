
    // ReSharper disable once ClassNeverInstantiated.Global
    import {IAccountActivityStream} from "../core/Public/Streaming/IAccountActivityStream";
    import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
    import {Action} from "../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
    import {ITwitterClientFactories} from "../core/Public/Client/Tools/ITwitterClientFactories";
    import {IWebhookMessage} from "../core/Public/Models/Webhooks/WebhookMessage";
    import {ITweetDTO} from "../core/Public/Models/Interfaces/DTO/ITweetDTO";
    import {ITweet} from "../core/Public/Models/Interfaces/ITweet";
    import {AccountActivityTweetDeletedEventDTO} from "./Model/AccountActivity/AccountActivityTweetDeletedEventDTO";
    import {AccountActivityFavoriteEventDTO} from "./Model/AccountActivity/AccountActivityFavouriteEventDTO";
    import {ActivityStreamUserRevokedAppPermissionsDTO} from "./Model/AccountActivity/ActivityStreamUserRevokedAppPermissionsDTO";
    import {AccountActivityMessageCreatedEventDTO} from "./Model/AccountActivity/AccountActivityMessageCreatedEventDTO";
    import {App} from "../core/Core/Models/Properties/App";
    import {IMessage} from "../core/Public/Models/Interfaces/IMessage";
    import {AccountActivityUserIsTypingMessageDTO} from "./Model/AccountActivity/AccountActivityUserIsTypingMessageDTO";
    import {AccountActivityUserReadMessageConversationDTO} from "./Model/AccountActivity/AccountActivityUserReadMessageConversationDTO";

    export class AccountActivityStream implements IAccountActivityStream
    {
        private readonly _jObjectWrapper: IJObjectStaticWrapper;
        private readonly _jsonObjectConverter: IJsonObjectConverter;
        private readonly _factories: ITwitterClientFactories;

        private readonly _events: Dictionary<string, Action<string, JObject>>;

        constructor(jObjectWrapper: IJObjectStaticWrapper, jsonObjectConverter: IJsonObjectConverter,
                    factories: ITwitterClientFactories)
        {
            this._jObjectWrapper = jObjectWrapper;
            this._jsonObjectConverter = jsonObjectConverter;
            this._factories = factories;
            this._events = new Dictionary<string, Action<string, JObject>>();

            this.InitializeEvents();
        }

        private  InitializeEvents(): void
        {
            // Tweets
            this._events.Add("tweet_create_events", TryRaiseTweetCreatedEvents);
            this._events.Add("tweet_delete_events", TryRaiseTweetDeletedEvents);
            this._events.Add("favorite_events", TryRaiseTweetFavoritedEvents);

            this.// User
            this._events.Add("follow_events", TryRaiseFollowedEvents);
            this._events.Add("block_events", TryRaiseUserBlockedEvents);
            this._events.Add("mute_events", TryRaiseUserMutedEvents);

            // App
            this._events.Add("user_event", TryRaiseUserEvent);

            // Messages
            this._events.Add("direct_message_events", TryRaiseMessageEvent);
            this._events.Add("direct_message_indicate_typing_events", TryRaiseIndicateUserIsTypingMessage);
            this._events.Add("direct_message_mark_read_events", TryRaiseMessageReadEvent);
        }

        public AccountUserId: number;

        // Tweets
        public TweetCreated: EventHandler<TweetCreatedEvent>
        public TweetFavorited: EventHandler<TweetFavoritedEvent>
        public TweetDeleted: EventHandler<TweetDeletedEvent>

        // User Events
        public UserFollowed: EventHandler<UserFollowedEvent>
        public UserUnfollowed: EventHandler<UserUnfollowedEvent>

        public UserBlocked: EventHandler<UserBlockedEvent>
        public UserUnblocked: EventHandler<UserUnblockedEvent>
        public UserMuted: EventHandler<UserMutedEvent>
        public UserUnmuted: EventHandler<UserUnmutedEvent>
        public UserRevokedAppPermissions: EventHandler<UserRevokedAppPermissionsEvent>

        // Messages
        public MessageReceived: EventHandler<MessageReceivedEvent>
        public MessageSent: EventHandler<MessageSentEvent>
        public UserIsTypingMessage: EventHandler<UserIsTypingMessageEvent>
        public UserReadMessageConversation: EventHandler<UserReadMessageConversationEvent>

        // Others
        public UnsupportedEventReceived: EventHandler<UnsupportedMessageReceivedEvent>
        public EventKnownButNotFullySupportedReceived: EventHandler<EventKnownButNotSupported>
        public EventReceived: EventHandler<AccountActivityEvent>
        public UnexpectedExceptionThrown: EventHandler<UnexpectedExceptionThrownEvent>

        public  WebhookMessageReceived(message: IWebhookMessage): void
        {
            if (message == null)
            {
                return;
            }

            try
            {
                let json = message.json;
                let jsonObjectEvent = this._jObjectWrapper.GetJobjectFromJson(json);

                let jsonEventChildren = jsonObjectEvent.Children().ToArray();
                let keys = jsonEventChildren.Where(x => x.Path.EndsWith("event") || x.Path.EndsWith("events"));
                let key = keys.SingleOrDefault();

                if (key == null)
                {
                    return;
                }

                this.Raise(EventReceived, new AccountActivityEvent
                {
                    Json = json,
                    AccountUserId = AccountUserId
                });

                var eventName = key.Path;
                if (_events.ContainsKey(eventName))
                {
                    _events[eventName].Invoke(eventName, jsonObjectEvent);
                }
                else
                {
                    this.Raise(UnsupportedEventReceived, new UnsupportedMessageReceivedEvent(json));
                }
            }
            catch (Exception e)
            {
                this.Raise(UnexpectedExceptionThrown, new UnexpectedExceptionThrownEvent(e));
            }
        }

        private  TryRaiseTweetCreatedEvents(eventName: string, jsonObjectEvent: JObject): void
        {
            let json = jsonObjectEvent.ToString();
            let tweetCreatedEvent = jsonObjectEvent[eventName];
            let tweetCreatedEventJson = tweetCreatedEvent.ToString();
            let tweetDTOs = _jsonObjectConverter.Deserialize<ITweetDTO[]>(tweetCreatedEventJson);

            tweetDTOs.ForEach(tweetDTO =>
            {
                var tweet = _factories.CreateTweet(tweetDTO);

                var accountActivityEvent = new AccountActivityEvent<ITweet>(tweet)
                {
                    AccountUserId = AccountUserId,
                    EventDate = tweet.CreatedAt,
                    Json = json
                };

                var eventArgs = new TweetCreatedEvent(accountActivityEvent);
                this.Raise(TweetCreated, eventArgs);

                if (eventArgs.InResultOf == TweetCreatedRaisedInResultOf.Unknown)
                {
                    this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                }
            });
        }

        private  TryRaiseTweetDeletedEvents(eventName: string, jsonObjectEvent: JObject): void
        {
            let json = jsonObjectEvent.ToString();
            let tweetDeletedEventJToken = jsonObjectEvent[eventName];
            let tweetDeletedEventDTOs = tweetDeletedEventJToken.ToObject<AccountActivityTweetDeletedEventDTO[]>();

            tweetDeletedEventDTOs.ForEach(tweetDeletedEventDTO =>
            {
                let dateOffset = DateTimeOffset.FromUnixTimeMilliseconds(tweetDeletedEventDTO.Timestamp);

                var accountActivityEvent = new AccountActivityEvent<long>(tweetDeletedEventDTO.Status.TweetId)
                {
                    AccountUserId = AccountUserId,
                    EventDate = dateOffset.UtcDateTime,
                    Json = json
                };

                let eventArgs = new TweetDeletedEvent(accountActivityEvent, tweetDeletedEventDTO.Status.UserId);

                this.Raise(TweetDeleted, eventArgs);
            });
        }

        private  TryRaiseTweetFavoritedEvents(eventName: string, jsonObjectEvent: JObject): void
        {
            let json = jsonObjectEvent.ToString();
            let favoriteTweetEvent = jsonObjectEvent[eventName];
            let FavoritedTweetEventJson = favoriteTweetEvent.ToString();
            let favoriteEventDTOs = _jsonObjectConverter.Deserialize<AccountActivityFavoriteEventDTO[]>(FavoritedTweetEventJson);

            favoriteEventDTOs.ForEach(favoriteEventDTO =>
            {
                let tweet = _factories.CreateTweet(favoriteEventDTO.FavoritedTweet);
                let user = _factories.CreateUser(favoriteEventDTO.User);

                var accountActivityEvent = new AccountActivityEvent<Tuple<ITweet, IUser>>(new Tuple<ITweet, IUser>(tweet, user))
                {
                    AccountUserId = AccountUserId,
                    EventDate = tweet.CreatedAt,
                    Json = json
                };

                var eventArgs = new TweetFavoritedEvent(accountActivityEvent);

                this.Raise(TweetFavorited, eventArgs);

                if (eventArgs.InResultOf == TweetFavoritedRaisedInResultOf.Unknown)
                {
                    this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                }
            });
        }

        private  TryRaiseFollowedEvents(eventName: string, jsonObjectEvent: JObject): void
        {
            let json = jsonObjectEvent.ToString();
            let followEvent = jsonObjectEvent[eventName];
            let followedUsersEvents = ExtractUserToUserEventDTOs(followEvent);

            followedUsersEvents.ForEach(followedUsersEvent =>
            {
                var sourceUser = _factories.CreateUser(followedUsersEvent.Source);
                var targetUser = _factories.CreateUser(followedUsersEvent.Target);

                var timestamp = long.Parse(followedUsersEvent.CreatedTimestamp);
                var dateOffset = DateTimeOffset.FromUnixTimeMilliseconds(timestamp);

                var accountActivityEvent = new AccountActivityEvent<Tuple<IUser, IUser>>(new Tuple<IUser, IUser>(sourceUser, targetUser))
                {
                    AccountUserId = AccountUserId,
                    EventDate = dateOffset.UtcDateTime,
                    Json = json
                };

                if (followedUsersEvent.Type == "follow")
                {
                    var eventArgs = new UserFollowedEvent(accountActivityEvent);

                    this.Raise(UserFollowed, eventArgs);

                    if (eventArgs.InResultOf == UserFollowedRaisedInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else if (followedUsersEvent.Type == "unfollow")
                {
                    var eventArgs = new UserUnfollowedEvent(accountActivityEvent);

                    this.Raise(UserUnfollowed, eventArgs);

                    if (eventArgs.InResultOf == UserUnfollowedRaisedInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else
                {
                    this.Raise(UnsupportedEventReceived, new UnsupportedMessageReceivedEvent(jsonObjectEvent.ToString()));
                }
            });
        }

        private  TryRaiseUserBlockedEvents(eventName: string, jsonObjectEvent: JObject): void
        {
            let json = jsonObjectEvent.ToString();
            let userBlockedEvent = jsonObjectEvent[eventName];
            let blockedEventInfos = ExtractUserToUserEventDTOs(userBlockedEvent);

            blockedEventInfos.ForEach(blockedEventInfo =>
            {
                let sourceUser = _factories.CreateUser(blockedEventInfo.Source);
                let targetUser = _factories.CreateUser(blockedEventInfo.Target);

                let timestamp = long.Parse(blockedEventInfo.CreatedTimestamp);
                let dateOffset = DateTimeOffset.FromUnixTimeMilliseconds(timestamp);

                var accountActivityEvent = new AccountActivityEvent<Tuple<IUser, IUser>>(new Tuple<IUser, IUser>(sourceUser, targetUser))
                {
                    AccountUserId = AccountUserId,
                    EventDate = dateOffset.UtcDateTime,
                    Json = json
                };

                if (blockedEventInfo.Type == "block")
                {
                    var eventArgs = new UserBlockedEvent(accountActivityEvent);

                    this.Raise(UserBlocked, eventArgs);

                    if (eventArgs.InResultOf == UserBlockedRaisedInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else if (blockedEventInfo.Type == "unblock")
                {
                    var eventArgs = new UserUnblockedEvent(accountActivityEvent);

                    this.Raise(UserUnblocked, eventArgs);

                    if (eventArgs.InResultOf == UserUnblockedRaisedInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else
                {
                    this.Raise(UnsupportedEventReceived, new UnsupportedMessageReceivedEvent(json));
                }
            });
        }

        private  TryRaiseUserMutedEvents(eventName: string, jsonObjectEvent: JObject): void
        {
            var json = jsonObjectEvent.ToString();
            var userMutedEvent = jsonObjectEvent[eventName];
            var mutedEventInfos = ExtractUserToUserEventDTOs(userMutedEvent);

            mutedEventInfos.ForEach(mutedEventInfo =>
            {
                var sourceUser = _factories.CreateUser(mutedEventInfo.Source);
                var targetUser = _factories.CreateUser(mutedEventInfo.Target);

                var timestamp = long.Parse(mutedEventInfo.CreatedTimestamp);
                var dateOffset = DateTimeOffset.FromUnixTimeMilliseconds(timestamp);

                var accountActivityEvent = new AccountActivityEvent<Tuple<IUser, IUser>>(new Tuple<IUser, IUser>(sourceUser, targetUser))
                {
                    AccountUserId = AccountUserId,
                    EventDate = dateOffset.UtcDateTime,
                    Json = json
                };

                if (mutedEventInfo.Type == "mute")
                {
                    var eventArgs = new UserMutedEvent(accountActivityEvent);
                    this.Raise(UserMuted, eventArgs);

                    if (eventArgs.InResultOf == UserMutedRaisedInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else if (mutedEventInfo.Type == "unmute")
                {
                    var eventArgs = new UserUnmutedEvent(accountActivityEvent);
                    this.Raise(UserUnmuted, eventArgs);

                    if (eventArgs.InResultOf == UserUnmutedRaisedInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else
                {
                    this.Raise(UnsupportedEventReceived, new UnsupportedMessageReceivedEvent(jsonObjectEvent.ToString()));
                }
            });
        }

        private  TryRaiseUserEvent(eventName: string, jsonObjectEvent: JObject): void
        {
            var json = jsonObjectEvent.ToString();
            var userEvent = jsonObjectEvent[eventName];
            var eventType = userEvent.Children().First().Path;

            if (eventType == "user_event.revoke")
            {
                var userRevokedAppEventDTO = userEvent["revoke"].ToObject<ActivityStreamUserRevokedAppPermissionsDTO>();

                var accountActivityEvent = new AccountActivityEvent()
                {
                    AccountUserId = AccountUserId,
                    EventDate = userRevokedAppEventDTO.DateTime.ToUniversalTime(),
                    Json = json
                };

                var userId = userRevokedAppEventDTO.Source.UserId;
                var appId = userRevokedAppEventDTO.Target.AppId;

                var userRevokedAppEventArgs = new UserRevokedAppPermissionsEvent(accountActivityEvent, userId, appId);

                this.Raise(UserRevokedAppPermissions, userRevokedAppEventArgs);

                if (userRevokedAppEventArgs.InResultOf == UserRevokedAppPermissionsInResultOf.Unknown)
                {
                    this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, userRevokedAppEventArgs));
                }
            }
            else
            {
                this.Raise(UnsupportedEventReceived, new UnsupportedMessageReceivedEvent(jsonObjectEvent.ToString()));
            }
        }

        private  TryRaiseMessageEvent(eventName: string, jsonObjectEvent: JObject): void
        {
            var json = jsonObjectEvent.ToString();
            var eventInfo = _jsonObjectConverter.Deserialize<AccountActivityMessageCreatedEventDTO>(json);

            eventInfo.MessageEvents.ForEach(messageEventDTO =>
            {
                App app = null;

                if (messageEventDTO.MessageCreate.SourceAppId != null)
                {
                    eventInfo.Apps?.TryGetValue(messageEventDTO.MessageCreate.SourceAppId.ToString(), out app);
                }

                eventInfo.UsersById.TryGetValue(messageEventDTO.MessageCreate.SenderId.ToString(), out var senderDTO);
                eventInfo.UsersById.TryGetValue(messageEventDTO.MessageCreate.Target.RecipientId.ToString(), out var recipientDTO);

                var sender = _factories.CreateUser(senderDTO);
                var recipient = _factories.CreateUser(recipientDTO);

                var message = _factories.CreateMessage(messageEventDTO, app);

                var accountActivityEvent = new AccountActivityEvent<IMessage>(message)
                {
                    AccountUserId = AccountUserId,
                    EventDate = message.CreatedAt,
                    Json = json
                };

                if (message.SenderId == AccountUserId)
                {
                    var eventArgs = new MessageSentEvent(accountActivityEvent, message, sender, recipient, app);
                    this.Raise(MessageSent, eventArgs);

                    if (eventArgs.InResultOf == MessageSentInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else if (message.RecipientId == AccountUserId)
                {
                    var eventArgs = new MessageReceivedEvent(accountActivityEvent, message, sender, recipient, app);
                    this.Raise(MessageReceived, eventArgs);

                    if (eventArgs.InResultOf == MessageReceivedInResultOf.Unknown)
                    {
                        this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                    }
                }
                else
                {
                    this.Raise(UnsupportedEventReceived, new UnsupportedMessageReceivedEvent(jsonObjectEvent.ToString()));
                }
            });
        }

        private  TryRaiseIndicateUserIsTypingMessage(eventName: string, jsonObjectEvent: JObject): void
        {
            var json = jsonObjectEvent.ToString();
            var events = _jsonObjectConverter.Deserialize<AccountActivityUserIsTypingMessageDTO>(json);

            events.TypingEvents.ForEach(typingEvent =>
            {
                var activityEvent = new AccountActivityEvent
                {
                    AccountUserId = AccountUserId,
                    EventDate = typingEvent.CreatedAt,
                    Json = json
                };

                events.UsersById.TryGetValue(typingEvent.SenderId.ToString(), out var senderDTO);
                events.UsersById.TryGetValue(typingEvent.Target.RecipientId.ToString(), out var recipientDTO);

                var sender = _factories.CreateUser(senderDTO);
                var recipient = _factories.CreateUser(recipientDTO);

                var eventArgs = new UserIsTypingMessageEvent(activityEvent, sender, recipient);

                this.Raise(UserIsTypingMessage, eventArgs);

                if (eventArgs.InResultOf == UserIsTypingMessageInResultOf.Unknown)
                {
                    this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                }
            });
        }

        private  TryRaiseMessageReadEvent(eventName: string, jsonObjectEvent: JObject): void
        {
            var json = jsonObjectEvent.ToString();
            var events = _jsonObjectConverter.Deserialize<AccountActivityUserReadMessageConversationDTO>(json);

            events.MessageConversationReadEvents.ForEach(messageConversationReadEvent =>
            {
                var activityEvent = new AccountActivityEvent
                {
                    AccountUserId = AccountUserId,
                    EventDate = messageConversationReadEvent.CreatedAt,
                    Json = json
                };

                events.UsersById.TryGetValue(messageConversationReadEvent.SenderId.ToString(), out var senderDTO);
                events.UsersById.TryGetValue(messageConversationReadEvent.Target.RecipientId.ToString(), out var recipientDTO);

                var sender = _factories.CreateUser(senderDTO);
                var recipient = _factories.CreateUser(recipientDTO);

                var eventArgs = new UserReadMessageConversationEvent(activityEvent, sender, recipient, messageConversationReadEvent.LastReadEventId);

                this.Raise(UserReadMessageConversation, eventArgs);

                if (eventArgs.InResultOf == UserReadMessageConversationInResultOf.Unknown)
                {
                    this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                }
            });
        }

        private ExtractUserToUserEventDTOs(userToUserEvent: JToken): AccountActivityUserToUserEventDTO[]
    {
            var userToUserEventJson = userToUserEvent.ToString();
            return ExtractUserToUserEventDTOs(userToUserEventJson);
        }

        private  ExtractUserToUserEventDTOs(userToUserEventJson: string): AccountActivityUserToUserEventDTO[]
        {
            let userToUserEventDTO = _jsonObjectConverter.Deserialize<AccountActivityUserToUserEventDTO[]>(userToUserEventJson);
            return userToUserEventDTO;
        }
    }
}
