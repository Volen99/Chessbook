import {Inject, Injectable, InjectionToken} from "@angular/core";
import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {IPost} from "../models/post.model";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {ICoordinates} from "../models/properties/ICoordinates";
import {IMedia} from "../../models/upload/media/media";
import {TweetIdentifier} from "../../models/TweetIdentifier";
import {IPoll} from "../models/poll/poll";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id
export interface IPublishTweetParameters extends ICustomRequestParameters {
  // Message to publish as a tweet
  text: string;

  // The ID of an existing status that the update is in reply to.
  inReplyToTweetId?: number;

  // Quote a specific tweet
  quotedTweet: IPost;

  // An existing status that the update is in reply to.
  inReplyToTweet: ITweetIdentifier;

  /// <summary>
  /// In order for a URL to not be counted in the status body of an extended Tweet, provide a URL as a Tweet attachment.
  /// This URL must be a Tweet permalink, or Direct Message deep link.
  /// Arbitrary, non-Twitter URLs must remain in the status text.
  /// URLs passed to the attachment_url parameter not matching either a Tweet permalink or
  /// Direct Message deep link will fail at Tweet creation and cause an exception.
  /// </summary>
  quotedTweetUrl: string;

  // A <a href="https://dev.twitter.com/overview/api/places">place</a> in the world.
  placeId: string;

  // Coordinates indicating the position from where the tweet has been published.
  coordinates: ICoordinates;

  // Whether or not to put a pin on the exact coordinates a tweet has been sent from.
  displayExactCoordinates?: boolean;

  // A list of media_ids to associate with the Tweet. You may include up to 4 photos or 1 animated GIF or 1 video in a Tweet.
  mediaIds: Array<number>;

  // A list of media (uploaded or not) that need to be displayed within the tweet.
  medias: Array<IMedia>;


  // Whether this Tweet will be published with any media attached
  hasMedia: boolean;

  hasPoll: boolean;
  poll: IPoll;

  // If you upload Tweet media that might be considered sensitive content such as
  // nudity, violence, or medical procedures, you should set this value to true.
  possiblySensitive?: boolean;

  // If set to true, the creator property (IUser) will only contain the id.
  trimUser?: boolean;

  /// Twitter will auto-populate the @mentions in the extended tweet prefix from the Tweet
  /// being replied to, plus a mention of the screen name that posted the Tweet being replied to.
  /// i.e. This auto-populates a "reply all".
  /// Must be used with InReplyToTweetId or InReplyToTweet.
  /// Use ExcludeReplyUserIds to specify accounts to not mention in the prefix.
  /// Also note that there can be a maximum of 50 mentions in the prefix, any more will error.
  autoPopulateReplyMetadata?: boolean;

  /// Twitter User IDs to not include in the auto-populated extended Tweet prefix.
  /// Cannot exclude the User who is directly being replied to, only the additional mentions.
  /// Must be used with AutoPopulateReplyMetadata.
  excludeReplyUserIds: Array<number>;

  // Associate an ads card with the Tweet using the card_uri value from any ads card response.
  cardUri: string;
}

export class PublishTweetParameters extends CustomRequestParameters implements IPublishTweetParameters {
  // @ts-ignore
  constructor(textOrSource?: string | IPublishTweetParameters) {
    if (!textOrSource) {
      super();
    } else if (typeof textOrSource === 'string') {
      super();

      this.text = textOrSource;
    } else if (PublishTweetParameters.isIPublishTweetParameters(textOrSource)) {
      super(textOrSource);

      this.text = textOrSource.text;
      this.inReplyToTweet = textOrSource.inReplyToTweet;
      this.quotedTweet = textOrSource.quotedTweet;

      if (this.inReplyToTweet == null) {
        this.inReplyToTweetId = textOrSource.inReplyToTweetId;
      }

      this.mediaIds = textOrSource.mediaIds;
      this.medias = textOrSource.medias;
      this.placeId = textOrSource.placeId;
      this.coordinates = textOrSource.coordinates;
      this.displayExactCoordinates = textOrSource.displayExactCoordinates;
      this.possiblySensitive = textOrSource.possiblySensitive;
      this.trimUser = textOrSource.trimUser;
      this.autoPopulateReplyMetadata = textOrSource.autoPopulateReplyMetadata;
      this.excludeReplyUserIds = textOrSource.excludeReplyUserIds;
      // this.tweetMode = textOrSource.tweetMode;
    } else {
      super(); // by mi check original kk
    }

    this.mediaIds = new Array<number>();
    this.medias = new Array<IMedia>();
  }

  poll: IPoll;
  tags: string;


  public text: string;

  public inReplyToTweet: ITweetIdentifier;

  public quotedTweetUrl: string;

  public quotedTweet: IPost;

  get inReplyToTweetId(): number {  // long?
    return this.inReplyToTweet?.id;
  }

  set inReplyToTweetId(value: number) {
    this.inReplyToTweet = value != null ? new TweetIdentifier(value as number) : null;
  }

  public mediaIds: Array<number>; /*{ get; set; }*//* = new Array<number>();*/
  public medias: Array<IMedia>; /*{ get; set; }*/ /*= new Array<IMedia>();*/

  get hasMedia(): boolean {
    return this.mediaIds?.length > 0 || this.medias?.length > 0;
  }

  hasPoll: boolean;

  public placeId: string;
  public coordinates: ICoordinates;
  public displayExactCoordinates?: boolean;
  public possiblySensitive?: boolean;
  public trimUser?: boolean;
  public autoPopulateReplyMetadata?: boolean;
  public excludeReplyUserIds: Array<number>;
  public cardUri: string;

  private static isIPublishTweetParameters(textOrSource?: string | IPublishTweetParameters): textOrSource is IPublishTweetParameters {
    return (textOrSource as IPublishTweetParameters).text !== undefined;
  }
}


// public PublishTweetParameters()
// {
// }
//
// public PublishTweetParameters(string text)
// {
//   Text = text;
// }
//
// public PublishTweetParameters(IPublishTweetParameters source) : base(source)
// {
//   if (source == null)
//   {
//     return;
//   }
//
//   Text = source.Text;
//   InReplyToTweet = source.InReplyToTweet;
//   QuotedTweet = source.QuotedTweet;
//
//   if (InReplyToTweet == null)
//   {
//     InReplyToTweetId = source.InReplyToTweetId;
//   }
//
//   MediaIds = source.MediaIds?.ToList();
//   Medias = source.Medias?.ToList();
//   PlaceId = source.PlaceId;
//   Coordinates = source.Coordinates;
//   DisplayExactCoordinates = source.DisplayExactCoordinates;
//   PossiblySensitive = source.PossiblySensitive;
//   TrimUser = source.TrimUser;
//   AutoPopulateReplyMetadata = source.AutoPopulateReplyMetadata;
//   ExcludeReplyUserIds = source.ExcludeReplyUserIds;
//   TweetMode = source.TweetMode;
// }
