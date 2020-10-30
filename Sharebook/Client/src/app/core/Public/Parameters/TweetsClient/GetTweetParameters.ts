import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {TweetMode} from '../../Settings/SharebookSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id
export interface IGetTweetParameters extends ICustomRequestParameters, ITweetModeParameter {
  // The identifier of the tweet you want to retrieve
  tweet: ITweetIdentifier;

  // Tweet's author object will not be populated when set to true
  trimUser?: boolean;

  // Tweet's `current_user_retweet` field will be populated when set to true
  includeMyRetweet?: boolean;

  /// Tweet's entities will not be included if set to false
  includeEntities?: boolean;

  // Tweet's alt text attached to media will be included when set to true
  includeExtAltText?: boolean;

  // Tweet's card uri will be included when set to true
  includeCardUri?: boolean;
}

export class GetTweetParameters extends CustomRequestParameters implements IGetTweetParameters {
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
  public includeMyRetweet?: boolean;
  public includeEntities?: boolean;
  public includeExtAltText?: boolean;
  public includeCardUri?: boolean;
  public tweetMode?: TweetMode;
}


// public GetTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public GetTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
