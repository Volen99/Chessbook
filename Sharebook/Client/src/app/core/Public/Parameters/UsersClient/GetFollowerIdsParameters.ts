import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import {SharebookLimits} from "../../Settings/SharebookLimits";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids
export interface IGetFollowerIdsParameters extends ICursorQueryParameters {
  // A unique identifier of a user
  user: IUserIdentifier;
}

export class GetFollowerIdsParameters extends CursorQueryParameters implements IGetFollowerIdsParameters {
  constructor(usernameOrUserIdOrUserOrParameters: | string | number | IUserIdentifier | IGetFollowerIdsParameters) {
    if (GetFollowerIdsParameters.isIGetFollowerIdsParameters(usernameOrUserIdOrUserOrParameters)) {
      super(usernameOrUserIdOrUserOrParameters);

      this.user = usernameOrUserIdOrUserOrParameters.user;
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;

      if (Type.isString(usernameOrUserIdOrUserOrParameters) || Type.isNumber(usernameOrUserIdOrUserOrParameters)) {
        this.user = new UserIdentifier(usernameOrUserIdOrUserOrParameters);
      } else if (GetFollowerIdsParameters.isIUserIdentifier(usernameOrUserIdOrUserOrParameters)) {
        this.user = usernameOrUserIdOrUserOrParameters;
      }
    }
  }

  public user: IUserIdentifier;

  private static isIUserIdentifier(usernameOrUserIdOrUserOrParameters: | string | number | IUserIdentifier | IGetFollowerIdsParameters):
    usernameOrUserIdOrUserOrParameters is IUserIdentifier {
    return (usernameOrUserIdOrUserOrParameters as IUserIdentifier).id !== undefined;
  }

  private static isIGetFollowerIdsParameters(usernameOrUserIdOrUserOrParameters: | string | number | IUserIdentifier | IGetFollowerIdsParameters):
    usernameOrUserIdOrUserOrParameters is IGetFollowerIdsParameters {
    return (usernameOrUserIdOrUserOrParameters as IGetFollowerIdsParameters).user !== undefined;
  }
}


// public GetFollowerIdsParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetFollowerIdsParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetFollowerIdsParameters(IUserIdentifier user)
// {
//   PageSize = TwitterLimits.DEFAULTS.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;
//   User = user;
// }
//
// public GetFollowerIdsParameters(IGetFollowerIdsParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;
//     return;
//   }
//
//   User = parameters.User;
// }
