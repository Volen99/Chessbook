import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline
export interface IGetHomeTimelineParameters extends ITimelineRequestParameters {
  // Exclude reply tweets from the result set.
  ExcludeReplies: boolean;
}

export class GetHomeTimelineParameters extends TimelineRequestParameters implements IGetHomeTimelineParameters {
  constructor(source?: IGetHomeTimelineParameters) {
    if (source) {
      super(source);

      super.PageSize = source.PageSize;
      this.ExcludeReplies = source.ExcludeReplies;
    } else {
      super();

      super.PageSize = TwitterLimits.DEFAULTS.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE;
    }
  }

  public ExcludeReplies: boolean;
}


// public GetHomeTimelineParameters()
// {
//     PageSize = TwitterLimits.DEFAULTS.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE;
// }
//
// public GetHomeTimelineParameters(IGetHomeTimelineParameters source): base(source)
// {
//     if (source == null)
//     {
//         PageSize = TwitterLimits.DEFAULTS.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE;
//         return;
//     }
//
//     PageSize = source.PageSize;
//     ExcludeReplies = source.ExcludeReplies;
// }
