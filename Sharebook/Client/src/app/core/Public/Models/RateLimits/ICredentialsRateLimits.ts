import {CredentialsRateLimitsDTO} from 'src/app/core/Core/DTO/CredentialsRateLimitsDTO';
import {IEndpointRateLimit} from "./IEndpointRateLimit";
import {TwitterEndpointAttribute} from "../../../Core/Attributes/TwitterEndpointAttribute";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

// Lists the state of all the twitter api endpoints rate limits.
// https://dev.twitter.com/docs/rate-limiting/1.1/limits
export interface ICredentialsRateLimits {
  // TODO LINVI :
  // ADD https://dev.twitter.com/rest/reference/post/statuses/destroy/%3Aid
  // ADD https://api.twitter.com/1.1/statuses/update.json
  // ADD https://api.twitter.com/1.1/direct_messages/destroy.json
  // ADD https://api.twitter.com/1.1/direct_messages/new.json
  // ADD https://api.twitter.com/1.1/friendships/create.json
  // ADD https://api.twitter.com/1.1/friendships/destroy.json
  // ADD https://api.twitter.com/1.1/friendships/update.json

  createdAt: DateTime; // DateTimeOffset
  rateLimitContext: string;
  isApplicationOnlyCredentials: boolean;
  credentialsRateLimitsDTO: CredentialsRateLimitsDTO;

  // ALL OTHERS that are retrieved from the headers
  otherEndpointRateLimits: Dictionary<TwitterEndpointAttribute, IEndpointRateLimit>;

  // ACCOUNT
  accountLoginVerificationEnrollmentLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/account/settings.json")]
  accountSettingsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/account/update_profile.json")]
  accountUpdateProfileLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/account/verify_credentials.json")]
  accountVerifyCredentialsLimit: IEndpointRateLimit;

  // APPLICATION
  // [TwitterEndpoint("https://api.twitter.com/1.1/application/rate_limit_status.json")]
  applicationRateLimitStatusLimit: IEndpointRateLimit;

  // AUTH
  authCrossSiteRequestForgeryLimit: IEndpointRateLimit;

  // BLOCK
  // [TwitterEndpoint("https://api.twitter.com/1.1/blocks/ids.json")]
  blocksIdsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/blocks/list.json")]
  blocksListLimit: IEndpointRateLimit;

  // BUSINESS EXPERIENCE
  businessExperienceKeywordLimit: IEndpointRateLimit;

  // COLLECTIONS

  // [TwitterEndpoint("https://api.twitter.com/1.1/collections/list.json")]
  collectionsListLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/collections/entries.json")]
  collectionsEntriesLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/collections/show.json")]
  collectionsShowLimit: IEndpointRateLimit;

  // CONTACTS
  contactsUpdatedByLimit: IEndpointRateLimit;
  contactsUsersLimit: IEndpointRateLimit;
  contactsAddressBookLimit: IEndpointRateLimit;
  contactsUsersAndUploadedByLimit: IEndpointRateLimit;
  contactsDeleteStatusLimit: IEndpointRateLimit;

  // OTHER
  deviceTokenLimit: IEndpointRateLimit;

  // DIRECT MESSAGES
  // [TwitterEndpoint("https://api.twitter.com/1.1/direct_messages/events/show.json")]
  directMessagesShowLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/direct_messages/events/list.json")]
  directMessagesListLimit: IEndpointRateLimit;

  // FAVORITES
  // [TwitterEndpoint("https://api.twitter.com/1.1/favorites/list.json")]
  favoritesListLimit: IEndpointRateLimit;

  // FEEDBACK
  feedbackShowLimit: IEndpointRateLimit;
  feedbackEventsLimit: IEndpointRateLimit;

  // FOLLOWERS
  // [TwitterEndpoint("https://api.twitter.com/1.1/followers/ids.json")]
  followersIdsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/followers/list.json")]
  followersListLimit: IEndpointRateLimit;

  // FRIENDS
  // [TwitterEndpoint("https://api.twitter.com/1.1/friends/ids.json")]
  friendsIdsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/friends/list.json")]
  friendsListLimit: IEndpointRateLimit;
  friendsFollowingIdsLimit: IEndpointRateLimit;
  friendsFollowingListLimit: IEndpointRateLimit;

  // FRIENDSHIP
  // [TwitterEndpoint("https://api.twitter.com/1.1/friendships/incoming.json")]
  friendshipsIncomingLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/friendships/lookup.json")]
  friendshipsLookupLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/friendships/no_retweets/ids.json")]
  friendshipsNoRetweetsIdsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/friendships/outgoing.json")]
  friendshipsOutgoingLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/friendships/show.json")]
  friendshipsShowLimit: IEndpointRateLimit;

