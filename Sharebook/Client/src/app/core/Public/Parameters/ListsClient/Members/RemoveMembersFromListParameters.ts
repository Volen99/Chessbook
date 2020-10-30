import {IListParameters, TwitterListParameters} from "../TwitterListParameters";
import {IUserIdentifier} from "../../../Models/Interfaces/IUserIdentifier";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import {TwitterListIdentifier} from "../../../Models/TwitterListIdentifier";
import {UserIdentifier} from "../../../Models/UserIdentifier";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy_all
export interface IRemoveMembersFromListParameters extends IListParameters {
  // Users to remove from the list
  users: Array<IUserIdentifier>;
}

export class RemoveMembersFromListParameters extends TwitterListParameters implements IRemoveMembersFromListParameters {
  // @ts-ignore
  constructor(listIdOrListIdentifier: number | ITwitterListIdentifier, userIdsOrUsernamesOrUsers: Iterable<number | string | IUserIdentifier>) {
    let list: ITwitterListIdentifier;
    if (typeof listIdOrListIdentifier !== 'number') {
      list = listIdOrListIdentifier;
    } else {
      list = new TwitterListIdentifier(listIdOrListIdentifier);
    }
    super(list);

    let users: Array<IUserIdentifier>;
    if (RemoveMembersFromListParameters.isIEnumerableFromIUserIdentifier(userIdsOrUsernamesOrUsers)) {
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

  private static isIEnumerableFromIUserIdentifier(userIdsOrUsernamesOrUsers: Iterable<number | string | IUserIdentifier>):
    userIdsOrUsernamesOrUsers is Array<IUserIdentifier> {
    return (userIdsOrUsernamesOrUsers as Array<IUserIdentifier>)[0].screenName !== undefined;
  }

  private addUsers(users: Array<IUserIdentifier>): void {
    for (let user of users) {
      this.users.push(user);
    }
  }

  // public RemoveMembersFromListParameters(long listId, IEnumerable<long> userIds)
  //       : this(new TwitterListIdentifier(listId), userIds.Select(x => new UserIdentifier(x)))
  //   {
  //   }
  //
  //   public RemoveMembersFromListParameters(long listId, IEnumerable<string> usernames)
  //       : this(new TwitterListIdentifier(listId), usernames.Select(x => new UserIdentifier(x)))
  //   {
  //   }
  //
  //   public RemoveMembersFromListParameters(long listId, IEnumerable<IUserIdentifier> users) : this(new TwitterListIdentifier(listId), users)
  //   {
  //   }
  //
  //   public RemoveMembersFromListParameters(ITwitterListIdentifier list, IEnumerable<long> userIds)
  //       : this(list, userIds.Select(x => new UserIdentifier(x)))
  //   {
  //   }
  //
  //   public RemoveMembersFromListParameters(ITwitterListIdentifier list, IEnumerable<string> usernames)
  //       : this(list, usernames.Select(x => new UserIdentifier(x)))
  //   {
  //   }
  //
  //   public RemoveMembersFromListParameters(ITwitterListIdentifier list, IEnumerable<IUserIdentifier> users) : base(list)
  //   {
  //       Users.AddRange(users);
  //   }

}
