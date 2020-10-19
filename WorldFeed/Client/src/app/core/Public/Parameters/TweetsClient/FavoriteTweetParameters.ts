import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-create
export interface IFavoriteTweetParameters extends ICustomRequestParameters {
  // The identifier of the tweet you want to favorite
  tweet: ITweetIdentifier;

  // Include the tweet entities
  includeEntities?: boolean;
}

export class FavoriteTweetParameters extends CustomRequestParameters implements IFavoriteTweetParameters {
  constructor(tweetIdOrTweet: | number | ITweetIdentifier) {
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


// public FavoriteTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public FavoriteTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
