export abstract class SharebookLimits {
  // Max size of an image
  public static UPLOAD_MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  // Max size of a video
  public static UPLOAD_MAX_VIDEO_SIZE = 15 * 1024 * 1024;

  // Max size of an upload chunk
  public static UPLOAD_MAX_CHUNK_SIZE = 4 * 1024 * 1024;

  // Maximum number of favorites that can be retrieved in 1 request
  public static TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE = 200;

  // Maximum number of retweets that can be retrieved in 1 request
  public static TWEETS_GET_RETWEETS_MAX_SIZE = 100;

  // Maximum number of retweeter ids that can be retrieved in 1 request
  public static TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE = 100;

  // Maximum number of tweets that can be retrieved in 1 request
  public static TWEETS_GET_TWEETS_REQUEST_MAX_SIZE = 100;
}
