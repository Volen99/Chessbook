import {CursorQueryParameters, ICursorQueryParameters} from "../../models/query/cursor-query-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {SharebookLimits} from "../../../helpers/sharebook-limits";
import {TweetIdentifier} from "../../models/TweetIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids
export interface IGetRetweeterIdsParameters extends ICursorQueryParameters {
  // The identifier of the retweet
  tweet: ITweetIdentifier;
}

export class GetRetweeterIdsParameters extends CursorQueryParameters implements IGetRetweeterIdsParameters {
  constructor(tweetIdOrTweetOrParameters?: | number | ITweetIdentifier | IGetRetweeterIdsParameters) {
    if (tweetIdOrTweetOrParameters) {
      if (GetRetweeterIdsParameters.isIGetRetweeterIdsParameters(tweetIdOrTweetOrParameters)) {
        super(tweetIdOrTweetOrParameters);

        this.tweet = tweetIdOrTweetOrParameters.tweet;
      } else {
        super();

        this.pageSize = SharebookLimits.TWEETS_GET_RETWEETS_MAX_SIZE;

        if (typeof tweetIdOrTweetOrParameters === 'number') {
          this.tweet = new TweetIdentifier(tweetIdOrTweetOrParameters);
        } else {
          this.tweet = tweetIdOrTweetOrParameters;
        }
      }
    } else {
      super();
      this.pageSize = SharebookLimits.TWEETS_GET_RETWEETS_MAX_SIZE;
    }
  }

  public tweet: ITweetIdentifier;

  private static isIGetRetweeterIdsParameters(tweetIdOrTweetOrParameters: | number | ITweetIdentifier | IGetRetweeterIdsParameters): tweetIdOrTweetOrParameters is IGetRetweeterIdsParameters {
    return (tweetIdOrTweetOrParameters as IGetRetweeterIdsParameters).tweet !== undefined;
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
