import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming
export interface IGetUserIdsRequestingFriendshipParameters extends ICursorQueryParameters {
}

export class GetUserIdsRequestingFriendshipParameters extends CursorQueryParameters implements IGetUserIdsRequestingFriendshipParameters {
  constructor(parameters?: IGetUserIdsRequestingFriendshipParameters) {
    if (parameters) {
      super(parameters);
      super.pageSize = parameters.pageSize;
      return;
    }

    super.pageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
  }
}


// public GetUserIdsRequestingFriendshipParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
// }
//
// public GetUserIdsRequestingFriendshipParameters(IGetUserIdsRequestingFriendshipParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
//     return;
//   }
//
// }
