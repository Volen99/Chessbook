namespace WorldFeed.Streams
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json.Linq;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Public.Client.Tools;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Events.AccountActivity;
    using WorldFeed.Common.Public.Events.Stream;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Webhooks;
    using WorldFeed.Common.Public.Streaming;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Streams.Model.AccountActivity;

    using TweetDeletedEvent = Common.Public.Events.AccountActivity.TweetDeletedEvent;

    // ReSharper disable once ClassNeverInstantiated.Global
    public class AccountActivityStream : IAccountActivityStream
    {
        private readonly IJObjectStaticWrapper jObjectWrapper;
        private readonly IJsonObjectConverter jsonObjectConverter;
        private readonly ITwitterClientFactories factories;
        private readonly Dictionary<string, Action<string, JObject>> events;

        public AccountActivityStream(IJObjectStaticWrapper jObjectWrapper, IJsonObjectConverter jsonObjectConverter, ITwitterClientFactories factories)
        {
            this.jObjectWrapper = jObjectWrapper;
            this.jsonObjectConverter = jsonObjectConverter;
            this.factories = factories;
            this.events = new Dictionary<string, Action<string, JObject>>();

            this.InitializeEvents();
        }

        private void InitializeEvents()
        {
            // Tweets 
            // Tweet status payload when any of the following actions are taken by or to the subscription user:
            // Tweets, Retweets, Replies, @mentions, QuoteTweets, Retweet of Quote Tweets.
            this.events.Add("tweet_create_events", TryRaiseTweetCreatedEvents);
            this.events.Add("tweet_delete_events", TryRaiseTweetDeletedEvents); // Notice of deleted Tweets to make it easier to maintain compliance
            this.events.Add("favorite_events", TryRaiseTweetFavoritedEvents);   // Favorite event status with the user and target

            // User
            this.events.Add("follow_events", TryRaiseFollowedEvents); // Follow event with the user and target
            this.events.Add("block_events", TryRaiseUserBlockedEvents); // Block event with the user and target
            this.events.Add("mute_events", TryRaiseUserMutedEvents); // Mute event with the user and target

            // App
            this.events.Add("user_event", TryRaiseUserEvent); // Revoke events sent when a user removes application authorization and subscription is automatically deleted

            // Messages
            this.events.Add("direct_message_events", TryRaiseMessageEvent); // Direct message status with the user and target when a direct message is sent or received
            this.events.Add("direct_message_indicate_typing_events", TryRaiseIndicateUserIsTypingMessage); // Direct message typing event with the user and target
            this.events.Add("direct_message_mark_read_events", TryRaiseMessageReadEvent); //Direct message read event with the user and target
        }

        public long AccountUserId { get; set; }

        // Tweets
        public EventHandler<TweetCreatedEvent> TweetCreated { get; set; }
        public EventHandler<TweetFavoritedEvent> TweetFavorited { get; set; }
        public EventHandler<TweetDeletedEvent> TweetDeleted { get; set; }

        // User Events
        public EventHandler<UserFollowedEvent> UserFollowed { get; set; }
        public EventHandler<UserUnfollowedEvent> UserUnfollowed { get; set; }

        public EventHandler<UserBlockedEvent> UserBlocked { get; set; }
        public EventHandler<UserUnblockedEvent> UserUnblocked { get; set; }
        public EventHandler<UserMutedEvent> UserMuted { get; set; }
        public EventHandler<UserUnmutedEvent> UserUnmuted { get; set; }
        public EventHandler<UserRevokedAppPermissionsEvent> UserRevokedAppPermissions { get; set; }

        // Messages
        public EventHandler<MessageReceivedEvent> MessageReceived { get; set; }
        public EventHandler<MessageSentEvent> MessageSent { get; set; }
        public EventHandler<UserIsTypingMessageEvent> UserIsTypingMessage { get; set; }
        public EventHandler<UserReadMessageConversationEvent> UserReadMessageConversation { get; set; }

        // Others
        public EventHandler<UnsupportedMessageReceivedEvent> UnsupportedEventReceived { get; set; }
        public EventHandler<EventKnownButNotSupported> EventKnownButNotFullySupportedReceived { get; set; }
        public EventHandler<AccountActivityEvent> EventReceived { get; set; }
        public EventHandler<UnexpectedExceptionThrownEvent> UnexpectedExceptionThrown { get;set;}

        public void WebhookMessageReceived(IWebhookMessage message)
        {
            if (message == null)
            {
                return;
            }

            try
            {
                var json = message.Json;
                var jsonObjectEvent = this.jObjectWrapper.GetJobjectFromJson(json);

                var jsonEventChildren = jsonObjectEvent.Children().ToArray();
                var keys = jsonEventChildren.Where(x => x.Path.EndsWith("event") || x.Path.EndsWith("events"));
                var key = keys.SingleOrDefault();

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
                if (this.events.ContainsKey(eventName))
                {
                    this.events[eventName].Invoke(eventName, jsonObjectEvent);
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

        private void TryRaiseTweetCreatedEvents(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var tweetCreatedEvent = jsonObjectEvent[eventName];
            var tweetCreatedEventJson = tweetCreatedEvent.ToString();
            var tweetDTOs = this.jsonObjectConverter.Deserialize<ITweetDTO[]>(tweetCreatedEventJson);

            tweetDTOs.ForEach(tweetDTO =>
            {
                var tweet = this.factories.CreateTweet(tweetDTO);

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

        private void TryRaiseTweetDeletedEvents(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var tweetDeletedEventJToken = jsonObjectEvent[eventName];
            var tweetDeletedEventDTOs = tweetDeletedEventJToken.ToObject<AccountActivityTweetDeletedEventDTO[]>();

            tweetDeletedEventDTOs.ForEach(tweetDeletedEventDTO =>
            {
                var dateOffset = DateTimeOffset.FromUnixTimeMilliseconds(tweetDeletedEventDTO.Timestamp);

                var accountActivityEvent = new AccountActivityEvent<long>(tweetDeletedEventDTO.Status.TweetId)
                {
                    AccountUserId = AccountUserId,
                    EventDate = dateOffset.UtcDateTime,
                    Json = json
                };

                var eventArgs = new TweetDeletedEvent(accountActivityEvent, tweetDeletedEventDTO.Status.UserId);

                this.Raise(TweetDeleted, eventArgs);
            });
        }

        private void TryRaiseTweetFavoritedEvents(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var favoriteTweetEvent = jsonObjectEvent[eventName];
            var FavoritedTweetEventJson = favoriteTweetEvent.ToString();
            var favoriteEventDTOs = this.jsonObjectConverter.Deserialize<AccountActivityFavoriteEventDTO[]>(FavoritedTweetEventJson);

            favoriteEventDTOs.ForEach(favoriteEventDTO =>
            {
                var tweet = this.factories.CreateTweet(favoriteEventDTO.FavoritedTweet);
                var user = this.factories.CreateUser(favoriteEventDTO.User);

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

        private void TryRaiseFollowedEvents(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var followEvent = jsonObjectEvent[eventName];
            var followedUsersEvents = ExtractUserToUserEventDTOs(followEvent);

            followedUsersEvents.ForEach(followedUsersEvent =>
            {
                var sourceUser = this.factories.CreateUser(followedUsersEvent.Source);
                var targetUser = this.factories.CreateUser(followedUsersEvent.Target);

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

        private void TryRaiseUserBlockedEvents(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var userBlockedEvent = jsonObjectEvent[eventName];
            var blockedEventInfos = ExtractUserToUserEventDTOs(userBlockedEvent);

            blockedEventInfos.ForEach(blockedEventInfo =>
            {
                var sourceUser = this.factories.CreateUser(blockedEventInfo.Source);
                var targetUser = this.factories.CreateUser(blockedEventInfo.Target);

                var timestamp = long.Parse(blockedEventInfo.CreatedTimestamp);
                var dateOffset = DateTimeOffset.FromUnixTimeMilliseconds(timestamp);

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

        private void TryRaiseUserMutedEvents(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var userMutedEvent = jsonObjectEvent[eventName];
            var mutedEventInfos = ExtractUserToUserEventDTOs(userMutedEvent);

            mutedEventInfos.ForEach(mutedEventInfo =>
            {
                var sourceUser = this.factories.CreateUser(mutedEventInfo.Source);
                var targetUser = this.factories.CreateUser(mutedEventInfo.Target);

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

        private void TryRaiseUserEvent(string eventName, JObject jsonObjectEvent)
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

        private void TryRaiseMessageEvent(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var eventInfo = this.jsonObjectConverter.Deserialize<AccountActivityMessageCreatedEventDTO>(json);

            eventInfo.MessageEvents.ForEach(messageEventDTO =>
            {
                App app = null;

                if (messageEventDTO.MessageCreate.SourceAppId != null)
                {
                    eventInfo.Apps?.TryGetValue(messageEventDTO.MessageCreate.SourceAppId.ToString(), out app);
                }

                eventInfo.UsersById.TryGetValue(messageEventDTO.MessageCreate.SenderId.ToString(), out var senderDTO);
                eventInfo.UsersById.TryGetValue(messageEventDTO.MessageCreate.Target.RecipientId.ToString(), out var recipientDTO);

                var sender = this.factories.CreateUser(senderDTO);
                var recipient = this.factories.CreateUser(recipientDTO);

                var message = this.factories.CreateMessage(messageEventDTO, app);

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

        private void TryRaiseIndicateUserIsTypingMessage(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var events = this.jsonObjectConverter.Deserialize<AccountActivityUserIsTypingMessageDTO>(json);

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

                var sender = this.factories.CreateUser(senderDTO);
                var recipient = this.factories.CreateUser(recipientDTO);

                var eventArgs = new UserIsTypingMessageEvent(activityEvent, sender, recipient);

                this.Raise(UserIsTypingMessage, eventArgs);

                if (eventArgs.InResultOf == UserIsTypingMessageInResultOf.Unknown)
                {
                    this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                }
            });
        }

        private void TryRaiseMessageReadEvent(string eventName, JObject jsonObjectEvent)
        {
            var json = jsonObjectEvent.ToString();
            var events = this.jsonObjectConverter.Deserialize<AccountActivityUserReadMessageConversationDTO>(json);

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

                var sender = this.factories.CreateUser(senderDTO);
                var recipient = this.factories.CreateUser(recipientDTO);

                var eventArgs = new UserReadMessageConversationEvent(activityEvent, sender, recipient, messageConversationReadEvent.LastReadEventId);

                this.Raise(UserReadMessageConversation, eventArgs);

                if (eventArgs.InResultOf == UserReadMessageConversationInResultOf.Unknown)
                {
                    this.Raise(EventKnownButNotFullySupportedReceived, new EventKnownButNotSupported(json, eventArgs));
                }
            });
        }

        private AccountActivityUserToUserEventDTO[] ExtractUserToUserEventDTOs(JToken userToUserEvent)
        {
            var userToUserEventJson = userToUserEvent.ToString();
            return ExtractUserToUserEventDTOs(userToUserEventJson);
        }

        private AccountActivityUserToUserEventDTO[] ExtractUserToUserEventDTOs(string userToUserEventJson)
        {
            var userToUserEventDTO = this.jsonObjectConverter.Deserialize<AccountActivityUserToUserEventDTO[]>(userToUserEventJson);
            return userToUserEventDTO;
        }
    }
}
