import {IListParameters, TwitterListParameters} from "../TwitterListParameters";
import {IUserIdentifier} from "../../../Models/Interfaces/IUserIdentifier";
import {ITwitterListIdentifier} from "../../../Models/Interfaces/ITwitterListIdentifier";
import {TwitterListIdentifier} from "../../../Models/TwitterListIdentifier";
import {UserIdentifier} from "../../../Models/UserIdentifier";
import Type from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members-show
export interface ICheckIfUserIsMemberOfListParameters extends IListParameters {
  // User for whom we want to verify the membership
  user: IUserIdentifier;

  // Each tweet will include a node called "entities". This property offers a variety of
  // metadata about the tweet in a discreet structure, including: user_mentions, urls, and hashtags.
  includeEntities?: boolean;

  // Statuses will not be included in the returned user objects.
  skipStatus?: boolean;
}

export class CheckIfUserIsMemberOfListParameters extends TwitterListParameters implements ICheckIfUserIsMemberOfListParameters {
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
  public includeEntities?: boolean;
  public skipStatus?: boolean;

  private isIUserIdentifier(userIdOrUsernameOrUserIdentifier: any): userIdOrUsernameOrUserIdentifier is IUserIdentifier {
    return (userIdOrUsernameOrUserIdentifier as IUserIdentifier).screenName !== undefined;
  }
}

// public CheckIfUserIsMemberOfListParameters(long listId, long userId) : this(new TwitterListIdentifier(listId), new UserIdentifier(userId))
// {
// }
//
// public CheckIfUserIsMemberOfListParameters(long listId, string username) : this(new TwitterListIdentifier(listId), new UserIdentifier(username))
// {
// }
//
// public CheckIfUserIsMemberOfListParameters(long listId, IUserIdentifier user) : this(new TwitterListIdentifier(listId), user)
// {
// }
//
// public CheckIfUserIsMemberOfListParameters(ITwitterListIdentifier list, long userId) : this(list, new UserIdentifier(userId))
// {
// }
//
// public CheckIfUserIsMemberOfListParameters(ITwitterListIdentifier list, string username) : this(list, new UserIdentifier(username))
// {
// }
//
// public CheckIfUserIsMemberOfListParameters(ITwitterListIdentifier list, IUserIdentifier user) : base(list)
// {
//   User = user;
// }
