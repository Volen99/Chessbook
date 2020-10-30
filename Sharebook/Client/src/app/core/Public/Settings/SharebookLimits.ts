export class SharebookLimits {
  public static DEFAULTS: SharebookLimits = new SharebookLimits();

  constructor(source?: SharebookLimits) {
    if (source) {
      this.ACCOUNT_GET_RELATIONSHIPS_WITH_MAX_SIZE = source.ACCOUNT_GET_RELATIONSHIPS_WITH_MAX_SIZE;
      this.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE = source.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
      this.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE = source.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
      this.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE = source.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE;
      this.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE = source.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
      this.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE = source.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
      this.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE = source.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE;

      this.ACCOUNT_SETTINGS_PROFILE_NAME_MAX_LENGTH = source.ACCOUNT_SETTINGS_PROFILE_NAME_MAX_LENGTH;
      this.ACCOUNT_SETTINGS_PROFILE_LOCATION_MAX_LENGTH = source.ACCOUNT_SETTINGS_PROFILE_LOCATION_MAX_LENGTH;
      this.ACCOUNT_SETTINGS_PROFILE_WEBSITE_URL_MAX_LENGTH = source.ACCOUNT_SETTINGS_PROFILE_WEBSITE_URL_MAX_LENGTH;
      this.ACCOUNT_SETTINGS_PROFILE_DESCRIPTION_MAX_LENGTH = source.ACCOUNT_SETTINGS_PROFILE_DESCRIPTION_MAX_LENGTH;

      this.LISTS_CREATE_NAME_MAX_SIZE = source.LISTS_CREATE_NAME_MAX_SIZE;
      this.LISTS_GET_MEMBERS_MAX_PAGE_SIZE = source.LISTS_GET_MEMBERS_MAX_PAGE_SIZE;
      this.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE = source.LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE;
      this.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE = source.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE;
      this.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE = source.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE;
      this.LISTS_GET_TWEETS_MAX_PAGE_SIZE = source.LISTS_GET_TWEETS_MAX_PAGE_SIZE;
      this.LISTS_GET_USER_MEMBERSHIPS_MAX_PAGE_SIZE = source.LISTS_GET_USER_MEMBERSHIPS_MAX_PAGE_SIZE;
      this.LISTS_ADD_MEMBERS_MAX_USERS = source.LISTS_ADD_MEMBERS_MAX_USERS;
      this.LISTS_REMOVE_MEMBERS_MAX_USERS = source.LISTS_REMOVE_MEMBERS_MAX_USERS;

      this.MESSAGES_GET_MAX_PAGE_SIZE = source.MESSAGES_GET_MAX_PAGE_SIZE;

      this.MESSAGE_MAX_SIZE = source.MESSAGE_MAX_SIZE;
      this.MESSAGE_QUICK_REPLY_MAX_OPTIONS = source.MESSAGE_QUICK_REPLY_MAX_OPTIONS;
      this.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH = source.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH;
      this.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH = source.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH;
      this.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH = source.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH;

      this.SEARCH_TWEETS_MAX_PAGE_SIZE = source.SEARCH_TWEETS_MAX_PAGE_SIZE;
      this.SEARCH_USERS_MAX_PAGE_SIZE = source.SEARCH_USERS_MAX_PAGE_SIZE;

      this.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE = source.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE;
      this.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE = source.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
      this.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE = source.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE;
      this.TIMELINE_USER_PAGE_MAX_PAGE_SIZE = source.TIMELINE_USER_PAGE_MAX_PAGE_SIZE;

      this.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE = source.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;
      this.TWEETS_GET_RETWEETS_MAX_SIZE = source.TWEETS_GET_RETWEETS_MAX_SIZE;
      this.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE = source.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
      this.TWEETS_GET_TWEETS_REQUEST_MAX_SIZE = source.TWEETS_GET_TWEETS_REQUEST_MAX_SIZE;

      this.UPLOAD_MAX_CHUNK_SIZE = source.UPLOAD_MAX_CHUNK_SIZE;
      this.UPLOAD_MAX_IMAGE_SIZE = source.UPLOAD_MAX_IMAGE_SIZE;
      this.UPLOAD_MAX_VIDEO_SIZE = source.UPLOAD_MAX_VIDEO_SIZE;

      this.USERS_GET_USERS_MAX_SIZE = source.USERS_GET_USERS_MAX_SIZE;
      this.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE = source.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;
      this.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE = source.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;
    }
  }

  // Maximum number of users friendship that can retrieved in 1 request
  public ACCOUNT_GET_RELATIONSHIPS_WITH_MAX_SIZE = 100;

  // Maximum number of user ids that can be retrieved in 1 request
  public ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE = 5000;

  // Maximum number of user ids that can be retrieved in 1 request
  public ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE = 5000;

  // Maximum number of user ids that can be retrieved in 1 request
  public ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE = 5000;

  // Maximum number of user ids that can be retrieved in 1 request
  public ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE = 5000;

  // Maximum number of users that can be retrieved in 1 request
  public ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE = 5000;

  // Max length of the profile's name
  public ACCOUNT_SETTINGS_PROFILE_NAME_MAX_LENGTH = 50;

  // Max length of the profile's bio/description
  public ACCOUNT_SETTINGS_PROFILE_DESCRIPTION_MAX_LENGTH = 160;

  // Max length of the profile's location
  public ACCOUNT_SETTINGS_PROFILE_LOCATION_MAX_LENGTH = 30;

  // Max length of the profile's website url
  public ACCOUNT_SETTINGS_PROFILE_WEBSITE_URL_MAX_LENGTH = 100;

  // Maximum number of users that can be retrieved in 1 request
  public ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE = 5000;

  // Maximum number of users that can be retrieved in 1 request
  public LISTS_CREATE_NAME_MAX_SIZE = 25;

  // Maximum number of lists that can be retrieved in 1 request
  public LISTS_GET_USER_OWNED_LISTS_MAX_SIZE = 1000;

  // Maximum number of tweets that can be retrieved from a list in 1 request
  public LISTS_GET_TWEETS_MAX_PAGE_SIZE = 200;

  // Maximum number of lists that can be retrieved in 1 request
  public LISTS_GET_USER_MEMBERSHIPS_MAX_PAGE_SIZE = 1000;

  // Maximum number of users that can be added to a list in 1 request
  public LISTS_ADD_MEMBERS_MAX_USERS = 100;

  // Maximum number of users that can be removed from a list in 1 request
  public LISTS_REMOVE_MEMBERS_MAX_USERS = 100;

  // Maximum number of members that can be retrieved in 1 request
  public LISTS_GET_MEMBERS_MAX_PAGE_SIZE = 5000;

  // Maximum number of subscribers that can be retrieved in 1 request
  public LISTS_GET_SUBSCRIBERS_MAX_PAGE_SIZE = 5000;

  // Maximum number of subscribers that can be retrieved in 1 request
  public LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE = 1000;

  // Maximum number of messages that can be retrieved in 1 request
  public MESSAGES_GET_MAX_PAGE_SIZE = 50;

  // Maximum number characters in 1 message
  public MESSAGE_MAX_SIZE = 10000;

  // Maximum number of options offered in 1 message
  public MESSAGE_QUICK_REPLY_MAX_OPTIONS = 20;

  // Maximum size of label per option
  public MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH = 36;

  // Maximum size of description per option
  public MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH = 72;

  // Maximum size of metadata per option
  public MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH = 1000;

  // Maximum number of tweets to retrieve in 1 request
  public SEARCH_TWEETS_MAX_PAGE_SIZE = 100;

  // Maximum number of users to retrieve in 1 request
  public SEARCH_USERS_MAX_PAGE_SIZE = 20;

  // Maximum number of tweets to retrieve in 1 request
  public TIMELINE_HOME_PAGE_MAX_PAGE_SIZE = 200;

  // Maximum number of tweets to retrieve in 1 request
  public TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE = 200;

  // Maximum number of tweets to retrieve in 1 request
  public TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE = 100;

  // Maximum number of tweets to retrieve in 1 request
  public TIMELINE_USER_PAGE_MAX_PAGE_SIZE = 200;

  // Maximum number of favorites that can be retrieved in 1 request
  public TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE = 200;

  // Maximum number of retweets that can be retrieved in 1 request
  public TWEETS_GET_RETWEETS_MAX_SIZE = 100;

  // Maximum number of retweeter ids that can be retrieved in 1 request
  public TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE = 100;

  // Maximum number of tweets that can be retrieved in 1 request
  public TWEETS_GET_TWEETS_REQUEST_MAX_SIZE = 100;

  // Max size of an image
  public UPLOAD_MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  // Max size of a video
  public UPLOAD_MAX_VIDEO_SIZE = 15 * 1024 * 1024;

  // Max size of an upload chunk
  public UPLOAD_MAX_CHUNK_SIZE = 4 * 1024 * 1024;

  // Maximum number of users that can be retrieved in 1 request
  public USERS_GET_USERS_MAX_SIZE = 100;

  // Maximum number of follower ids that can be retrieved in 1 request
  public USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE = 5000;

  // Maximum number of friend ids that can be retrieved in 1 request
  public USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE = 5000;
}
