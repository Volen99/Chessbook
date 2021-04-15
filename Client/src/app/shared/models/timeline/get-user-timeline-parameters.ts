import {ITimelineRequestParameters, TimelineRequestParameters} from "./timeline-request-parameters";
import {IUserIdentifier} from "../users/user-identifier";
import {SharebookLimits} from "../../../helpers/sharebook-limits";
import {UserIdentifier} from "../../../core/models/UserIdentifier";
import {ComponentPaginationLight} from "../../../core/rest/component-pagination.model";
import {PostSortField} from "../../posts/models/post-sort-field.type";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
export interface IGetUserTimelineParameters extends ITimelineRequestParameters {
  // User from who you want to get the timeline
  user: IUserIdentifier;

  /// <summary>
  /// Include Retweets. When this parameter is set to false, Twitter will send you the same result set but without including the retweets.
  /// It means that if there are a total of 100 tweets, and the latest are 80 new tweets and 20 retweets.
  /// If the MaximumResultSet is set to 100, you will receive 80 tweets and not 100 even if there is more than 80 new tweets in the Timeline
  /// </summary>
  includeRetweets: boolean;

  // Exclude reply tweets from the result set.
  excludeReplies: boolean;
}


export class GetUserTimelineParameters extends TimelineRequestParameters implements IGetUserTimelineParameters {
  constructor(newPagination: ComponentPaginationLight, sort: PostSortField, skipCount: boolean, userId: number) {
    // if (GetUserTimelineParameters.isIGetUserTimelineParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
    //   super(userIdOrUsernameOrUserIdentifierOrParameters);
    //
    //   super.pageSize = userIdOrUsernameOrUserIdentifierOrParameters.pageSize;
    //   this.user = userIdOrUsernameOrUserIdentifierOrParameters.user;
    //   this.includeRetweets = userIdOrUsernameOrUserIdentifierOrParameters.includeRetweets;
    //   this.IncludeContributorDetails = userIdOrUsernameOrUserIdentifierOrParameters.excludeReplies;
    //   this.excludeReplies = userIdOrUsernameOrUserIdentifierOrParameters.excludeReplies;
    // } else {
      super();

    this.postPagination = newPagination;
    this.sort = sort;
    this.skipCount = skipCount;

      super.pageSize = 200;

      let userCurrent: IUserIdentifier;
      if (userId) {
        userCurrent = new UserIdentifier(userId);
      }

      this.user = userCurrent;
  }

  public user: IUserIdentifier;
  public includeRetweets: boolean;
  public IncludeContributorDetails: boolean;
  public excludeReplies: boolean;

  public postPagination: any;
  public sort: PostSortField;
  public skipCount: boolean;

  private static isIGetUserTimelineParameters(userIdOrUsernameOrUserIdentifierOrParameters: any): userIdOrUsernameOrUserIdentifierOrParameters is IGetUserTimelineParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetUserTimelineParameters).excludeReplies !== undefined;
  }
}
