import {IUserIdentifier} from "../../../models/users/user-identifier";
import {CustomRequestParameters, ICustomRequestParameters} from "../../../models/query/custom-request-parameters";
import {UserIdentifier} from "../../../../core/models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-show
export interface IGetRelationshipBetweenParameters extends ICustomRequestParameters {
  // User from whom to check the relationship
  SourceUser: IUserIdentifier;

  // User to whom we want to check the relationship
  TargetUser: IUserIdentifier;
}

export class GetRelationshipBetweenParameters extends CustomRequestParameters implements IGetRelationshipBetweenParameters {
  constructor(sourceUserId: number, targetUserId: number) {
    super();

    this.SourceUser = new UserIdentifier(sourceUserId);
    this.TargetUser = new UserIdentifier(targetUserId);
  }

  SourceUser: IUserIdentifier;
  TargetUser: IUserIdentifier;
}


// public GetRelationshipBetweenParameters(long sourceUserId, long targetUser)
// {
//     SourceUser = new UserIdentifier(sourceUserId);
//     TargetUser = new UserIdentifier(targetUser);
// }
//
// public GetRelationshipBetweenParameters(long sourceUserId, string targetUser)
// {
//     SourceUser = new UserIdentifier(sourceUserId);
//     TargetUser = new UserIdentifier(targetUser);
// }

// public GetRelationshipBetweenParameters(long sourceUserId, IUserIdentifier targetUser)
// {
//     SourceUser = new UserIdentifier(sourceUserId);
//     TargetUser = targetUser;
// }

// public GetRelationshipBetweenParameters(string sourceUser, long targetUser)
// {
//     SourceUser = new UserIdentifier(sourceUser);
//     TargetUser = new UserIdentifier(targetUser);
// }
//
// public GetRelationshipBetweenParameters(string sourceUser, string targetUser)
// {
//     SourceUser = new UserIdentifier(sourceUser);
//     TargetUser = new UserIdentifier(targetUser);
// }
//
// public GetRelationshipBetweenParameters(string sourceUser, IUserIdentifier targetUser)
// {
//     SourceUser = new UserIdentifier(sourceUser);
//     TargetUser = targetUser;
// }

// public GetRelationshipBetweenParameters(IUserIdentifier sourceUser, long targetUser)
// {
//     SourceUser = sourceUser;
//     TargetUser = new UserIdentifier(targetUser);
// }
//
// public GetRelationshipBetweenParameters(IUserIdentifier sourceUser, string targetUser)
// {
//     SourceUser = sourceUser;
//     TargetUser = new UserIdentifier(targetUser);
// }
//
// public GetRelationshipBetweenParameters(IUserIdentifier sourceUser, IUserIdentifier targetUser)
// {
//     SourceUser = sourceUser;
//     TargetUser = targetUser;
// }

// public GetRelationshipBetweenParameters(IGetRelationshipBetweenParameters source) : base(source)
// {
//     SourceUser = source?.SourceUser;
//     TargetUser = source?.TargetUser;
// }
