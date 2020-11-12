import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {GetListsSubscribedByAccountParameters, IGetListsSubscribedByAccountParameters} from "./GetListsSubscribedByAccountParameters";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-list
export interface IGetListsSubscribedByUserParameters extends IGetListsSubscribedByAccountParameters {
  // The ID of the user for whom to return results.
  // <para>If not specified, it will return the results for the account's user.</para>
  user: IUserIdentifier;
}

export class GetListsSubscribedByUserParameters extends GetListsSubscribedByAccountParameters implements IGetListsSubscribedByUserParameters {
  constructor(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier
    | IGetListsSubscribedByUserParameters | IGetListsSubscribedByAccountParameters) {
    if (Type.isNumber(userIdOrUsernameOrUserOrParameters) || Type.isString(userIdOrUsernameOrUserOrParameters)
      || GetListsSubscribedByUserParameters.isIUserIdentifier(userIdOrUsernameOrUserOrParameters)) {
      super();

      if (GetListsSubscribedByUserParameters.isIUserIdentifier(userIdOrUsernameOrUserOrParameters)) {
        this.user = userIdOrUsernameOrUserOrParameters;
      } else {
        this.user = new UserIdentifier(userIdOrUsernameOrUserOrParameters);
      }
    } else {
      super(userIdOrUsernameOrUserOrParameters);

      if (GetListsSubscribedByUserParameters.isIGetListsSubscribedByUserParameters(userIdOrUsernameOrUserOrParameters)) {
        this.user = userIdOrUsernameOrUserOrParameters?.user;
      }
    }
  }

  public user: IUserIdentifier;

  private static isIUserIdentifier(userIdOrUsernameOrUserOrParameters: any): userIdOrUsernameOrUserOrParameters is IUserIdentifier {
    return (userIdOrUsernameOrUserOrParameters as IUserIdentifier).screenName !== undefined;
  }

  private static isIGetListsSubscribedByUserParameters(userIdOrUsernameOrUserOrParameters: any): userIdOrUsernameOrUserOrParameters is IGetListsSubscribedByUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IGetListsSubscribedByUserParameters).user !== undefined;
  }
}

// public GetListsSubscribedByUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetListsSubscribedByUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetListsSubscribedByUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public GetListsSubscribedByUserParameters(IGetListsSubscribedByUserParameters parameters) : base(parameters)
// {
//   User = parameters?.User;
// }
//
// public GetListsSubscribedByUserParameters(IGetListsSubscribedByAccountParameters parameters) : base(parameters)
// {
// }
