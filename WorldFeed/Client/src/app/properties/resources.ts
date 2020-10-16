import {ResourcesHelper} from "../core/Core/Helpers/ResourcesHelper";

export abstract class Resources {
  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/settings.json.
  /// </summary>
  public static Account_GetSettings: string = "https://api.twitter.com/1.1/account/settings.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/create.json?.
  /// </summary>
  public static Account_Mute_Create: string = "https://api.twitter.com/1.1/mutes/users/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/destroy.json?.
  /// </summary>
  public static Account_Mute_Destroy: string = "https://api.twitter.com/1.1/mutes/users/destroy.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/ids.json?.
  /// </summary>
  public static Account_Mute_GetUserIds: string = "https://api.twitter.com/1.1/mutes/users/ids.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/mutes/users/ids.json?.
  /// </summary>
  public static Account_Mute_GetUsers: string = "https://api.twitter.com/1.1/mutes/users/list.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/settings.json?.
  /// </summary>
  public static Account_UpdateSettings: string = "https://api.twitter.com/1.1/account/settings.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/update_profile.json.
  /// </summary>
  public static Account_UpdateProfile: string = "https://api.twitter.com/1.1/account/update_profile.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/update_profile_image.json.
  /// </summary>
  public static Account_UpdateProfileImage: string = "https://api.twitter.com/1.1/account/update_profile_image.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/update_profile_banner.json.
  /// </summary>
  public static Account_UpdateProfileBanner: string = "https://api.twitter.com/1.1/account/update_profile_banner.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/remove_profile_banner.json.
  /// </summary>
  public static Account_RemoveProfileBanner: string = "https://api.twitter.com/1.1/account/remove_profile_banner.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/create.json?{0}.
  /// </summary>
  public static Friendship_Create: string = "https://api.twitter.com/1.1/friendships/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/destroy.json?{0}.
  /// </summary>
  public static Friendship_Destroy: string = "https://api.twitter.com/1.1/friendships/destroy.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/no_retweets/ids.json.
  /// </summary>
  public static Friendship_FriendIdsWithNoRetweets: string = "https://api.twitter.com/1.1/friendships/no_retweets/ids.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/incoming.json?.
  /// </summary>
  public static Friendship_GetIncomingIds: string = "https://api.twitter.com/1.1/friendships/incoming.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/outgoing.json?.
  /// </summary>
  public static Friendship_GetOutgoingIds: string = "https://api.twitter.com/1.1/friendships/outgoing.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/show.json?.
  /// </summary>
  public static Friendship_GetRelationship: string = "https://api.twitter.com/1.1/friendships/show.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/lookup.json?.
  /// </summary>
  public static Friendship_GetRelationships: string = "https://api.twitter.com/1.1/friendships/lookup.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friendships/update.json?.
  /// </summary>
  public static Friendship_Update: string = "https://api.twitter.com/1.1/friendships/update.json?";

  /// <summary>
  ///   Looks up a localized string similar to long={0}&amp;lat={1}.
  /// </summary>
  public static Geo_CoordinatesParameter: string = "long={0}&lat={1}";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/geo/id/{0}.json.
  /// </summary>
  public static Geo_GetPlaceFromId: string = "https://api.twitter.com/1.1/geo/id/{0}.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/geo/search.json.
  /// </summary>
  public static Geo_SearchGeo: string = "https://api.twitter.com/1.1/geo/search.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/geo/reverse_geocode.json.
  /// </summary>
  public static Geo_SearchGeoReverse: string = "https://api.twitter.com/1.1/geo/reverse_geocode.json";

