import {ITimelineRequestParameters, TimelineRequestParameters} from "./timeline-request-parameters";
import {PostSortField} from "../../posts/models/post-sort-field.type";
import {ComponentPaginationLight} from "../../../core/rest/component-pagination.model";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline
export interface IGetHomeTimelineParameters extends ITimelineRequestParameters {
  // Exclude reply tweets from the result set.
  excludeReplies: boolean;
}

export class GetHomeTimelineParameters extends TimelineRequestParameters implements IGetHomeTimelineParameters {
  constructor(newPagination: ComponentPaginationLight, sort: PostSortField, skipCount: boolean) {
    super();

    this.postPagination = newPagination;
    this.sort = sort;
    this.skipCount = skipCount;

    super.pageSize = 200;
  }

  public excludeReplies: boolean;

  public postPagination: any;
  public sort: PostSortField;
  public skipCount: boolean;
}
