import {inject, Inject, InjectionToken} from "@angular/core";

import {ITweetIdentifier} from "./ITweetIdentifier";
import {IPlace} from "./IPlace";
import {IUrlEntity} from "../Entities/IUrlEntity";
import {IHashtagEntity} from "../Entities/IHashTagEntity";
import {IMediaEntity} from "../Entities/IMediaEntity";
import {IUserMentionEntity} from "../Entities/IUserMentionEntity";
import {ICoordinates} from "./ICoordinates";
import {TweetMode} from '../../Settings/SharebookSettings';
import {ITweetEntities} from "../Entities/ITweetEntities";
import {ITwitterClient} from "../../ITwitterClient";
import {IExtendedTweet} from "./DTO/IExtendedTweet";
import {IUser} from "./IUser";
import {ITweetDTO} from "./DTO/ITweetDTO";
import {IOEmbedTweet} from "./IOEmbedTweet";
import {Tweet} from "../../../Core/Models/Tweet";
import {TweetDTO} from "../../../Core/DTO/TweetDTO";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import IEquatable from "typescript-dotnet-commonjs/System/IEquatable";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import {Language} from "../../../Core/Attributes/Language";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

// ... Well a Tweet :) https://dev.twitter.com/docs/platform-objects/tweets
export interface ITweet extends ITweetIdentifier, IEquatable<ITweet> {
  // Client used by the instance to perform any request to Twitter
  client: ITwitterClient;

  // #region Twitter API Properties

  // UTC time when this Tweet was created
  createdAt: DateTime; // DateTimeOffset;

  // Formatted text of the tweet.
  text: string;

  // Prefix of an extended tweet.
  prefix: string;

  // Suffix of an extended tweet.
  suffix: string;

  // Full text of an extended tweet.
  fullText: string;

  // Content display text range for FullText.
  displayTextRange: number[];

  /// <summary>
  /// The range of text to be displayed for any Tweet.
  /// If this is an Extended Tweet, this will be the range supplied by Twitter.
  /// If this is an old-style 140 character Tweet, the range will be 0 - Length.
  /// </summary>
  safeDisplayTextRange: number[];

  // Extended Tweet details.
  extendedTweet: IExtendedTweet;

  // Coordinates of the location from where the tweet has been sent
  coordinates: ICoordinates;

  // Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web
  source: string;

  // Whether the tweet text was truncated because it was longer than 140 characters.
  truncated: boolean;

  // Number of times this Tweet has been replied to
  // This property is only available with the Premium and Enterprise tier products.
  replyCount?: number;

  // If the represented Tweet is a reply, this field will contain the integer representation of the original ID
  inReplyToStatusId?: number;

  // In_reply_to_status_id_str
  inReplyToStatusIdStr: string;

  // If the represented Tweet is a reply, it will contain the integer representation of the original author ID
  inReplyToUserId?: number;

  // In_reply_to_user_id_str
  inReplyToUserIdStr: string;

  // If the represented Tweet is a reply, it will contain the screen name of the original Tweet’s author
  inReplyToScreenName: string;

  // User who created the Tweet
  createdBy: IUser;

  // Details the Tweet ID of the user's own retweet (if existent) of this Tweet.
  currentUserRetweetIdentifier: ITweetIdentifier;

  // Ids of the users who contributed in the Tweet
  contributorsIds: number[];

  // Users who contributed to the authorship of the tweet, on behalf of the official tweet author.
  contributors: Iterable<number>;

  // Number of retweets related with this tweet
  retweetCount: number;

  // Extended entities in the tweet. Used by twitter for multiple photos
  entities: ITweetEntities;

  // Is the tweet Favorited
  favorited: boolean;

  // Number of time the tweet has been Favorited
  favoriteCount: number;

  // Has the tweet been retweeted
  retweeted: boolean;

  // Is the tweet potentialy sensitive
  possiblySensitive: boolean;

  // Main language used in the tweet
  language?: Language;

  // Geographic details concerning the location where the tweet has been published
  place: IPlace;

  // Informed whether a tweet is displayed or not in a specific type of scope. This property is most of the time null.
  scopes: Dictionary<string, object>;

  // Streaming tweets requires a filter level. A tweet will be streamed if its filter level is higher than the one of the stream
  filterLevel: string;

  // Informs that a tweet has been withheld for a copyright reason
  withheldCopyright: boolean;

  // Countries in which the tweet will be withheld
  withheldInCountries: Iterable<string>;

  // When present, indicates whether the content being withheld is the "status" or a "user."
  withheldScope: string;

  // #endregion

  // #region Tweetinvi API Properties

  // Property used to -+store the data received from Twitter
  tweetDTO: ITweetDTO;

  // Collection of hashtags associated with a Tweet
  hashtags: Array<IHashtagEntity>;

  // Collection of urls associated with a tweet
  urls: Array<IUrlEntity>;

  // Collection of medias associated with a tweet
  media: Array<IMediaEntity>;

  // Collection of tweets mentioning this tweet
  userMentions: Array<IUserMentionEntity>;

  // Indicates whether the current tweet is a retweet of another tweet
  isRetweet: boolean;

  // If the tweet is a retweet this field provides the tweet that it retweeted
  retweetedTweet: ITweet;

  // Indicates approximately how many times this Tweet has been quoted by Twitter users.
  // This property is only available with the Premium and Enterprise tier products.
  quoteCount?: number;

  // Tweet Id that was retweeted with a quote
  quotedStatusId?: number;

  // Tweet Id that was retweeted with a quote
  quotedStatusIdStr: string;

  // Tweet that was retweeted with a quote
  quotedTweet: ITweet;

  // URL of the tweet on twitter.com
  url: string;

  tweetMode: TweetMode;

  // #endregion

  // #region Favorites

  // Favorites the tweet
  favoriteAsync(): Promise<void>;

  // Remove the tweet from favorites
  unfavoriteAsync(): Promise<void>;

  // #endregion

  // Retweet the current tweet from the authenticated user.
  publishRetweetAsync(): Promise<ITweet>;

  // Get the retweets of the current tweet
  getRetweetsAsync(): Promise<ITweet[]>;

  // Remove your retweet.
  destroyRetweetAsync(): Promise<void>;

  // Delete a tweet from Twitter
  destroyAsync(): Promise<void>;

  // Generate an OEmbedTweet.
  generateOEmbedTweetAsync(): Promise<IOEmbedTweet>;
}

export const ITweetToken = new InjectionToken<ITweet>('ITweet', {
  providedIn: 'root',
  factory: () => new Tweet(inject(TweetDTO), inject(TweetMode), inject(TwitterClient)),
});