  /// <summary>
  ///   Looks up a localized string similar to place_id={0}.
  /// </summary>
  public static Geo_PlaceIdParameter: string = "place_id={0}";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/application/rate_limit_status.json.
  /// </summary>
  public static Help_GetRateLimit: string = "https://api.twitter.com/1.1/application/rate_limit_status.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/help/configuration.json.
  /// </summary>
  public static Help_GetTwitterConfiguration: string = "https://api.twitter.com/1.1/help/configuration.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/help/languages.json.
  /// </summary>
  public static Help_GetSupportedLanguages: string = "https://api.twitter.com/1.1/help/languages.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/create.json?.
  /// </summary>
  public static List_Create: string = "https://api.twitter.com/1.1/lists/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/show.json?.
  /// </summary>
  public static List_Get: string = "https://api.twitter.com/1.1/lists/show.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/list.json?.
  /// </summary>
  public static List_GetUserLists: string = "https://api.twitter.com/1.1/lists/list.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/update.json?.
  /// </summary>
  public static List_Update: string = "https://api.twitter.com/1.1/lists/update.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/destroy.json?.
  /// </summary>
  public static List_Destroy: string = "https://api.twitter.com/1.1/lists/destroy.json?";


  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/create.json?.
  /// </summary>
  public static List_Members_Create: string = "https://api.twitter.com/1.1/lists/members/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members.json?.
  /// </summary>
  public static List_Members_List: string = "https://api.twitter.com/1.1/lists/members.json?";


  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/show.json?.
  /// </summary>
  public static List_CheckMembership: string = "https://api.twitter.com/1.1/lists/members/show.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/create_all.json?.
  /// </summary>
  public static List_CreateMembers: string = "https://api.twitter.com/1.1/lists/members/create_all.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/destroy.json?.
  /// </summary>
  public static List_DestroyMember: string = "https://api.twitter.com/1.1/lists/members/destroy.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/members/destroy_all.json?.
  /// </summary>
  public static List_DestroyMembers: string = "https://api.twitter.com/1.1/lists/members/destroy_all.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscribers.json?.
  /// </summary>
  public static List_GetSubscribers: string = "https://api.twitter.com/1.1/lists/subscribers.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/statuses.json?.
  /// </summary>
  public static List_GetTweetsFromList: string = "https://api.twitter.com/1.1/lists/statuses.json?";

  /// <summary>
  ///   Looks up a localized string similar to &amp;owner_id={0}.
  /// </summary>
  public static List_OwnerIdParameter: string = "&owner_id={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;owner_screen_name={0}.
  /// </summary>
  public static List_OwnerScreenNameParameter: string = "&owner_screen_name={0}";

  /// <summary>
  /// Looks up a localized string similar to https://api.twitter.com/1.1/lists/memberships.json?.
  /// </summary>
  public static List_GetUserMemberships: string = "https://api.twitter.com/1.1/lists/memberships.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/ownerships.json?.
  /// </summary>
  public static List_OwnedByUser: string = "https://api.twitter.com/1.1/lists/ownerships.json?";

  /// <summary>
  ///   Looks up a localized string similar to &amp;slug={0}.
  /// </summary>
  public static List_SlugParameter: string = "&slug={0}";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscribers/create.json?.
  /// </summary>
  public static List_Subscribe: string = "https://api.twitter.com/1.1/lists/subscribers/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscribers/destroy.json?.
  /// </summary>
  public static List_Unsubscribe: string = "https://api.twitter.com/1.1/lists/subscribers/destroy.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/lists/subscriptions.json?.
  /// </summary>
  public static List_UserSubscriptions: string = "https://api.twitter.com/1.1/lists/subscriptions.json?";

  /// <summary>
  ///   Looks up a localized string similar tohttps://api.twitter.com/1.1/lists/subscribers/show.json.
  /// </summary>
  public static List_CheckSubscriber: string = "https://api.twitter.com/1.1/lists/subscribers/show.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/events/list.json.
  /// </summary>
  public static Message_GetMessages: string = "https://api.twitter.com/1.1/direct_messages/events/list.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/events/new.json.
  /// </summary>
  public static Message_Create: string = "https://api.twitter.com/1.1/direct_messages/events/new.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/show.json?.
  /// </summary>
  public static Message_Get: string = "https://api.twitter.com/1.1/direct_messages/events/show.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/direct_messages/events/destroy.json?.
  /// </summary>
  public static Message_Destroy: string = "https://api.twitter.com/1.1/direct_messages/events/destroy.json?";

  /// <summary>
  ///   Looks up a localized string similar to &amp;count={0}.
  /// </summary>
  public static QueryParameter_Count: string = "&count={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;include_entities={0}.
  /// </summary>
  public static QueryParameter_IncludeEntities: string = "&include_entities={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;include_rts={0}.
  /// </summary>
  public static QueryParameter_IncludeRetweets: string = "&include_rts={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;max_id={0}.
  /// </summary>
  public static QueryParameter_MaxId: string = "&max_id={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;page_number={0}.
  /// </summary>
  public static QueryParameter_PageNumber: string = "&page_number={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;since_id={0}.
  /// </summary>
  public static QueryParameter_SinceId: string = "&since_id={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;skip_status={0}.
  /// </summary>
  public static QueryParameter_SkipStatus: string = "&skip_status={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;trim_user={0}.
  /// </summary>
  public static QueryParameter_TrimUser: string = "&trim_user={0}";

