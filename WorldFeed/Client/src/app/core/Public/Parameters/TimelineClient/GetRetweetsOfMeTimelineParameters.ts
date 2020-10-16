import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";

// For more information visit: https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me
export interface IGetRetweetsOfMeTimelineParameters extends ITimelineRequestParameters {
  // Include user entities.
  IncludeUserEntities?: boolean;
}

export class GetRetweetsOfMeTimelineParameters extends TimelineRequestParameters implements IGetRetweetsOfMeTimelineParameters {
  constructor(source?: IGetRetweetsOfMeTimelineParameters) {
    if (source) {
      super(source);

      this.IncludeUserEntities = source.IncludeUserEntities;
    } else {
      super();

      super.PageSize = TwitterLimits.DEFAULTS.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE;
    }
  }

  public IncludeUserEntities?: boolean;
}

// public GetRetweetsOfMeTimelineParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE;
// }
//
// public GetRetweetsOfMeTimelineParameters(IGetRetweetsOfMeTimelineParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE;
//     return;
//   }
//
//   IncludeUserEntities = source.IncludeUserEntities;
// }
