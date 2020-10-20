import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {TweetMode} from '../../Settings/TweetinviSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id
export interface IDestroyTweetParameters extends ICustomRequestParameters, ITweetModeParameter {
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

  public tweetMode?: TweetMode;
}

// public DestroyTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public DestroyTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
