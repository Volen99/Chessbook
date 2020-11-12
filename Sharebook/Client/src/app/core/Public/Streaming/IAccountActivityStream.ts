// import {IWebhookMessage} from "../Models/Webhooks/WebhookMessage";
//
// // An AccountActivity stream from Twitter (https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/overview)
// // The stream is linked with a specific user account and raise account related events.
// export interface IAccountActivityStream {
//   // The account user id. This property should not be modified by users.
//   AccountUserId: number;
//
//   // Tweets
//
//   // A Tweet has been been created.
//   TweetCreated: EventHandler<TweetCreatedEvent>;
//
//   // A Tweet has been deleted
//   TweetDeleted: EventHandler<TweetDeletedEvent>;
//
//   // A Tweet has been Favorited
//   TweetFavorited: EventHandler<TweetFavoritedEvent>;
//
//   // User Events
//
//   // Account user is now following another user
//   UserFollowed: EventHandler<UserFollowedEvent>;
//
//   // Account user has stopped following another user
//   UserUnfollowed: EventHandler<UserUnfollowedEvent>;
//
//   // Account user has blocked another user
//   UserBlocked: EventHandler<UserBlockedEvent>;
//
//   // Account user has unblocked another user
//   UserUnblocked: EventHandler<UserUnblockedEvent>;
//
//   // Account user has muted another user
//   UserMuted: EventHandler<UserMutedEvent>;
//
//   // Account user has unmuted another user
//   UserUnmuted: EventHandler<UserUnmutedEvent>;
//
//
//   // Messages
//
//   // Account user has received a message
//   MessageReceived: EventHandler<MessageReceivedEvent>;
//
//   // Account user has sent a message
//   MessageSent: EventHandler<MessageSentEvent>;
//
//   // A user is typing in a conversation with the account user
//   UserIsTypingMessage: EventHandler<UserIsTypingMessageEvent>;
//
//   // A user has read a message from the account user
//   UserReadMessageConversation: EventHandler<UserReadMessageConversationEvent>;
//
//   // Permissions
//
//   // Revoke events sent when the account user removes application authorization and subscription is automatically deleted.
//   UserRevokedAppPermissions: EventHandler<UserRevokedAppPermissionsEvent>;
//
//   // Others
//
//   // Reports that an event has been received
//   EventReceived: EventHandler<AccountActivityEvent>;
//
//   // Reports that an event that Tweetinvi does not understand has been received.
//   // Please report such event to us.
//   UnsupportedEventReceived: EventHandler<UnsupportedMessageReceivedEvent>;
//
//
//   // The type of event is known by Tweetinvi but we could not identify why the event was created.
//   // Please report such event to us.
//   EventKnownButNotFullySupportedReceived: EventHandler<EventKnownButNotSupported>;
//
//   // An unexpected error was thrown.
//   UnexpectedExceptionThrown: EventHandler<UnexpectedExceptionThrownEvent>;
//
//   // For internal use : this is how we inform an account activity stream
//   // that an even has occurred.
//   WebhookMessageReceived(message: IWebhookMessage): void;
// }
