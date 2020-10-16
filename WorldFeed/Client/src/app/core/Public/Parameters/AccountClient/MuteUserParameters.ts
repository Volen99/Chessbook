import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-create
export interface IMuteUserParameters extends ICustomRequestParameters {
  // User that you want to mute
  user: IUserIdentifier;
}

export class MuteUserParameters extends CustomRequestParameters implements IMuteUserParameters {
  constructor(userId?: number, username?: string, user?: IUserIdentifier,
              source?: IMuteUserParameters) {
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

// public MuteUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public MuteUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public MuteUserParameters(IUserIdentifier user)
// {
//     User = user;
// }
//
// public MuteUserParameters(IMuteUserParameters source) : base(source)
// {
//     User = source?.User;
// }