  /// <summary>
  ///   Looks up a localized string similar to &amp;cursor={0}.
  /// </summary>
  public static QueryParameter_Cursor: string = "&cursor={0}";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/create.json?.
  /// </summary>
  public static SavedSearch_Create: string = "https://api.twitter.com/1.1/saved_searches/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/show/{0}.json.
  /// </summary>
  public static SavedSearch_Get: string = "https://api.twitter.com/1.1/saved_searches/show/{0}.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/destroy/{0}.json.
  /// </summary>
  public static SavedSearch_Destroy: string = "https://api.twitter.com/1.1/saved_searches/destroy/{0}.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/saved_searches/list.json.
  /// </summary>
  public static SavedSearches_List: string = "https://api.twitter.com/1.1/saved_searches/list.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/search/tweets.json.
  /// </summary>
  public static Search_SearchTweets: string = "https://api.twitter.com/1.1/search/tweets.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/users/search.json.
  /// </summary>
  public static Search_SearchUsers: string = "https://api.twitter.com/1.1/users/search.json";

  /// <summary>
  ///   Looks up a localized string similar to {0},{1},{2}{3}.
  /// </summary>
  public static SearchParameter_GeoCode: string = "{0},{1},{2}{3}";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/home_timeline.json?.
  /// </summary>
  public static Timeline_GetHomeTimeline: string = "https://api.twitter.com/1.1/statuses/home_timeline.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/mentions_timeline.json?.
  /// </summary>
  public static Timeline_GetMentionsTimeline: string = "https://api.twitter.com/1.1/statuses/mentions_timeline.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweets_of_me.json?.
  /// </summary>
  public static Timeline_GetRetweetsOfMeTimeline: string = "https://api.twitter.com/1.1/statuses/retweets_of_me.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/user_timeline.json?.
  /// </summary>
  public static Timeline_GetUserTimeline: string = "https://api.twitter.com/1.1/statuses/user_timeline.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/trends/place.json?.
  /// </summary>
  public static Trends_GetTrendsFromWoeId: string = "https://api.twitter.com/1.1/trends/place.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/trends/available.json.
  /// </summary>
  public static Trends_GetAvailableTrendsLocations: string = "https://api.twitter.com/1.1/trends/available.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/trends/closest.json.
  /// </summary>
  public static Trends_GetTrendsLocationCloseTo: string = "https://api.twitter.com/1.1/trends/closest.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/destroy/{0}.json.
  /// </summary>
  public static Tweet_Destroy: string = "https://api.twitter.com/1.1/statuses/destroy/{0}.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/favorites/create.json?.
  /// </summary>
  public static Tweet_Favorite_Create: string = "https://api.twitter.com/1.1/favorites/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/favorites/destroy.json?.
  /// </summary>
  public static Tweet_Favorite_Destroy: string = "https://api.twitter.com/1.1/favorites/destroy.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/oembed.json?.
  /// </summary>
  public static Tweet_GenerateOEmbed: string = "https://api.twitter.com/1.1/statuses/oembed.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/show.json?.
  /// </summary>
  public static Tweet_Get: string = "https://api.twitter.com/1.1/statuses/show.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweeters/ids.json.
  /// </summary>
  public static Tweet_GetRetweeters: string = "https://api.twitter.com/1.1/statuses/retweeters/ids.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/lookup.json?.
  /// </summary>
  public static Tweet_Lookup: string = "https://api.twitter.com/1.1/statuses/lookup.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/update.json?.
  /// </summary>
  public static Tweet_Publish: string = "https://api.twitter.com/1.1/statuses/update.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweets/{0}.json.
  /// </summary>
  public static Tweet_Retweet_GetRetweets: string = "https://api.twitter.com/1.1/statuses/retweets/{0}.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/unretweet/{0}.json.
  /// </summary>
  public static Tweet_DestroyRetweet: string = "https://api.twitter.com/1.1/statuses/unretweet/{0}.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/statuses/retweet/{0}.json.
  /// </summary>
  public static Tweet_Retweet_Publish: string = "https://api.twitter.com/1.1/statuses/retweet/{0}.json";

