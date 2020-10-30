import {SharebookLimits} from "../../Settings/SharebookLimits";
import {GetCursorUsersOptionalParameters, IGetCursorUsersOptionalParameters} from "../Optionals/GetCursorUsersOptionalParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "./GetUserIdsYouRequestedToFollowParameters";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming
export interface IGetUsersYouRequestedToFollowParameters extends IGetCursorUsersOptionalParameters, IGetUserIdsYouRequestedToFollowParameters {
  // Page size when retrieving the users objects from Twitter
  getUsersPageSize: number;
}

export class GetUsersYouRequestedToFollowParameters extends GetCursorUsersOptionalParameters implements IGetUsersYouRequestedToFollowParameters {
  constructor(source?: IGetUsersYouRequestedToFollowParameters) {
    if (source) {
      super(source);
      this.getUsersPageSize = source.getUsersPageSize;
      return;
    }

    this.getUsersPageSize = SharebookLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
  }

  public getUsersPageSize: number;
}

// public GetUsersYouRequestedToFollowParameters()
// {
//   GetUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
// }
//
// public GetUsersYouRequestedToFollowParameters(IGetUsersYouRequestedToFollowParameters source) : base(source)
// {
//   if (source == null)
//   {
//     GetUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
//     return;
//   }
//
//   GetUsersPageSize = source.GetUsersPageSize;
// }
