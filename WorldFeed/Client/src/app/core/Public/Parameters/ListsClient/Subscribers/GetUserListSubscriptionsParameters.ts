import {IGetAccountListSubscriptionsParameters} from "./GetAccountListSubscriptionsParameters";
import {IUserIdentifier} from "../../../Models/Interfaces/IUserIdentifier";
import {CursorQueryParameters} from "../../CursorQueryParameters";
import {UserIdentifier} from '../../../Models/UserIdentifier';
import {IGetAccountListMembershipsParameters} from "../Members/GetAccountListMembershipsParameters";
import Type from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {IGetUserListMembershipsParameters} from "../Members/GetUserListMembershipsParameters";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions
export interface IGetUserListSubscriptionsParameters extends IGetAccountListSubscriptionsParameters {
  // User from whom you want the lists he is subscribed to
  user: IUserIdentifier;
}

export class GetUserListSubscriptionsParameters extends CursorQueryParameters implements IGetUserListSubscriptionsParameters {
  constructor(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetUserListSubscriptionsParameters | IGetAccountListSubscriptionsParameters) {
    if (GetUserListSubscriptionsParameters.isIGetUserListSubscriptionsParameters(userIdOrUsernameOrUserOrParameters)
      || GetUserListSubscriptionsParameters.isIGetAccountListSubscriptionsParameters(userIdOrUsernameOrUserOrParameters)) {
      super(userIdOrUsernameOrUserOrParameters);

      if (GetUserListSubscriptionsParameters.isIGetUserListSubscriptionsParameters(userIdOrUsernameOrUserOrParameters)) {
        this.user = userIdOrUsernameOrUserOrParameters?.user;
      }
    } else {
      super();

      if (Type.isNumber(userIdOrUsernameOrUserOrParameters) || Type.isString(userIdOrUsernameOrUserOrParameters)) {
        this.user = new UserIdentifier(userIdOrUsernameOrUserOrParameters);
      } else if (GetUserListSubscriptionsParameters.isIUserIdentifier(userIdOrUsernameOrUserOrParameters)) {
        this.user = userIdOrUsernameOrUserOrParameters;
      }
    }
  }

  public user: IUserIdentifier;

  private static isIUserIdentifier(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetAccountListMembershipsParameters | IGetUserListMembershipsParameters):
    userIdOrUsernameOrUserOrParameters is IUserIdentifier {
    return (userIdOrUsernameOrUserOrParameters as IUserIdentifier).screenName !== undefined;
  }

  private static isIGetUserListSubscriptionsParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetAccountListMembershipsParameters | IGetUserListMembershipsParameters):
    userIdOrUsernameOrUserOrParameters is IGetUserListSubscriptionsParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetUserListSubscriptionsParameters).user !== undefined;
  }

  private static isIGetAccountListSubscriptionsParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IGetAccountListMembershipsParameters | IGetUserListMembershipsParameters):
    userIdOrUsernameOrUserOrParameters is IGetAccountListSubscriptionsParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetAccountListSubscriptionsParameters).formattedCustomQueryParameters !== undefined;
  }
}


// public GetUserListSubscriptionsParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetUserListSubscriptionsParameters(string username) : this(new UserIdentifier(username))
// {
// }
// public GetUserListSubscriptionsParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public GetUserListSubscriptionsParameters(IGetUserListSubscriptionsParameters parameters) : base(parameters)
// {
//   User = parameters?.User;
// }
//
// public GetUserListSubscriptionsParameters(IGetAccountListSubscriptionsParameters parameters) : base(parameters)
// {
// }
