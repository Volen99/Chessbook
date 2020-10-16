import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweet} from "../../Models/Interfaces/ITweet";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import {IMedia} from "../../Models/Interfaces/IMedia";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import { TweetMode } from '../../Settings/TweetinviSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id
export interface IPublishTweetParameters extends ICustomRequestParameters, ITweetModeParameter {
  // Message to publish as a tweet
  Text: string;

  // The ID of an existing status that the update is in reply to.
  InReplyToTweetId?: number;

  // Quote a specific tweet
  QuotedTweet: ITweet;

  // An existing status that the update is in reply to.
  InReplyToTweet: ITweetIdentifier;

  /// <summary>
  /// In order for a URL to not be counted in the status body of an extended Tweet, provide a URL as a Tweet attachment.
  /// This URL must be a Tweet permalink, or Direct Message deep link.
  /// Arbitrary, non-Twitter URLs must remain in the status text.
  /// URLs passed to the attachment_url parameter not matching either a Tweet permalink or
  /// Direct Message deep link will fail at Tweet creation and cause an exception.
  /// </summary>
  QuotedTweetUrl: string;

  // A <a href="https://dev.twitter.com/overview/api/places">place</a> in the world.
  PlaceId: string;

  // Coordinates indicating the position from where the tweet has been published.
  Coordinates: ICoordinates;

  // Whether or not to put a pin on the exact coordinates a tweet has been sent from.
  DisplayExactCoordinates?: boolean;

  // A list of media_ids to associate with the Tweet. You may include up to 4 photos or 1 animated GIF or 1 video in a Tweet.
  MediaIds: Array<number>;

  // A list of media (uploaded or not) that need to be displayed within the tweet.
  Medias: Array<IMedia>;

  // Whether this Tweet will be published with any media attached
  HasMedia: boolean;

  // If you upload Tweet media that might be considered sensitive content such as
  // nudity, violence, or medical procedures, you should set this value to true.
  PossiblySensitive?: boolean;

  // If set to true, the creator property (IUser) will only contain the id.
  TrimUser?: boolean;

  /// Twitter will auto-populate the @mentions in the extended tweet prefix from the Tweet
  /// being replied to, plus a mention of the screen name that posted the Tweet being replied to.
  /// i.e. This auto-populates a "reply all".
  /// Must be used with InReplyToTweetId or InReplyToTweet.
  /// Use ExcludeReplyUserIds to specify accounts to not mention in the prefix.
  /// Also note that there can be a maximum of 50 mentions in the prefix, any more will error.
  AutoPopulateReplyMetadata?: boolean;

  /// Twitter User IDs to not include in the auto-populated extended Tweet prefix.
  /// Cannot exclude the User who is directly being replied to, only the additional mentions.
  /// Must be used with AutoPopulateReplyMetadata.
  ExcludeReplyUserIds: Array<number>;

  // Associate an ads card with the Tweet using the card_uri value from any ads card response.
  CardUri: string;
}

export class PublishTweetParameters extends CustomRequestParameters implements IPublishTweetParameters {
  // @ts-ignore
  constructor(textOrSource?: string | IPublishTweetParameters) {
    if (typeof textOrSource === 'string') {
      super();

      this.Text = textOrSource;
    } else if (PublishTweetParameters.isIPublishTweetParameters(textOrSource)) {
      super(textOrSource);

      this.Text = textOrSource.Text;
      this.InReplyToTweet = textOrSource.InReplyToTweet;
      this.QuotedTweet = textOrSource.QuotedTweet;

      if (this.InReplyToTweet == null) {
        this.InReplyToTweetId = textOrSource.InReplyToTweetId;
      }

      this.MediaIds = textOrSource.MediaIds;
      this.Medias = textOrSource.Medias;
      this.PlaceId = textOrSource.PlaceId;
      this.Coordinates = textOrSource.Coordinates;
      this.DisplayExactCoordinates = textOrSource.DisplayExactCoordinates;
      this.PossiblySensitive = textOrSource.PossiblySensitive;
      this.TrimUser = textOrSource.TrimUser;
      this.AutoPopulateReplyMetadata = textOrSource.AutoPopulateReplyMetadata;
      this.ExcludeReplyUserIds = textOrSource.ExcludeReplyUserIds;
      this.TweetMode = textOrSource.TweetMode;
    } else {
      super();
    }
  }


  public Text: string;

  public InReplyToTweet: ITweetIdentifier;

  public QuotedTweetUrl: string;

  public QuotedTweet: ITweet;

  get InReplyToTweetId(): number {  // long?
    return this.InReplyToTweet?.id;
  }

  set InReplyToTweetId(value: number) {
    this.InReplyToTweet = value != null ? new TweetIdentifier(value as number) : null;
  }

  public MediaIds: Array<number> /*{ get; set; }*/ = new Array<number>();
  public Medias: Array<IMedia> /*{ get; set; }*/ = new Array<IMedia>();

  get HasMedia(): boolean {
    return this.MediaIds?.count > 0 || this.Medias?.count > 0;
  }

  public PlaceId: string;
  public Coordinates: ICoordinates;
  public DisplayExactCoordinates?: boolean;
  public PossiblySensitive?: boolean;
  public TrimUser?: boolean;
  public AutoPopulateReplyMetadata?: boolean;
  public ExcludeReplyUserIds: Array<number>;
  public CardUri: string;
  public TweetMode?: TweetMode;

  private static isIPublishTweetParameters(textOrSource?: string | IPublishTweetParameters): textOrSource is IPublishTweetParameters {
    return (textOrSource as IPublishTweetParameters).TweetMode !== undefined;
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
