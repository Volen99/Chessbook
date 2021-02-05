import {ITimelineRequestParameters} from "./timeline-request-parameters";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
export interface IGetUserTimelineParameters extends ITimelineRequestParameters {
  // User from who you want to get the timeline
  user: any; // IUserIdentifier;

  /// <summary>
  /// Include Retweets. When this parameter is set to false, Twitter will send you the same result set but without including the retweets.
  /// It means that if there are a total of 100 tweets, and the latest are 80 new tweets and 20 retweets.
  /// If the MaximumResultSet is set to 100, you will receive 80 tweets and not 100 even if there is more than 80 new tweets in the Timeline
  /// </summary>
  includeRetweets: boolean;

  // Exclude reply tweets from the result set.
  excludeReplies: boolean;
}
