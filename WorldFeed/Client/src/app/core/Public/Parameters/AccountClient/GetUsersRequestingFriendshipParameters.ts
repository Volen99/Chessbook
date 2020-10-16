import {TwitterLimits} from "../../Settings/TwitterLimits";
import {GetCursorUsersOptionalParameters, IGetCursorUsersOptionalParameters} from "../Optionals/GetCursorUsersOptionalParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "./GetUserIdsRequestingFriendshipParameters";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming
export interface IGetUsersRequestingFriendshipParameters extends IGetCursorUsersOptionalParameters, IGetUserIdsRequestingFriendshipParameters {
  // Page size when retrieving the users objects from Twitter
  getUsersPageSize: number;
}

export class GetUsersRequestingFriendshipParameters extends GetCursorUsersOptionalParameters implements IGetUsersRequestingFriendshipParameters {
  constructor(source?: IGetUsersRequestingFriendshipParameters) {
    if (source) {
      super(source);
      this.getUsersPageSize = source.getUsersPageSize;
      return;
    }

    this.getUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;

  }

  public getUsersPageSize: number;
}


//   public GetUsersRequestingFriendshipParameters()
//   {
//     GetUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
//   }
//
//   public GetUsersRequestingFriendshipParameters(IGetUsersRequestingFriendshipParameters source) : base(source)
// {
//   if (source == null)
//   {
//     GetUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
//     return;
//   }
//
//   GetUsersPageSize = source.GetUsersPageSize;
// }