  /// <summary>
  ///   Looks up a localized string similar to https://upload.twitter.com/1.1/media/upload.json.
  /// </summary>
  public static Upload_URL: string = "https://upload.twitter.com/1.1/media/upload.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account/verify_credentials.json.
  /// </summary>
  public static User_GetCurrentUser: string = "https://api.twitter.com/1.1/account/verify_credentials.json";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/blocks/create.json?.
  /// </summary>
  public static User_Block_Create: string = "https://api.twitter.com/1.1/blocks/create.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/blocks/destroy.json?.
  /// </summary>
  public static User_Block_Destroy: string = "https://api.twitter.com/1.1/blocks/destroy.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/blocks/list.json?.
  /// </summary>
  public static User_Block_List: string = "https://api.twitter.com/1.1/blocks/list.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/blocks/ids.json?.
  /// </summary>
  public static User_Block_List_Ids: string = "https://api.twitter.com/1.1/blocks/ids.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/favorites/list.json?{0}&amp;count={1}.
  /// </summary>
  public static User_GetFavorites: string = "https://api.twitter.com/1.1/favorites/list.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/followers/ids.json?.
  /// </summary>
  public static User_GetFollowers: string = "https://api.twitter.com/1.1/followers/ids.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/friends/ids.json?.
  /// </summary>
  public static User_GetFriends: string = "https://api.twitter.com/1.1/friends/ids.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/users/show.json?.
  /// </summary>
  public static User_GetUser: string = "https://api.twitter.com/1.1/users/show.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/users/lookup.json?.
  /// </summary>
  public static User_GetUsers: string = "https://api.twitter.com/1.1/users/lookup.json?";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/users/report_spam.json?.
  /// </summary>
  public static User_Report_Spam: string = "https://api.twitter.com/1.1/users/report_spam.json?";

  /// <summary>
  ///   Looks up a localized string similar to Upload STATUS can only be retrieved for uploaded media. The FINALIZE query must be invoked.
  /// </summary>
  public static Exception_Upload_Status_NotUploaded: string = "Upload STATUS can only be retrieved for uploaded media. The FINALIZE query must be invoked.";

  /// <summary>
  ///   Looks up a localized string similar to Upload STATUS can only be invoked on uploads with processing metadata. Set the `media_category` to `tweet_video` to solve this issue.
  /// </summary>
  public static Exception_Upload_Status_No_ProcessingInfo: string = "Upload STATUS can only be invoked on uploads with processing metadata. Set the `media_category` to `tweet_video` to solve this issue.";

  /// <summary>
  ///   Looks up a localized string similar to oob.
  /// </summary>
  public static Auth_PinCodeUrl: string = "oob";

  /// <summary>
  ///   Looks up a localized string similar to authorization_id.
  /// </summary>
  public static Auth_ProcessIdKey: string = "authorization_id";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/oauth/request_token.
  /// </summary>
  public static Auth_CreateBearerToken: string = "https://api.twitter.com/oauth2/token";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/oauth/request_token.
  /// </summary>
  public static Auth_RequestToken: string = "https://api.twitter.com/oauth/request_token";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/oauth/access_token.
  /// </summary>
  public static Auth_RequestAccessToken: string = "https://api.twitter.com/oauth/access_token";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/oauth/authorize.
  /// </summary>
  public static Auth_AuthorizeBaseUrl: string = "https://api.twitter.com/oauth/authorize";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/oauth2/invalidate_token.
  /// </summary>
  public static Auth_InvalidateBearerToken: string = "https://api.twitter.com/oauth2/invalidate_token";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/oauth/invalidate_token.
  /// </summary>
  public static Auth_InvalidateAccessToken: string = "https://api.twitter.com/1.1/oauth/invalidate_token";

  /// <summary>
  ///   Looks up a localized string that contains the regex for parsing the oauth_token
  /// </summary>
  public static Auth_RequestTokenParserRegex: string = "oauth_token=(?<oauth_token>(?:\\w|\\-)*)&oauth_token_secret=(?<oauth_token_secret>(?:\\w)*)&oauth_callback_confirmed=(?<oauth_callback_confirmed>(?:\\w)*)";

  /// <summary>
  ///   Looks up a localized string similar to https://api.twitter.com/1.1/account_activity/all.
  /// </summary>
  public static Webhooks_AccountActivity_All: string = "https://api.twitter.com/1.1/account_activity/all";

  /// <summary>
  ///   Looks up a localized string similar to /webhooks.json?.
  /// </summary>
  public static Webhooks_AccountActivity_GetAllWebhooks: string = "https://api.twitter.com/1.1/account_activity/all/webhooks.json";

  public static GetResourceByName(resourceName: string): string {
    return ResourcesHelper.getResourceByType(typeof (Resources), resourceName);
  }
}
