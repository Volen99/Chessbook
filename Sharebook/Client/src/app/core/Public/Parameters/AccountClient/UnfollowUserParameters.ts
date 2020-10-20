import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy
export interface IUnfollowUserParameters extends ICustomRequestParameters {
  // The user that you want to stop following
  user: IUserIdentifier;
}

export class UnfollowUserParameters extends CustomRequestParameters implements IUnfollowUserParameters {
  constructor(userId?: number, username?: string, user?: IUserIdentifier, parameters?: IUnfollowUserParameters) {
    if (parameters) {
      super(parameters);
      this.user = parameters?.user;
    } else if (userId) {
      this.user = new UserIdentifier(userId);
    } else if (username) {
      this.user = new UserIdentifier(username);
    } else if (user) {
      this.user = user;
    }
  }

  public user: IUserIdentifier;
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
