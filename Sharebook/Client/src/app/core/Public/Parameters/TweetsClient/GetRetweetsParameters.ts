import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {SharebookLimits} from "../../Settings/SharebookLimits";
import { TweetMode } from '../../Settings/SharebookSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id
export interface IGetRetweetsParameters extends ICustomRequestParameters, ITweetModeParameter {
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
    this.pageSize = SharebookLimits.DEFAULTS.TWEETS_GET_RETWEETS_MAX_SIZE;

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
  public tweetMode?: TweetMode;
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
