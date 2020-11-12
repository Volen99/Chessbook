import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy
export interface IUnfollowUserParameters extends ICustomRequestParameters {
  // The user that you want to stop following
  user: IUserIdentifier;
}

export class UnfollowUserParameters extends CustomRequestParameters implements IUnfollowUserParameters {
  constructor(userIdOrUsernameOrUserIdentifierOrParameters: number | string | IUserIdentifier | IUnfollowUserParameters) {
    if (UnfollowUserParameters.isIUnfollowUserParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
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

  private static isIUnfollowUserParameters(userIdOrUsernameOrUserIdentifierOrParameters: any):
    userIdOrUsernameOrUserIdentifierOrParameters is IUnfollowUserParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IUnfollowUserParameters).user !== undefined;
  }
}


// public UnfollowUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public UnfollowUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public UnfollowUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public UnfollowUserParameters(IUnfollowUserParameters parameters) : base(parameters)
// {
//   User = parameters?.User;
// }
