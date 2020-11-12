import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {SharebookLimits} from "../../Settings/SharebookLimits";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids
export interface IGetFriendIdsParameters extends ICursorQueryParameters {
  // User for who you want to get the friends from.
  user: IUserIdentifier;
}

export class GetFriendIdsParameters extends CursorQueryParameters implements IGetFriendIdsParameters {
  constructor(usernameOrUserIdOrUserOrParameters: | string | number | IUserIdentifier | IGetFriendIdsParameters) {
    if (GetFriendIdsParameters.isIGetFriendIdsParameters(usernameOrUserIdOrUserOrParameters)) {
      super(usernameOrUserIdOrUserOrParameters);

      this.user = usernameOrUserIdOrUserOrParameters.user;
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;

      if (Type.isString(usernameOrUserIdOrUserOrParameters) || Type.isNumber(usernameOrUserIdOrUserOrParameters)) {
        this.user = new UserIdentifier(usernameOrUserIdOrUserOrParameters);
      } else {
        this.user = usernameOrUserIdOrUserOrParameters;
      }
    }
  }

  public user: IUserIdentifier;

  private static isIGetFriendIdsParameters(usernameOrUserIdOrUserOrParameters: | string | number | IUserIdentifier | IGetFriendIdsParameters):
    usernameOrUserIdOrUserOrParameters is IGetFriendIdsParameters {
    return (usernameOrUserIdOrUserOrParameters as IGetFriendIdsParameters).user !== undefined;
  }
}


// public GetFriendIdsParameters(IUserIdentifier userIdentifier)
// {
//   PageSize = TwitterLimits.DEFAULTS.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;
//   User = userIdentifier;
// }
//
// public GetFriendIdsParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetFriendIdsParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetFriendIdsParameters(IGetFriendIdsParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;
//     return;
//   }
//
//   User = parameters.User;
// }
