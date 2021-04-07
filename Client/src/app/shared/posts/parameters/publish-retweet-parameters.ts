import {CustomRequestParameters, ICustomRequestParameters} from "../../models/query/custom-request-parameters";
import {ITweetIdentifier} from "../models/tweet-identifier";
import {TweetIdentifier} from "../../models/TweetIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id
export interface IPublishRetweetParameters extends ICustomRequestParameters {
    // The tweet identifier you want to retweet
    tweet: ITweetIdentifier;

    // Tweets author object will not be populated when set to true
    trimUser?: boolean;
}

export class PublishRetweetParameters extends CustomRequestParameters implements IPublishRetweetParameters {
    constructor(tweetIdOrTweet: | number | ITweetIdentifier) {
        super();

        if (typeof tweetIdOrTweet === 'number') {
            this.tweet = new TweetIdentifier(tweetIdOrTweet);

        } else {
            this.tweet = tweetIdOrTweet;
        }
    }

    public tweet: ITweetIdentifier;
    public trimUser?: boolean;
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
