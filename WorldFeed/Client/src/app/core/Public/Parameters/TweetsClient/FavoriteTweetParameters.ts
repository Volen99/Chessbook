import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";

// For more information visit : https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-create
export interface IFavoriteTweetParameters extends ICustomRequestParameters {
  // The identifier of the tweet you want to favorite
  Tweet: ITweetIdentifier;

  // Include the tweet entities
  IncludeEntities?: boolean;
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

    this.Tweet = tweetCurrent;
  }

  public Tweet: ITweetIdentifier;
  public IncludeEntities?: boolean;
}


// public FavoriteTweetParameters(long tweetId) : this(new TweetIdentifier(tweetId))
// {
// }
//
// public FavoriteTweetParameters(ITweetIdentifier tweet)
// {
//   Tweet = tweet;
// }
