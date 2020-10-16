import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TwitterLimits} from "../../Settings/TwitterLimits";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids
export interface IGetRetweeterIdsParameters extends ICursorQueryParameters {
  // The identifier of the retweet
  Tweet: ITweetIdentifier;
}

export class GetRetweeterIdsParameters extends CursorQueryParameters implements IGetRetweeterIdsParameters {
  constructor(tweetIdOrTweetOrParameters?: | number | ITweetIdentifier | IGetRetweeterIdsParameters) {
    if (tweetIdOrTweetOrParameters) {
      if (GetRetweeterIdsParameters.isIGetRetweeterIdsParameters(tweetIdOrTweetOrParameters)) {
        super(tweetIdOrTweetOrParameters);

        this.Tweet = tweetIdOrTweetOrParameters.Tweet;
      } else {
        super();

        this.pageSize = TwitterLimits.DEFAULTS.TWEETS_GET_RETWEETS_MAX_SIZE;

        if (Type.isNumber(tweetIdOrTweetOrParameters)) {
          this.Tweet = new TweetIdentifier(tweetIdOrTweetOrParameters);
        } else {
          this.Tweet = tweetIdOrTweetOrParameters;
        }
      }
    } else {
      this.pageSize = TwitterLimits.DEFAULTS.TWEETS_GET_RETWEETS_MAX_SIZE;
    }
  }

  public Tweet: ITweetIdentifier;

  private static isIGetRetweeterIdsParameters(tweetIdOrTweetOrParameters: | number | ITweetIdentifier | IGetRetweeterIdsParameters): tweetIdOrTweetOrParameters is IGetRetweeterIdsParameters {
    return (tweetIdOrTweetOrParameters as IGetRetweeterIdsParameters).Tweet !== undefined;
  }
}

    // public GetRetweeterIdsParameters()
    // {
    //   PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
    // }
    //
    // public GetRetweeterIdsParameters(long tweetId) : this()
    // {
    //   Tweet = new TweetIdentifier(tweetId);
    // }
    //
    // public GetRetweeterIdsParameters(ITweetIdentifier tweet) : this()
    // {
    //   Tweet = tweet;
    // }
    //
    // public GetRetweeterIdsParameters(IGetRetweeterIdsParameters source) : base(source)
    // {
    //   if (source == null)
    //   {
    //     PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
    //     return;
    //   }
    //
    //   Tweet = source.Tweet;
    // }
