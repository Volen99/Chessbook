import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-destroy
export interface IUnblockUserParameters extends ICustomRequestParameters {
  // User that you want to unblock
  user: IUserIdentifier;
}

export class UnblockUserParameters extends CustomRequestParameters implements IUnblockUserParameters {
  constructor(userId?: number, username?: string, user?: IUserIdentifier, source?: IUnblockUserParameters) {
    if (source) {
      super(source);
      this.user = source?.user;
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
