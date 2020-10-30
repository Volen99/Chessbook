import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {TweetMode} from '../../Settings/SharebookSettings';
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id
export interface IPublishRetweetParameters extends ICustomRequestParameters, ITweetModeParameter {
  // The tweet identifier you want to retweet
  tweet: ITweetIdentifier;

  // Tweets author object will not be populated when set to true
  trimUser?: boolean;
}

export class PublishRetweetParameters extends CustomRequestParameters implements IPublishRetweetParameters {
  constructor(tweetIdOrTweet: | number | ITweetIdentifier) {
    super();

    if (Type.isNumber(tweetIdOrTweet)) {
      this.tweet = new TweetIdentifier(tweetIdOrTweet);

    } else {
      this.tweet = tweetIdOrTweet;
    }
  }

  public tweet: ITweetIdentifier;
  public trimUser?: boolean;
  public tweetMode?: TweetMode;
}

// public PublishRetweetParameters(long tweetId)
// {
//   Tweet = new TweetIdentifier(tweetId);
// }
//
// public PublishRetweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
