import {TweetIdentifier} from '../../models/TweetIdentifier';
import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy
export interface IUnfavoriteTweetParameters extends ICustomRequestParameters {
  // The identifier of the tweet you no longer want to be a favorite
  tweet: ITweetIdentifier;

  // Include the tweet entities
  includeEntities?: boolean;
}

export class UnfavoriteTweetParameters extends CustomRequestParameters implements IUnfavoriteTweetParameters {
  constructor(tweetIdOrTweet: number | ITweetIdentifier) {
    super();

    let tweetCurrent: ITweetIdentifier;
    if (typeof tweetIdOrTweet === 'number') {
      tweetCurrent = new TweetIdentifier(tweetIdOrTweet);
    } else {
      tweetCurrent = tweetIdOrTweet;
    }

    this.tweet = tweetCurrent;
  }

  public tweet: ITweetIdentifier;
  public includeEntities?: boolean;
}

// public UnfavoriteTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public UnfavoriteTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
