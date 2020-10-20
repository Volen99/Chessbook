import {GetFriendIdsParameters, IGetFriendIdsParameters} from "./GetFriendIdsParameters";
import {IGetUsersOptionalParameters} from "../Optionals/GetUsersOptionalParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {TwitterLimits} from "../../Settings/TwitterLimits";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids
export interface IGetFriendsParameters extends IGetFriendIdsParameters, IGetUsersOptionalParameters {
  // Page size when retrieving the users objects from Twitter
  GetUsersPageSize: number;
}

export class GetFriendsParameters extends GetFriendIdsParameters implements IGetFriendsParameters {
  constructor(usernameOrUserIdOrUserParameters: | string | number | IUserIdentifier | IGetFriendsParameters) {
    if (GetFriendsParameters.isIGetFriendsParameters(usernameOrUserIdOrUserParameters)) {
      super(usernameOrUserIdOrUserParameters);
      this.skipStatus = usernameOrUserIdOrUserParameters.skipStatus;
      this.includeEntities = usernameOrUserIdOrUserParameters.includeEntities;
      this.GetUsersPageSize = usernameOrUserIdOrUserParameters.GetUsersPageSize;
    } else {
      let userCurrent: IUserIdentifier;

      if (Type.isString(usernameOrUserIdOrUserParameters) || Type.isNumber(usernameOrUserIdOrUserParameters)) {
        userCurrent = new UserIdentifier(usernameOrUserIdOrUserParameters);
      } else {
        userCurrent = usernameOrUserIdOrUserParameters;
      }

      super(userCurrent);

      this.GetUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
      this.User = userCurrent;
    }
  }

  public includeEntities?: boolean;

  public skipStatus?: boolean;

  public GetUsersPageSize: number;

  private static isIGetFriendsParameters(usernameOrUserIdOrUserParameters: | string | number | IUserIdentifier | IGetFriendsParameters):
    usernameOrUserIdOrUserParameters is IGetFriendsParameters {
    return (usernameOrUserIdOrUserParameters as IGetFriendsParameters).User !== undefined;
  }
}

// public GetFriendsParameters(IUserIdentifier userIdentifier) : base(userIdentifier)
// {
//   GetUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
// }
//
// public GetFriendsParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetFriendsParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetFriendsParameters(IGetFriendsParameters parameters) : base(parameters)
// {
//   GetUsersPageSize = TwitterLimits.DEFAULTS.USERS_GET_USERS_MAX_SIZE;
//
//   if (parameters == null)
//   {
//     return;
//   }
//
//   SkipStatus = parameters.SkipStatus;
//   IncludeEntities = parameters.IncludeEntities;
//   GetUsersPageSize = parameters.GetUsersPageSize;
// }
