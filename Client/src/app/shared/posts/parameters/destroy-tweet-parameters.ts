import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {TweetIdentifier} from "../../models/TweetIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id
export interface IDestroyTweetParameters extends ICustomRequestParameters {
  // The identifier of the tweet you want to destroy
  tweet: ITweetIdentifier;

  // If set to true, the creator property (IUser) will only contain the id.
  TrimUser?: boolean;
}

export class DestroyTweetParameters extends CustomRequestParameters implements IDestroyTweetParameters {

  constructor(tweetIdOrTweet: | number | ITweetIdentifier) {
    super();

    let tweetCurrent: ITweetIdentifier;
    if (tweetIdOrTweet instanceof TweetIdentifier) {
      tweetCurrent = tweetIdOrTweet;
    } else if (typeof tweetIdOrTweet === 'number') {
      tweetCurrent = new TweetIdentifier(tweetIdOrTweet);
    }

    this.tweet = tweetCurrent;
  }

  public tweet: ITweetIdentifier;
  public TrimUser?: boolean;

}

// public DestroyTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public DestroyTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
