import {GetUsersOptionalParameters, IGetUsersOptionalParameters} from "../Optionals/GetUsersOptionalParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show
export interface IGetUserParameters extends IGetUsersOptionalParameters {
  // User identifier
  User: IUserIdentifier;
}

export class GetUserParameters extends GetUsersOptionalParameters implements IGetUserParameters {
  constructor(userIdOrUsernameOrUser?: | number | string | IUserIdentifier, source?: IGetUserParameters) {
    if (userIdOrUsernameOrUser) {
      super();

      let userCurrent: IUserIdentifier;
      if (typeof userIdOrUsernameOrUser === 'string' || typeof userIdOrUsernameOrUser === 'number') {
        userCurrent = new UserIdentifier(userIdOrUsernameOrUser);
      } else if (userIdOrUsernameOrUser instanceof UserIdentifier) {
        userCurrent = userIdOrUsernameOrUser;
      }

      this.User = userCurrent;
    } else if (source) {
      super(source);

      this.User = source?.User;
    }
  }

  public User: IUserIdentifier;
}

// public GetUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public GetUserParameters(IGetUserParameters source) : base(source)
// {
//   User = source?.User;
// }
