import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {IUnblockUserParameters} from "./UnblockUserParameters";

// https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-users-report_spam
export interface IReportUserForSpamParameters extends ICustomRequestParameters {
  // The user you want to block
  user: IUserIdentifier;

  // Whether you want to block the user in addition to report him
  performBlock?: boolean;
}

export class ReportUserForSpamParameters extends CustomRequestParameters implements IReportUserForSpamParameters {
  constructor(userIdOrUsernameOrUserIdentifierOrParameters: number | string | IUserIdentifier | IReportUserForSpamParameters) {
    if (ReportUserForSpamParameters.isIReportUserForSpamParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      super(userIdOrUsernameOrUserIdentifierOrParameters);

      this.user = userIdOrUsernameOrUserIdentifierOrParameters?.user;
      this.performBlock = userIdOrUsernameOrUserIdentifierOrParameters?.performBlock;
    } else {
      super();

      let userCurrent: IUserIdentifier;
      if (Type.isNumber(userIdOrUsernameOrUserIdentifierOrParameters) || Type.isString(userIdOrUsernameOrUserIdentifierOrParameters)) {
        userCurrent = new UserIdentifier(userIdOrUsernameOrUserIdentifierOrParameters);
      } else {
        userCurrent = userIdOrUsernameOrUserIdentifierOrParameters;
      }

      this.user = userCurrent;
    }
  }

  public user: IUserIdentifier;
  public performBlock?: boolean;

  private static isIReportUserForSpamParameters(userIdOrUsernameOrUserIdentifierOrParameters: any):
    userIdOrUsernameOrUserIdentifierOrParameters is IReportUserForSpamParameters {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IReportUserForSpamParameters).user !== undefined;
  }
}


// public ReportUserForSpamParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public ReportUserForSpamParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public ReportUserForSpamParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public ReportUserForSpamParameters(IReportUserForSpamParameters source) : base(source)
// {
//   User = source?.User;
//   PerformBlock = source?.PerformBlock;
// }
