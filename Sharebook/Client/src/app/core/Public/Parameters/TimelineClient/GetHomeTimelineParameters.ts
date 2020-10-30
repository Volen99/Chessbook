import {Inject, Injectable, InjectionToken} from "@angular/core";

import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {SharebookLimits} from "../../Settings/SharebookLimits";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline
export
interface IGetHomeTimelineParameters extends ITimelineRequestParameters {
  // Exclude reply tweets from the result set.
  excludeReplies: boolean;
}

export const IGetHomeTimelineParametersToken = new InjectionToken<IGetHomeTimelineParameters>('IGetHomeTimelineParameters', {
  providedIn: 'root',
  factory: () => new GetHomeTimelineParameters(),
});

@Injectable()
export class GetHomeTimelineParameters extends TimelineRequestParameters implements IGetHomeTimelineParameters {
  constructor(@Inject(IGetHomeTimelineParametersToken) source?: IGetHomeTimelineParameters) {
    if (source) {
      super(source);

      super.pageSize = source.pageSize;
      this.excludeReplies = source.excludeReplies;
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE;
    }
  }

  public excludeReplies: boolean;
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
