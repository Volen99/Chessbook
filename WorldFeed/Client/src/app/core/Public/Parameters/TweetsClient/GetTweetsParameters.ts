import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {ITweetIdentifier} from "../../Models/Interfaces/ITweetIdentifier";
import {TweetIdentifier} from "../../Models/TweetIdentifier";
import {TweetMode} from '../../Settings/TweetinviSettings';

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-lookup
export interface IGetTweetsParameters extends ICustomRequestParameters, ITweetModeParameter {
  // The identifiers of the tweets you want to retrieve
  tweets: ITweetIdentifier[];

  // Tweet's author object will not be populated when set to true
  trimUser?: boolean;

  // Tweet's entities will not be included if set to false
  includeEntities?: boolean;

  // Tweet's alt text attached to media will be included when set to true
  includeExtAltText?: boolean;

  // Tweet's card uri will be included when set to true
  includeCardUri?: boolean;
}

export class GetTweetsParameters extends CustomRequestParameters implements IGetTweetsParameters {
  constructor(tweetIdsOrTweets: number[] | ITweetIdentifier[]) {
    super();

    if (tweetIdsOrTweets) {
      let tweetsCurrent: ITweetIdentifier[];
      if (GetTweetsParameters.isITweetIdentifier(tweetIdsOrTweets)) {
        tweetsCurrent = tweetIdsOrTweets;
      } else {
        tweetsCurrent = tweetIdsOrTweets?.map(x => new TweetIdentifier(x) as ITweetIdentifier);
      }

      this.tweets = tweetsCurrent;
    }
  }

  public tweets: ITweetIdentifier[];
  public trimUser?: boolean;
  public includeEntities?: boolean;
  public includeExtAltText?: boolean;
  public includeCardUri?: boolean;
  public tweetMode?: TweetMode;

  private static isITweetIdentifier(tweetIdsOrTweets: number[] | ITweetIdentifier[]): tweetIdsOrTweets is ITweetIdentifier[] {
    return (tweetIdsOrTweets as ITweetIdentifier[])[0].id !== undefined;
  }
}


// public GetTweetsParameters()
// {
// }
//
// public GetTweetsParameters(long[] tweetIds)
// {
//   Tweets = tweetIds?.Select(x => new TweetIdentifier(x) as ITweetIdentifier).ToArray();
// }
//
// public GetTweetsParameters(ITweetIdentifier[] tweetIdentifiers)
// {
//   Tweets = tweetIdentifiers;
// }
