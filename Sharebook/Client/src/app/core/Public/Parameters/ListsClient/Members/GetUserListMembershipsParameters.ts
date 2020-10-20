import {GetAccountListMembershipsParameters, IGetAccountListMembershipsParameters} from "./GetAccountListMembershipsParameters";
import {IUserIdentifier} from "../../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from '../../../Models/UserIdentifier';
import Type from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships
export interface IGetUserListMembershipsParameters extends IGetAccountListMembershipsParameters {
  // User from whom we want to get the lists he is a member of
  user: IUserIdentifier;
}

export class GetUserListMembershipsParameters extends GetAccountListMembershipsParameters implements IGetUserListMembershipsParameters {
  constructor(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetAccountListMembershipsParameters | IGetUserListMembershipsParameters) {
    if (GetUserListMembershipsParameters.isIGetAccountListMembershipsParameters(userIdOrUsernameOrUserOrParameters)
      || GetUserListMembershipsParameters.isIGetUserListMembershipsParameters(userIdOrUsernameOrUserOrParameters)) {
      super(userIdOrUsernameOrUserOrParameters);

      if (GetUserListMembershipsParameters.isIGetUserListMembershipsParameters(userIdOrUsernameOrUserOrParameters)) {
        this.user = userIdOrUsernameOrUserOrParameters?.user;
      }
    } else {
      super();

      if (Type.isNumber(userIdOrUsernameOrUserOrParameters) || Type.isString(userIdOrUsernameOrUserOrParameters)) {
        this.user = new UserIdentifier(userIdOrUsernameOrUserOrParameters);
      } else if (GetUserListMembershipsParameters.isIUserIdentifier(userIdOrUsernameOrUserOrParameters)) {
        this.user = userIdOrUsernameOrUserOrParameters;
      }
    }
  }

  public user: IUserIdentifier;

  private static isIUserIdentifier(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetAccountListMembershipsParameters | IGetUserListMembershipsParameters):
    userIdOrUsernameOrUserOrParameters is IUserIdentifier {
    return (userIdOrUsernameOrUserOrParameters as IUserIdentifier).screenName !== undefined;
  }

  private static isIGetAccountListMembershipsParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetAccountListMembershipsParameters | IGetUserListMembershipsParameters):
    userIdOrUsernameOrUserOrParameters is IGetAccountListMembershipsParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetAccountListMembershipsParameters).onlyRetrieveAccountLists !== undefined;
  }

  private static isIGetUserListMembershipsParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetAccountListMembershipsParameters | IGetUserListMembershipsParameters):
    userIdOrUsernameOrUserOrParameters is IGetUserListMembershipsParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetUserListMembershipsParameters).onlyRetrieveAccountLists !== undefined;
  }
}

// public GetUserListMembershipsParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetUserListMembershipsParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetUserListMembershipsParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public GetUserListMembershipsParameters(IGetAccountListMembershipsParameters parameters) : base(parameters)
// {
// }
//
// public GetUserListMembershipsParameters(IGetUserListMembershipsParameters parameters) : base(parameters)
// {
//   User = parameters?.User;
// }
