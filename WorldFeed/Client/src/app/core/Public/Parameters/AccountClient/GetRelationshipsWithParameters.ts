import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import {IUser} from "../../Models/Interfaces/IUser";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-lookup
export interface IGetRelationshipsWithParameters extends ICustomRequestParameters {
  // Collection of users for whom you want to check the relationship of the client's user
  users: IUserIdentifier[];
}

export class GetRelationshipsWithParameters extends CustomRequestParameters implements IGetRelationshipsWithParameters {
  constructor(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters: number[] | string[] | IUserIdentifier[] | IUser[] | IGetRelationshipsWithParameters) {
    if (GetRelationshipsWithParameters.isIGetRelationshipsWithParameters(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)) {
      super(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters);

      this.users = userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters?.users;
    } else {
      super();

      if (GetRelationshipsWithParameters.isArrayFromNumber(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)) {
        this.users = userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters.map(x => new UserIdentifier(x)) as IUserIdentifier[];
      } else if (GetRelationshipsWithParameters.isArrayFromString(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)) {
        this.users = userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters.map(x => new UserIdentifier(x)) as IUserIdentifier[];
      } else if (GetRelationshipsWithParameters.isArrayFromUserIdentifier(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters)) {
        this.users = userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters;
      } else {
        this.users = userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters as IUserIdentifier[];
      }
    }
  }

  public users: IUserIdentifier[];

  private static isIGetRelationshipsWithParameters(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters: number[] | string[] | IUserIdentifier[] | IUser[] | IGetRelationshipsWithParameters):
    userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters is IGetRelationshipsWithParameters {
    return Type.isNumber((userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters as IGetRelationshipsWithParameters)[0]);
  }

  private static isArrayFromNumber(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters: number[] | string[] | IUserIdentifier[] | IUser[] | IGetRelationshipsWithParameters):
    userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters is Array<number> {
    return Type.isNumber((userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters as Array<number>)[0]);
  }

  private static isArrayFromString(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters: number[] | string[] | IUserIdentifier[] | IUser[] | IGetRelationshipsWithParameters):
    userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters is Array<string> {
    return Type.isString((userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters as Array<string>)[0]);
  }

  private static isArrayFromUserIdentifier(userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters: number[] | string[] | IUserIdentifier[] | IUser[] | IGetRelationshipsWithParameters):
    userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters is Array<IUserIdentifier> {
    return (userIdsOrUsernamesOrUsersIdentifiersUsersOrParameters as Array<IUserIdentifier>)[0].id !== undefined;
  }
}

// public GetRelationshipsWithParameters(long[] userIds)
// {
//   Users = userIds.Select(x => new UserIdentifier(x)).Cast<IUserIdentifier>().ToArray();
// }
//
// public GetRelationshipsWithParameters(string[] usernames)
// {
//   Users = usernames.Select(x => new UserIdentifier(x)).Cast<IUserIdentifier>().ToArray();
// }
//
// public GetRelationshipsWithParameters(IUserIdentifier[] users)
// {
//   Users = users;
// }
//
// public GetRelationshipsWithParameters(IUser[] users)
// {
//   Users = users.Cast<IUserIdentifier>().ToArray();
// }
//
// public GetRelationshipsWithParameters(IGetRelationshipsWithParameters source) : base(source)
// {
//   Users = source?.Users;
// }
