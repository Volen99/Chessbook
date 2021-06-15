import {TweetIdentifier} from "../../models/TweetIdentifier";
import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {UserVideoRateType} from "../models/rate/user-video-rate.type";

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-create
export interface IFavoriteTweetParameters extends ICustomRequestParameters {
  // The identifier of the tweet you want to favorite
  tweet: ITweetIdentifier;

  rateType: UserVideoRateType;
  isUp: boolean;

  // Include the tweet entities
  includeEntities?: boolean;
}

export class FavoriteTweetParameters extends CustomRequestParameters implements IFavoriteTweetParameters {
  constructor(tweetIdOrTweet: | number | ITweetIdentifier, rateType: UserVideoRateType) {
    super();

    let tweetCurrent: ITweetIdentifier;
    if (typeof tweetIdOrTweet === 'number') {
      tweetCurrent = new TweetIdentifier(tweetIdOrTweet);
    } else {
      tweetCurrent = tweetIdOrTweet;
    }

    this.tweet = tweetCurrent;
    this.rateType = rateType;
    this.isUp = rateType === 'like';
  }

  public tweet: ITweetIdentifier;
  public rateType: UserVideoRateType;
  public isUp: boolean;
  public includeEntities?: boolean;
}


// public FavoriteTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public FavoriteTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
