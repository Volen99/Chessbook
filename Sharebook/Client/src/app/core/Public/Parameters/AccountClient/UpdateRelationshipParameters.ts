import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";

// https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-update
export interface IUpdateRelationshipParameters extends ICustomRequestParameters {
  // User with whom you want to change the friendship
  user: IUserIdentifier;

  // Enable/disable device notifications from the user.
  enableRetweets?: boolean;

  // Enable/disable Retweets from the user.
  enableDeviceNotifications?: boolean;
}

export class UpdateRelationshipParameters extends CustomRequestParameters implements IUpdateRelationshipParameters {
  constructor(userId?: number, username?: string, user?: IUserIdentifier,
              source?: IUpdateRelationshipParameters) {
    if (source) {
      super(source);
      this.user = source?.user;
      this.enableRetweets = source?.enableRetweets;
      this.enableDeviceNotifications = source?.enableDeviceNotifications;
    } else if (userId) {
      this.user = new UserIdentifier(userId);
    } else if (username) {
      this.user = new UserIdentifier(username);
    } else if (user) {
      this.user = user;
    }
  }

  public user: IUserIdentifier;
  public enableRetweets?: boolean;
  public enableDeviceNotifications?: boolean;
}


// public UpdateRelationshipParameters(userId: long) : this(new UserIdentifier(userId))
// {
// }

// public UpdateRelationshipParameters(string username) : this(new UserIdentifier(username))
// {
// }

// public UpdateRelationshipParameters(IUserIdentifier user)
// {
//     User = user;
// }

// public UpdateRelationshipParameters(IUpdateRelationshipParameters source) : base(source)
// {
//     User = source?.User;
//     EnableRetweets = source?.EnableRetweets;
//     EnableDeviceNotifications = source?.EnableDeviceNotifications;
// }
