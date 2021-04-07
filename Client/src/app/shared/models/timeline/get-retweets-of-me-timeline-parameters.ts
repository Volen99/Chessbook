import {ITimelineRequestParameters} from "./timeline-request-parameters";

// For more information visit: https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me
export interface IGetRetweetsOfMeTimelineParameters extends ITimelineRequestParameters {
  // Include users entities.
  includeUserEntities?: boolean;
}


