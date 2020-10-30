import {IListParameters, TwitterListParameters} from "../TwitterListParameters";
import {IUserIdentifier} from "../../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../../Models/UserIdentifier";
import {TwitterListIdentifier} from "../../../Models/TwitterListIdentifier";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import Type from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create_all
export interface IAddMembersToListParameters extends IListParameters {
  // List of users to be added to the list
  users: Array<IUserIdentifier>;
}


export class AddMembersToListParameters extends TwitterListParameters implements IAddMembersToListParameters {
  // @ts-ignore // TODO: BUG! 🐜
  constructor(listIdOrListIdentifier: number | ITwitterListIdentifier, userIdsOrUsernamesOrUsers: Iterable<number | string | IUserIdentifier>) {
    let list: ITwitterListIdentifier;
    if (Type.isNumber(listIdOrListIdentifier)) {
      list = new TwitterListIdentifier(listIdOrListIdentifier);
    } else {
      list = listIdOrListIdentifier;
    }

    super(list);

    let users: Array<IUserIdentifier>;
    if (AddMembersToListParameters.isArrayFromIUserIdentifier(userIdsOrUsernamesOrUsers)) {
      users = userIdsOrUsernamesOrUsers;
    } else {
      if (typeof userIdsOrUsernamesOrUsers[0] === 'string') {
        users = [...userIdsOrUsernamesOrUsers].map(x => new UserIdentifier(x as string));
      } else {
        users = [...userIdsOrUsernamesOrUsers].map(x => new UserIdentifier(x as number));
      }
    }

    this.addUsers(users);
  }


  public users: Array<IUserIdentifier> = new Array<IUserIdentifier>();

  private static isArrayFromIUserIdentifier(userIdsOrUsernamesOrUsers: Iterable<number | string | IUserIdentifier>):
    userIdsOrUsernamesOrUsers is Array<IUserIdentifier> {
    return (userIdsOrUsernamesOrUsers as Array<IUserIdentifier>)[0].screenName !== undefined;
  }

  private addUsers(users: Array<IUserIdentifier>): void {
    for (let user of users) {
      this.users.push(user);
    }
  }
}


//
// public AddMembersToListParameters(long listId, IEnumerable<long> userIds)
//       : this(new TwitterListIdentifier(listId), userIds.Select(x => new UserIdentifier(x)))
//   {
//   }
//
//   public AddMembersToListParameters(long listId, IEnumerable<string> usernames)
//       : this(new TwitterListIdentifier(listId), usernames.Select(x => new UserIdentifier(x)))
//   {
//   }
//
//   public AddMembersToListParameters(long listId, IEnumerable<IUserIdentifier> users)
//     : this(new TwitterListIdentifier(listId), users)
//   {
//   }

// public AddMembersToListParameters(ITwitterListIdentifier list, IEnumerable<long> userIds)
//     : this(list, userIds.Select(x => new UserIdentifier(x)))
// {
// }
//
// public AddMembersToListParameters(ITwitterListIdentifier list, IEnumerable<string> usernames)
//     : this(list, usernames.Select(x => new UserIdentifier(x)))
// {
// }
//
// public AddMembersToListParameters(ITwitterListIdentifier list, IEnumerable<IUserIdentifier> users) : base(list)
// {
//     Users.AddRange(users);
// }
