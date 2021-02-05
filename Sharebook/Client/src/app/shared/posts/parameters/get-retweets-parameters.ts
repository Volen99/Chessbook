import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {SharebookLimits} from "../../../helpers/sharebook-limits";
import {TweetIdentifier} from "../../models/TweetIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id
export interface IGetRetweetsParameters extends ICustomRequestParameters {
  // The identifier of the tweet you want to retrieve
  tweet: ITweetIdentifier;

  // Tweets author object will not be populated when set to true
  trimUser?: boolean;

  // Specifies the number of records to retrieve.
  pageSize: number;
}

export class GetRetweetsParameters extends CustomRequestParameters implements IGetRetweetsParameters {
  constructor(tweetIdOrTweet: | number | ITweetIdentifier) {
    super();
    this.pageSize = SharebookLimits.TWEETS_GET_RETWEETS_MAX_SIZE;

    let tweetCurrent: ITweetIdentifier;
    if (tweetIdOrTweet instanceof TweetIdentifier) {
      tweetCurrent = tweetIdOrTweet;
    } else if (typeof tweetIdOrTweet === 'number') {
      tweetCurrent = new TweetIdentifier(tweetIdOrTweet);
    }

    this.tweet = tweetCurrent;
  }

  public tweet: ITweetIdentifier;
  public trimUser?: boolean;
  public pageSize: number;
}


// public GetRetweetsParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_RETWEETS_MAX_SIZE;
// }
//
// public GetRetweetsParameters(long tweetId) : this()
// {
//   Tweet = new TweetIdentifier(tweetId);
// }
//
// public GetRetweetsParameters(ITweetIdentifier tweet) : this()
// {
//   Tweet = tweet;
// }
