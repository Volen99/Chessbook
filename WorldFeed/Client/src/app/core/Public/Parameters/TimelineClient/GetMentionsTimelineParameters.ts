import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline
export interface IGetMentionsTimelineParameters extends ITimelineRequestParameters {
}

export class GetMentionsTimelineParameters extends TimelineRequestParameters implements IGetMentionsTimelineParameters {
  constructor(source?: IGetMentionsTimelineParameters) {
    if (source) {
      super(source);
    } else {
      super();

      super.PageSize = TwitterLimits.DEFAULTS.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
    }
  }

  public IncludeContributorDetails: boolean;
}

// public GetMentionsTimelineParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
// }
//
// public GetMentionsTimelineParameters(IGetMentionsTimelineParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
//   }
// }
