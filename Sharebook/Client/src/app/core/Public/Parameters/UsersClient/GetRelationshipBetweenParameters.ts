import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-show
export interface IGetRelationshipBetweenParameters extends ICustomRequestParameters {
  // User from whom to check the relationship
  SourceUser: IUserIdentifier;

  // User to whom we want to check the relationship
  TargetUser: IUserIdentifier;
}

export class GetRelationshipBetweenParameters extends CustomRequestParameters implements IGetRelationshipBetweenParameters {
  constructor(sourceUserIdOrSourceUserStringOrSourceUserOrParameters: number | string | IUserIdentifier | IGetRelationshipBetweenParameters,
              targetUserNumberOrTargetUserStringOrTargetUserSource?: number | string | IUserIdentifier) {

    if (GetRelationshipBetweenParameters.isIGetRelationshipBetweenParameters(sourceUserIdOrSourceUserStringOrSourceUserOrParameters)) {
      super(sourceUserIdOrSourceUserStringOrSourceUserOrParameters);

      this.SourceUser = sourceUserIdOrSourceUserStringOrSourceUserOrParameters?.SourceUser;
      this.TargetUser = sourceUserIdOrSourceUserStringOrSourceUserOrParameters?.TargetUser;
    } else {
      super();

      if (Type.isNumber(sourceUserIdOrSourceUserStringOrSourceUserOrParameters)) {
        if (Type.isNumber(targetUserNumberOrTargetUserStringOrTargetUserSource) || Type.isString(targetUserNumberOrTargetUserStringOrTargetUserSource)) {
          this.SourceUser = new UserIdentifier(sourceUserIdOrSourceUserStringOrSourceUserOrParameters);
          this.TargetUser = new UserIdentifier(targetUserNumberOrTargetUserStringOrTargetUserSource);
        } else {
          this.SourceUser = new UserIdentifier(sourceUserIdOrSourceUserStringOrSourceUserOrParameters);
          this.TargetUser = targetUserNumberOrTargetUserStringOrTargetUserSource;
        }
      } else if (Type.isString(sourceUserIdOrSourceUserStringOrSourceUserOrParameters)) {
        if (Type.isNumber(targetUserNumberOrTargetUserStringOrTargetUserSource) || Type.isString(targetUserNumberOrTargetUserStringOrTargetUserSource)) {
          this.SourceUser = new UserIdentifier(sourceUserIdOrSourceUserStringOrSourceUserOrParameters);
          this.TargetUser = new UserIdentifier(targetUserNumberOrTargetUserStringOrTargetUserSource);
        } else {
          this.SourceUser = new UserIdentifier(sourceUserIdOrSourceUserStringOrSourceUserOrParameters);
          this.TargetUser = targetUserNumberOrTargetUserStringOrTargetUserSource;
        }
      } else if (GetRelationshipBetweenParameters.isIUserIdentifier(sourceUserIdOrSourceUserStringOrSourceUserOrParameters)) {
        if (Type.isNumber(targetUserNumberOrTargetUserStringOrTargetUserSource) || Type.isString(targetUserNumberOrTargetUserStringOrTargetUserSource)) {
          this.SourceUser = sourceUserIdOrSourceUserStringOrSourceUserOrParameters;
          this.TargetUser = new UserIdentifier(targetUserNumberOrTargetUserStringOrTargetUserSource);
        } else {
          this.SourceUser = sourceUserIdOrSourceUserStringOrSourceUserOrParameters;
          this.TargetUser = targetUserNumberOrTargetUserStringOrTargetUserSource;
        }
      }
    }
  }

  public SourceUser: IUserIdentifier;
  public TargetUser: IUserIdentifier;

  private static isIGetRelationshipBetweenParameters(sourceUserIdOrSourceUserStringOrSourceUserOrParameters: number | string | IUserIdentifier | IGetRelationshipBetweenParameters):
    sourceUserIdOrSourceUserStringOrSourceUserOrParameters is IGetRelationshipBetweenParameters {
    return (sourceUserIdOrSourceUserStringOrSourceUserOrParameters as IGetRelationshipBetweenParameters).SourceUser !== undefined;
  }

  private static isIUserIdentifier(sourceUserIdOrSourceUserStringOrSourceUserOrParameters: number | string | IUserIdentifier | IGetRelationshipBetweenParameters):
    sourceUserIdOrSourceUserStringOrSourceUserOrParameters is IUserIdentifier {
    return (sourceUserIdOrSourceUserStringOrSourceUserOrParameters as IUserIdentifier).id !== undefined;
  }
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
