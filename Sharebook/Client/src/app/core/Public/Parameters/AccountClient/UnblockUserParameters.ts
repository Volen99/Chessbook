import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-destroy
export interface IUnblockUserParameters extends ICustomRequestParameters {
  // User that you want to unblock
  user: IUserIdentifier;
}

export class UnblockUserParameters extends CustomRequestParameters implements IUnblockUserParameters {
  constructor(userIdOrUsernameOrUserIdentifierOrParameters: number | string | IUserIdentifier | IUnblockUserParameters) {
    if (UnblockUserParameters.isIUnblockUserParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      super(userIdOrUsernameOrUserIdentifierOrParameters);

      this.user = userIdOrUsernameOrUserIdentifierOrParameters?.user;
    } else {
      super();

      let userCurrent: IUserIdentifier;
      if (Type.isNumber(userIdOrUsernameOrUserIdentifierOrParameters) || Type.isString(userIdOrUsernameOrUserIdentifierOrParameters)) {
        userCurrent = new UserIdentifier(userIdOrUsernameOrUserIdentifierOrParameters);
      } else {
        userCurrent = userIdOrUsernameOrUserIdentifierOrParameters;
      }

      this.user = userCurrent;
    }
  }

  public user: IUserIdentifier;

  private static isIUnblockUserParameters(userIdOrUsernameOrUserIdentifierOrParameters: any):
    userIdOrUsernameOrUserIdentifierOrParameters is IUnblockUserParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IUnblockUserParameters).user !== undefined;
  }
}

// public UnblockUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public UnblockUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public UnblockUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public UnblockUserParameters(IUnblockUserParameters source) : base(source)
// {
//   User = source?.User;
// }
