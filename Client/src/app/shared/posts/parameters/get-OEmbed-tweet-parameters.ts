import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {TweetIdentifier} from "../../models/TweetIdentifier";



// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed
export enum OEmbedTweetAlignment {
  None,
  Left,
  Center,
  Right
}

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed
export enum OEmbedTweetTheme {
  Light,
  Dark
}

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed
export enum OEmbedTweetWidgetType {
  // Parameter won't be included
  Default,

  // Set to video to return a Twitter Video embed for the given Tweet.
  Video
}

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed
export interface IGetOEmbedTweetParameters extends ICustomRequestParameters {
  // The identifier of the tweet for which you want to get the oembed tweet
  tweet: ITweetIdentifier;

  /// <summary>
  /// The maximum width of a rendered Tweet in whole pixels.
  /// A supplied value under or over the allowed range will be returned as the minimum or maximum
  /// supported width respectively; the reset width value will be reflected in the returned width property.
  ///
  /// <para>Min: 220; Max: 550</para>
  /// </summary>
  maxWidth?: number;

  // When set to true links in a Tweet are not expanded to photo, video, or link previews.
  hideMedia?: boolean;

  // When set to true a collapsed version of the previous Tweet in a conversation thread
  // will not be displayed when the requested Tweet is in reply to another Tweet.
  hideThread?: boolean;

  // When set to true the script responsible for loading widgets.js will not be returned.
  // Your webpages should include their own reference to widgets.js
  // for use across all Twitter widgets including Embedded Tweets.
  omitScript?: boolean;

  // Specifies whether the embedded Tweet should be floated left, right, or center
  // in the page relative to the parent element.
  alignment?: OEmbedTweetAlignment;

  // A list of Twitter usernames related to your content.
  // This value will be forwarded to Tweet action intents if a viewer chooses
  // to reply, like, or retweet the embedded Tweet.
  relatedUsernames: string[];

  /// <summary>
  /// Request returned HTML and a rendered Tweet in the specified Twitter language supported by embedded Tweets.
  /// <para> https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview </para>
  /// </summary>
  language?: any;

  // When set to dark, the Tweet is displayed with light text over a dark background.
  theme?: OEmbedTweetTheme;

  // Adjust the color of Tweet text links with a hexadecimal color value.
  linkColor: string;

  // Set to video to return a Twitter Video embed for the given Tweet.
  widgetType?: OEmbedTweetWidgetType;

  // This is the `dnt` parameter.
  // When set to true, the Tweet and its embedded page on your site are not used for purposes
  // that include personalized suggestions and personalized ads.
  enablePersonalisationAndSuggestions?: boolean;
}

export class GetOEmbedTweetParameters extends CustomRequestParameters implements IGetOEmbedTweetParameters {
  constructor(tweetIdOrTweet?: number | ITweetIdentifier) {
    super();

    if (typeof tweetIdOrTweet === 'number') {
      this.tweet = new TweetIdentifier(tweetIdOrTweet);
    } else {
      this.tweet = tweetIdOrTweet;
    }
  }

  public tweet: ITweetIdentifier;
  public maxWidth?: number;
  public hideMedia?: boolean;
  public hideThread?: boolean;
  public omitScript?: boolean;
  public alignment?: OEmbedTweetAlignment;
  public relatedUsernames: string[];
  public language?: any; // Language;
  public theme?: OEmbedTweetTheme;
  public linkColor: string;
  public widgetType?: OEmbedTweetWidgetType;
  public enablePersonalisationAndSuggestions?: boolean;
}

// public GetOEmbedTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public GetOEmbedTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
