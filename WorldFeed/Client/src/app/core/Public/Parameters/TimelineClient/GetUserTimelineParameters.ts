import {ITimelineRequestParameters, TimelineRequestParameters} from "../TimelineRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from '../../Models/UserIdentifier';
import {TwitterLimits} from "../../Settings/TwitterLimits";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
export interface IGetUserTimelineParameters extends ITimelineRequestParameters {
  // User from who you want to get the timeline
  User: IUserIdentifier;

  /// <summary>
  /// Include Retweets. When this parameter is set to false, Twitter will send you the same result set but without including the retweets.
  /// It means that if there are a total of 100 tweets, and the latest are 80 new tweets and 20 retweets.
  /// If the MaximumResultSet is set to 100, you will receive 80 tweets and not 100 even if there is more than 80 new tweets in the Timeline
  /// </summary>
  IncludeRetweets: boolean;

  // Exclude reply tweets from the result set.
  ExcludeReplies: boolean;
}

export class GetUserTimelineParameters extends TimelineRequestParameters implements IGetUserTimelineParameters {
  constructor(userIdOrUsernameOrUserIdentifierOrParameters: number | string | IUserIdentifier | IGetUserTimelineParameters) {
    if (GetUserTimelineParameters.isIGetUserTimelineParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      super(userIdOrUsernameOrUserIdentifierOrParameters);

      super.PageSize = userIdOrUsernameOrUserIdentifierOrParameters.PageSize;
      this.User = userIdOrUsernameOrUserIdentifierOrParameters.User;
      this.IncludeRetweets = userIdOrUsernameOrUserIdentifierOrParameters.IncludeRetweets;
      this.IncludeContributorDetails = userIdOrUsernameOrUserIdentifierOrParameters.ExcludeReplies;
      this.ExcludeReplies = userIdOrUsernameOrUserIdentifierOrParameters.ExcludeReplies;
    } else {
      super();

      super.PageSize = TwitterLimits.DEFAULTS.TIMELINE_USER_PAGE_MAX_PAGE_SIZE;

      let userCurrent: IUserIdentifier;
      if (Type.isNumber(userIdOrUsernameOrUserIdentifierOrParameters) || Type.isString(userIdOrUsernameOrUserIdentifierOrParameters)) {
        userCurrent = new UserIdentifier(userIdOrUsernameOrUserIdentifierOrParameters);
      } else {
        userCurrent = userIdOrUsernameOrUserIdentifierOrParameters;
      }

      this.User = userCurrent;
    }
  }

  public User: IUserIdentifier;
  public IncludeRetweets: boolean;
  public IncludeContributorDetails: boolean;
  public ExcludeReplies: boolean;

  private static isIGetUserTimelineParameters(userIdOrUsernameOrUserIdentifierOrParameters: any): userIdOrUsernameOrUserIdentifierOrParameters is IGetUserTimelineParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IGetUserTimelineParameters).ExcludeReplies !== undefined;
  }
}


// public GetUserTimelineParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetUserTimelineParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetUserTimelineParameters(IUserIdentifier user)
// {
//   PageSize = TwitterLimits.DEFAULTS.TIMELINE_USER_PAGE_MAX_PAGE_SIZE;
//   User = user;
// }
//
// public GetUserTimelineParameters(IGetUserTimelineParameters source): base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.TIMELINE_USER_PAGE_MAX_PAGE_SIZE;
//     return;
//   }
//
//   PageSize = source.PageSize;
//   User = source.User;
//   IncludeRetweets = source.IncludeRetweets;
//   IncludeContributorDetails = source.ExcludeReplies;
//   ExcludeReplies = source.ExcludeReplies;
// }
