import {GetUsersOptionalParameters, IGetUsersOptionalParameters} from "../Optionals/GetUsersOptionalParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup
export interface IGetUsersParameters extends IGetUsersOptionalParameters {
  // User identifiers
  Users: IUserIdentifier[];
}

export class GetUsersParameters extends GetUsersOptionalParameters implements IGetUsersParameters {
  constructor(userIdsOrUsernameOrUserIdentifiersOrSource: number[] | string[] | IUserIdentifier[] | IGetUsersParameters) {
    if (GetUsersParameters.isIGetUsersParameters(userIdsOrUsernameOrUserIdentifiersOrSource)) {
      super(userIdsOrUsernameOrUserIdentifiersOrSource);
      this.Users = userIdsOrUsernameOrUserIdentifiersOrSource?.Users;
    } else {
      super();
      if (GetUsersParameters.isNumberArray(userIdsOrUsernameOrUserIdentifiersOrSource)) {
        this.Users = userIdsOrUsernameOrUserIdentifiersOrSource.map(userId => new UserIdentifier(userId) as IUserIdentifier); //.ToArray();
      } else if (GetUsersParameters.isStringArray(userIdsOrUsernameOrUserIdentifiersOrSource)) {
        this.Users = userIdsOrUsernameOrUserIdentifiersOrSource.map(userId => new UserIdentifier(userId) as IUserIdentifier); //.ToArray();
      } else if (GetUsersParameters.isIUserIdentifier(userIdsOrUsernameOrUserIdentifiersOrSource)) {
        this.Users = userIdsOrUsernameOrUserIdentifiersOrSource;
      }
    }
  }

  public Users: IUserIdentifier[];

  private static isNumberArray(userIdsOrUsernameOrUserIdentifiersOrSource: number[] | string[]
    | IUserIdentifier[] | IGetUsersParameters): userIdsOrUsernameOrUserIdentifiersOrSource is number[] {
    return (userIdsOrUsernameOrUserIdentifiersOrSource as number[])[0] !== undefined;
  }

  private static isStringArray(userIdsOrUsernameOrUserIdentifiersOrSource: number[] | string[]
    | IUserIdentifier[] | IGetUsersParameters): userIdsOrUsernameOrUserIdentifiersOrSource is string[] {
    return (userIdsOrUsernameOrUserIdentifiersOrSource as string[])[0] !== undefined;
  }

  private static isIGetUsersParameters(userIdsOrUsernameOrUserIdentifiersOrSource: number[] | string[]
    | IUserIdentifier[] | IGetUsersParameters): userIdsOrUsernameOrUserIdentifiersOrSource is IGetUsersParameters {
    return (userIdsOrUsernameOrUserIdentifiersOrSource as IGetUsersParameters).Users !== undefined;
  }

  private static isIUserIdentifier(userIdsOrUsernameOrUserIdentifiersOrSource: number[] | string[]
    | IUserIdentifier[] | IGetUsersParameters): userIdsOrUsernameOrUserIdentifiersOrSource is IUserIdentifier[] {
    return (userIdsOrUsernameOrUserIdentifiersOrSource as IUserIdentifier[])[0].id !== undefined;
  }
}

// public GetUsersParameters(long[] userIds)
// {
//   Users = userIds.Select(userId => new UserIdentifier(userId) as IUserIdentifier).ToArray();
// }
//
// public GetUsersParameters(string[] usernames)
// {
//   Users = usernames.Select(username => new UserIdentifier(username) as IUserIdentifier).ToArray();
// }
//
// public GetUsersParameters(IUserIdentifier[] userIdentifiers)
// {
//   Users = userIdentifiers;
// }
//
// public GetUsersParameters(IGetUsersParameters source) : base(source)
// {
//   Users = source?.Users;
// }
