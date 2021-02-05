import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-create
export interface IFavoriteTweetParameters extends ICustomRequestParameters {
  // The identifier of the tweet you want to favorite
  tweet: ITweetIdentifier;

  isUp: boolean;

  // Include the tweet entities
  includeEntities?: boolean;
}

export class FavoriteTweetParameters extends CustomRequestParameters implements IFavoriteTweetParameters {
  constructor(tweetIdOrTweet: | number | ITweetIdentifier, isUp: boolean) {
    super();

    let tweetCurrent: ITweetIdentifier;
    if (typeof tweetIdOrTweet === 'number') {
      tweetCurrent = new TweetIdentifier(tweetIdOrTweet);
    } else {
      tweetCurrent = tweetIdOrTweet;
    }

    this.tweet = tweetCurrent;
    this.isUp = isUp;
  }

  public tweet: ITweetIdentifier;
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
