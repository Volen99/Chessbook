import {Inject, InjectionToken} from "@angular/core";

import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {SharebookLimits} from "../../Settings/SharebookLimits";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline
export interface IGetMentionsTimelineParameters extends ITimelineRequestParameters {
}

export const IGetMentionsTimelineParametersToken = new InjectionToken<IGetMentionsTimelineParameters>('IGetMentionsTimelineParameters', {
  providedIn: 'root',
  factory: () => new GetMentionsTimelineParameters(),
});

export class GetMentionsTimelineParameters extends TimelineRequestParameters implements IGetMentionsTimelineParameters {
  constructor(@Inject(IGetMentionsTimelineParametersToken) source?: IGetMentionsTimelineParameters) {
    if (source) {
      super(source);
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
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
