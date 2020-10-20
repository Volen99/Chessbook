import {IListParameters, TwitterListParameters} from "../TwitterListParameters";
import {IUserIdentifier} from "../../../Models/Interfaces/IUserIdentifier";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import {UserIdentifier} from "../../../Models/UserIdentifier";
import Type from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create
export interface IAddMemberToListParameters extends IListParameters {
  // User to add as a member of the list
  users: IUserIdentifier;
}

export class AddMemberToListParameters extends TwitterListParameters implements IAddMemberToListParameters {
  constructor(list: ITwitterListIdentifier, userIdOrUsernameOrUserIdentifier: number | string | IUserIdentifier) {
    super(list);

    if (Type.isNumber(userIdOrUsernameOrUserIdentifier) || Type.isString(userIdOrUsernameOrUserIdentifier)) {
      this.users = new UserIdentifier(userIdOrUsernameOrUserIdentifier);

    } else {
      this.users = userIdOrUsernameOrUserIdentifier;
    }
  }

  public users: IUserIdentifier;
}

// public AddMemberToListParameters(ITwitterListIdentifier list, long userId) : this(list, new UserIdentifier(userId))
// {
// }
//
// public AddMemberToListParameters(ITwitterListIdentifier list, string username) : this(list, new UserIdentifier(username))
// {
// }
//
// public AddMemberToListParameters(ITwitterListIdentifier list, IUserIdentifier user) : base(list)
// {
//   User = user;
// }
