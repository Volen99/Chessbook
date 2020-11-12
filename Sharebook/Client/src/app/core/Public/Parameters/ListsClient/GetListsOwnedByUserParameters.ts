import {GetListsOwnedByAccountParameters, IGetListsOwnedByAccountParameters} from "./GetListsOwnedByAccountParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships
export interface IGetListsOwnedByUserParameters extends IGetListsOwnedByAccountParameters {
  // User from whom we want to get the owned lists
  user: IUserIdentifier;
}

export class GetListsOwnedByAccountByUserParameters extends GetListsOwnedByAccountParameters implements IGetListsOwnedByUserParameters {
  // @ts-ignore
  constructor(userIdOrUsernameOrUserOrAccountParametersOrUserParameters: number | string | IUserIdentifier
    | IGetListsOwnedByAccountParameters | IGetListsOwnedByUserParameters) {
    if (Type.isString(userIdOrUsernameOrUserOrAccountParametersOrUserParameters) || Type.isNumber(userIdOrUsernameOrUserOrAccountParametersOrUserParameters)) {
      super();

      this.user = new UserIdentifier(userIdOrUsernameOrUserOrAccountParametersOrUserParameters);
    } else if (GetListsOwnedByAccountByUserParameters.isIUserIdentifier(userIdOrUsernameOrUserOrAccountParametersOrUserParameters)) {
      super();
      this.user = userIdOrUsernameOrUserOrAccountParametersOrUserParameters;
    } else if (GetListsOwnedByAccountByUserParameters.isIGetListsOwnedByAccountParameters(userIdOrUsernameOrUserOrAccountParametersOrUserParameters)) {
      super(userIdOrUsernameOrUserOrAccountParametersOrUserParameters);
    } else {
      let parameters: IGetListsOwnedByUserParameters = userIdOrUsernameOrUserOrAccountParametersOrUserParameters as IGetListsOwnedByUserParameters;
      super(parameters);
      this.user = parameters?.user;  // 08.10.2020 :P
    }
  }

  public user: IUserIdentifier;

  private static isIUserIdentifier(userIdOrUsernameOrUserOrAccountParametersOrUserParameters: number | string
    | IUserIdentifier | IGetListsOwnedByAccountParameters | IGetListsOwnedByUserParameters):
    userIdOrUsernameOrUserOrAccountParametersOrUserParameters is IUserIdentifier {
    return (userIdOrUsernameOrUserOrAccountParametersOrUserParameters as IUserIdentifier).id !== undefined;
  }

  private static isIGetListsOwnedByAccountParameters(userIdOrUsernameOrUserOrAccountParametersOrUserParameters: number | string
    | IUserIdentifier | IGetListsOwnedByAccountParameters | IGetListsOwnedByUserParameters):
    userIdOrUsernameOrUserOrAccountParametersOrUserParameters is IGetListsOwnedByAccountParameters {
    return (userIdOrUsernameOrUserOrAccountParametersOrUserParameters as IGetListsOwnedByAccountParameters).cursor !== undefined;
  }
}


//       public GetListsOwnedByAccountByUserParameters(long userId) : this(new UserIdentifier(userId))
//     {
//     }
//
// public GetListsOwnedByAccountByUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetListsOwnedByAccountByUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public GetListsOwnedByAccountByUserParameters(IGetListsOwnedByAccountParameters parameters) : base(parameters)
// {
// }
//
// public GetListsOwnedByAccountByUserParameters(IGetListsOwnedByUserParameters parameters) : base(parameters)
// {
//   User = parameters?.User;
// }
