import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import { Language } from '../../Models/Enum/Language';
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

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
  Tweet: ITweetIdentifier;

  /// <summary>
  /// The maximum width of a rendered Tweet in whole pixels.
  /// A supplied value under or over the allowed range will be returned as the minimum or maximum
  /// supported width respectively; the reset width value will be reflected in the returned width property.
  ///
  /// <para>Min: 220; Max: 550</para>
  /// </summary>
  MaxWidth?: number;

  // When set to true links in a Tweet are not expanded to photo, video, or link previews.
  HideMedia?: boolean;

  // When set to true a collapsed version of the previous Tweet in a conversation thread
  // will not be displayed when the requested Tweet is in reply to another Tweet.
  HideThread?: boolean;

  // When set to true the script responsible for loading widgets.js will not be returned.
  // Your webpages should include their own reference to widgets.js
  // for use across all Twitter widgets including Embedded Tweets.
  OmitScript?: boolean;

  // Specifies whether the embedded Tweet should be floated left, right, or center
  // in the page relative to the parent element.
  Alignment?: OEmbedTweetAlignment;

  // A list of Twitter usernames related to your content.
  // This value will be forwarded to Tweet action intents if a viewer chooses
  // to reply, like, or retweet the embedded Tweet.
  RelatedUsernames: string[];

  /// <summary>
  /// Request returned HTML and a rendered Tweet in the specified Twitter language supported by embedded Tweets.
  /// <para> https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview </para>
  /// </summary>
  Language?: Language;

  // When set to dark, the Tweet is displayed with light text over a dark background.
  Theme?: OEmbedTweetTheme;

  // Adjust the color of Tweet text links with a hexadecimal color value.
  LinkColor: string;

  // Set to video to return a Twitter Video embed for the given Tweet.
  WidgetType?: OEmbedTweetWidgetType;

  // This is the `dnt` parameter.
  // When set to true, the Tweet and its embedded page on your site are not used for purposes
  // that include personalized suggestions and personalized ads.
  EnablePersonalisationAndSuggestions?: boolean;
}

export class GetOEmbedTweetParameters extends CustomRequestParameters implements IGetOEmbedTweetParameters {
  constructor(tweetIdOrTweet?: number | ITweetIdentifier) {
    super();

    if (Type.isNumber(tweetIdOrTweet)) {
      this.Tweet = new TweetIdentifier(tweetIdOrTweet);
    } else {
      this.Tweet = tweetIdOrTweet;
    }
  }

  public Tweet: ITweetIdentifier;
  public MaxWidth?: number;
  public HideMedia?: boolean;
  public HideThread?: boolean;
  public OmitScript?: boolean;
  public Alignment?: OEmbedTweetAlignment;
  public RelatedUsernames: string[];
  public Language?: Language;
  public Theme?: OEmbedTweetTheme;
  public LinkColor: string;
  public WidgetType?: OEmbedTweetWidgetType;
  public EnablePersonalisationAndSuggestions?: boolean;
}

// public GetOEmbedTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public GetOEmbedTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
