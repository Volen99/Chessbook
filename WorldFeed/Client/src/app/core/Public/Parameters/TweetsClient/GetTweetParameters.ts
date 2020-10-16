import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {TweetMode} from '../../Settings/TweetinviSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id
export interface IGetTweetParameters extends ICustomRequestParameters, ITweetModeParameter {
  // The identifier of the tweet you want to retrieve
  Tweet: ITweetIdentifier;

  // Tweet's author object will not be populated when set to true
  TrimUser?: boolean;

  // Tweet's `current_user_retweet` field will be populated when set to true
  IncludeMyRetweet?: boolean;

  /// Tweet's entities will not be included if set to false
  IncludeEntities?: boolean;

  // Tweet's alt text attached to media will be included when set to true
  IncludeExtAltText?: boolean;

  // Tweet's card uri will be included when set to true
  IncludeCardUri?: boolean;
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

    this.Tweet = tweetCurrent;
  }

  public Tweet: ITweetIdentifier;

  public TrimUser?: boolean;
  public IncludeMyRetweet?: boolean;
  public IncludeEntities?: boolean;
  public IncludeExtAltText?: boolean;
  public IncludeCardUri?: boolean;
  public TweetMode?: TweetMode;
}


// public GetTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public GetTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
