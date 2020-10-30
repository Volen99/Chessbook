import {Inject, Injectable, InjectionToken} from "@angular/core";

import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {SharebookLimits} from "../../Settings/SharebookLimits";

// For more information visit: https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me
export interface IGetRetweetsOfMeTimelineParameters extends ITimelineRequestParameters {
  // Include user entities.
  includeUserEntities?: boolean;
}

export const IGetRetweetsOfMeTimelineParametersToken = new InjectionToken<IGetRetweetsOfMeTimelineParameters>('IGetRetweetsOfMeTimelineParameters', {
  providedIn: 'root',
  factory: () => new GetRetweetsOfMeTimelineParameters(),
});

@Injectable()
export class GetRetweetsOfMeTimelineParameters extends TimelineRequestParameters implements IGetRetweetsOfMeTimelineParameters {
  constructor(@Inject(IGetRetweetsOfMeTimelineParametersToken) source?: IGetRetweetsOfMeTimelineParameters) {
    if (source) {
      super(source);

      this.includeUserEntities = source.includeUserEntities;
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE;
    }
  }

  public includeUserEntities?: boolean;
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
