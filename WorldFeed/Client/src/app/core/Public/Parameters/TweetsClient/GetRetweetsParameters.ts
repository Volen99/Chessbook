import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {TwitterLimits} from "../../Settings/TwitterLimits";
import { TweetMode } from '../../Settings/TweetinviSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id
export interface IGetRetweetsParameters extends ICustomRequestParameters, ITweetModeParameter {
  // The identifier of the tweet you want to retrieve
  Tweet: ITweetIdentifier;

  // Tweets author object will not be populated when set to true
  TrimUser?: boolean;

  // Specifies the number of records to retrieve.
  PageSize: number;
}

export class GetRetweetsParameters extends CustomRequestParameters implements IGetRetweetsParameters {
  constructor(tweetIdOrTweet: | number | ITweetIdentifier) {
    super();
    this.PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_RETWEETS_MAX_SIZE;

    let tweetCurrent: ITweetIdentifier;
    if (tweetIdOrTweet instanceof TweetIdentifier) {
      tweetCurrent = tweetIdOrTweet;
    } else if (typeof tweetIdOrTweet === 'number') {
      tweetCurrent = new TweetIdentifier(tweetIdOrTweet);
    }

    this.Tweet = tweetCurrent;
  }

  public Tweet: ITweetIdentifier;
  public TrimUser?: boolean;
  public PageSize: number;
  public TweetMode?: TweetMode;
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
