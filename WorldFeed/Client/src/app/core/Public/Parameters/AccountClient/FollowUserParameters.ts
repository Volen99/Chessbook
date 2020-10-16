import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit: https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create
export interface IFollowUserParameters extends ICustomRequestParameters {
  // User that want to follow
  user: IUserIdentifier;

  // Enable notifications for the target user (twitter documentation name: follow)
  enableNotifications?: boolean;
}

export class FollowUserParameters extends CustomRequestParameters implements IFollowUserParameters {
  constructor(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IFollowUserParameters) {
    if (FollowUserParameters.isIFollowUserParameters(userIdOrUsernameOrUserOrParameters)) {
      super(userIdOrUsernameOrUserOrParameters);

      this.user = userIdOrUsernameOrUserOrParameters?.user;
      this.enableNotifications = userIdOrUsernameOrUserOrParameters?.enableNotifications;
    } else {
      let userCurrent: IUserIdentifier;
      if (Type.isNumber(userIdOrUsernameOrUserOrParameters) || Type.isString(userIdOrUsernameOrUserOrParameters)) {
        userCurrent = new UserIdentifier(userIdOrUsernameOrUserOrParameters);
      } else {
        userCurrent = userIdOrUsernameOrUserOrParameters;
      }

      this.user = userCurrent;
    }
  }

  public user: IUserIdentifier;
  public enableNotifications?: boolean;

  private static isIFollowUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IFollowUserParameters):
    userIdOrUsernameOrUserOrParameters is IFollowUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IFollowUserParameters).user !== undefined;
  }
}


// public FollowUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public FollowUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public FollowUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public FollowUserParameters(IFollowUserParameters parameters) : base(parameters)
// {
//   User = parameters?.User;
//   EnableNotifications = parameters?.EnableNotifications;
// }
