import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {TweetMode} from '../../Settings/SharebookSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-unretweet-id
export interface IDestroyRetweetParameters extends ICustomRequestParameters, ITweetModeParameter {
  // The identifier of the retweet
  tweet: ITweetIdentifier;

  // Tweets author object will not be populated when set to true
  trimUser?: boolean;
}

export class DestroyRetweetParameters extends CustomRequestParameters implements IDestroyRetweetParameters {
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
  public trimUser?: boolean;
  public tweetMode?: TweetMode;
}

// public DestroyRetweetParameters(long tweetId)
// {
//   Tweet = new TweetIdentifier(tweetId);
// }
//
// public DestroyRetweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