  friendshipsListLimit: IEndpointRateLimit;

  // GEO
  // [TwitterEndpoint("https://api.twitter.com/1.1/geo/id/[a-zA-Z0-9]+\\.json", true)]
  geoGetPlaceFromIdLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/geo/reverse_geocode.json")]
  geoReverseGeoCodeLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/geo/search.json")]
  geoSearchLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/geo/similar_places.json")]
  geoSimilarPlacesLimit: IEndpointRateLimit;

  // HELP
  // [TwitterEndpoint("https://api.twitter.com/1.1/help/configuration.json")]
  helpConfigurationLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/help/languages.json")]
  helpLanguagesLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/help/privacy.json")]
  helpPrivacyLimit: IEndpointRateLimit;

  helpSettingsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/help/tos.json")]
  helpTosLimit: IEndpointRateLimit;

  // LIST
  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/list.json")]
  listsListLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/members.json")]
  listsMembersLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/members/show.json")]
  listsMembersShowLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/memberships.json")]
  listsMembershipsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/ownerships.json")]
  listsOwnershipsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/show.json")]
  listsShowLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/statuses.json")]
  listsStatusesLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/subscribers.json")]
  listsSubscribersLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/lists/subscribers/show.json")]
  listsSubscribersShowLimit: IEndpointRateLimit;

  //  [TwitterEndpoint("https://api.twitter.com/1.1/lists/subscriptions.json")]
  listsSubscriptionsLimit: IEndpointRateLimit;

  // MEDIA
  mediaUploadLimit: IEndpointRateLimit;

  // MOMENTS
  momentsPermissions: IEndpointRateLimit;

  // MUTES
  // [TwitterEndpoint("https://api.twitter.com/1.1/mutes/users/list.json")]
  mutesUserList: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/mutes/users/ids.json")]
  mutesUserIds: IEndpointRateLimit;

  // SAVED SEARCHES
  // [TwitterEndpoint("https://api.twitter.com/1.1/saved_searches/destroy/[a-zA-Z0-9]+\\.json", true)]
  savedSearchDestroyLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/saved_searches/list.json")]
  savedSearchesListLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/saved_searches/show/[a-zA-Z0-9]+\\.json", true)]
  savedSearchesShowIdLimit: IEndpointRateLimit;

  // SEARCH
  // [TwitterEndpoint("https://api.twitter.com/1.1/search/tweets.json")]
  searchTweetsLimit: IEndpointRateLimit;

  // STATUSES
  // TODO LINVI
  statusesFriendsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/statuses/home_timeline.json")]
  statusesHomeTimelineLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/statuses/lookup.json")]
  statusesLookupLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/statuses/mentions_timeline.json")]
  statusesMentionsTimelineLimit: IEndpointRateLimit;

  //  [TwitterEndpoint("https://api.twitter.com/1.1/statuses/oembed.json")]
  statusesOembedLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/statuses/retweeters/ids.json")]
  statusesRetweetersIdsLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/statuses/retweets/[0-9]+\\.json", true)]
  statusesRetweetsIdLimit: IEndpointRateLimit;

  //  [TwitterEndpoint("https://api.twitter.com/1.1/statuses/retweets_of_me.json")]
  statusesRetweetsOfMeLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/statuses/show.json")]
  statusesShowIdLimit: IEndpointRateLimit;

  //  [TwitterEndpoint("https://api.twitter.com/1.1/statuses/user_timeline.json")]
  statusesUserTimelineLimit: IEndpointRateLimit;

  // TRENDS
  // [TwitterEndpoint("https://api.twitter.com/1.1/trends/available.json")]
  trendsAvailableLimit: IEndpointRateLimit;

  //  [TwitterEndpoint("https://api.twitter.com/1.1/trends/closest.json")]
  trendsClosestLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/trends/place.json")]
  trendsPlaceLimit: IEndpointRateLimit;

  // TWEET_PROMPTS
  tweetPromptsReportInteractionLimit: IEndpointRateLimit;
  tweetPromptsShowLimit: IEndpointRateLimit;

  // USER
  usersDerivedInfoLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/users/lookup.json")]
  usersLookupLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/users/profile_banner.json")]
  usersProfileBannerLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/users/report_spam.json")]
  usersReportSpamLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/users/search.json")]
  usersSearchLimit: IEndpointRateLimit;

  // [TwitterEndpoint("https://api.twitter.com/1.1/users/show.json")]
  usersShowIdLimit: IEndpointRateLimit;
}
