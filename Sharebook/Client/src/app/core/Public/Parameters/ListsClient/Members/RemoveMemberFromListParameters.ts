import {IListParameters, TwitterListParameters} from "../TwitterListParameters";
import {IUserIdentifier} from "../../../Models/Interfaces/IUserIdentifier";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import {TwitterListIdentifier} from '../../../Models/TwitterListIdentifier';
import {UserIdentifier} from '../../../Models/UserIdentifier';
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy
export interface IRemoveMemberFromListParameters extends IListParameters {
  // User to remove from list
  user: IUserIdentifier;
}

export class RemoveMemberFromListParameters extends TwitterListParameters implements IRemoveMemberFromListParameters {
  constructor(listIdOrList: number | ITwitterListIdentifier, userIdOrUsernameOrUserIdentifier: number | string | IUserIdentifier) {
    if (!Type.isNumber(listIdOrList)) {
      super(listIdOrList);
    } else {
      super(new TwitterListIdentifier(listIdOrList));
    }

    let userCurrent: IUserIdentifier;
    if (this.isIUserIdentifier(userIdOrUsernameOrUserIdentifier)) {
      userCurrent = userIdOrUsernameOrUserIdentifier;
    } else {
      userCurrent = new UserIdentifier(userIdOrUsernameOrUserIdentifier);
    }

    this.user = userCurrent;
  }

  public user: IUserIdentifier;

  private isIUserIdentifier(userIdOrUsernameOrUserIdentifier: any): userIdOrUsernameOrUserIdentifier is IUserIdentifier {
    return (userIdOrUsernameOrUserIdentifier as IUserIdentifier).screenName !== undefined;
  }
}

// public RemoveMemberFromListParameters(long listId, long userId) : this(new TwitterListIdentifier(listId), new UserIdentifier(userId))
//   {
//   }
//
//   public RemoveMemberFromListParameters(long listId, string username) : this(new TwitterListIdentifier(listId), new UserIdentifier(username))
//   {
//   }

// public RemoveMemberFromListParameters(long listId, IUserIdentifier user) : this(new TwitterListIdentifier(listId), user)
// {
// }

// public RemoveMemberFromListParameters(ITwitterListIdentifier list, long userId) : this(list, new UserIdentifier(userId))
// {
// }
//
// public RemoveMemberFromListParameters(ITwitterListIdentifier list, string username) : this(list, new UserIdentifier(username))
// {
// }
//
// public RemoveMemberFromListParameters(ITwitterListIdentifier list, IUserIdentifier user) : base(list)
// {
//     User = user;
// }
