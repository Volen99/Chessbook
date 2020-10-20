import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {UserIdentifier} from "../../Models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-destroy
export interface IUnmuteUserParameters extends ICustomRequestParameters {
  // User that you no longer want to mute
  user: IUserIdentifier;
}

export class UnmuteUserParameters extends CustomRequestParameters implements IUnmuteUserParameters {
  constructor(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IUnmuteUserParameters) {
    if (UnmuteUserParameters.isIUnmuteUserParameters(userIdOrUsernameOrUserOrParameters)) {
      super(userIdOrUsernameOrUserOrParameters);

      this.user = userIdOrUsernameOrUserOrParameters?.user;
    } else {
      super();

      if (Type.isString(userIdOrUsernameOrUserOrParameters) || Type.isNumber(userIdOrUsernameOrUserOrParameters)) {
        this.user = new UserIdentifier(userIdOrUsernameOrUserOrParameters);
      } else {
        this.user = userIdOrUsernameOrUserOrParameters;
      }
    }
  }

  public user: IUserIdentifier;

  private static isIUnmuteUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IUnmuteUserParameters):
    userIdOrUsernameOrUserOrParameters is IUnmuteUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IUnmuteUserParameters).user !== undefined;
  }
}

// public UnmuteUserParameters(userId: long) : this(new UserIdentifier(userId))
// {
// }
//
// public UnmuteUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public UnmuteUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public UnmuteUserParameters(IMuteUserParameters source) : base(source)
// {
//   User = source?.User;
// }
