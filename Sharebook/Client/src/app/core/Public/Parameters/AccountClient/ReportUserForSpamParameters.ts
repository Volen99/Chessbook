import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {UserIdentifier} from "../../Models/UserIdentifier";

// https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-users-report_spam
export interface IReportUserForSpamParameters extends ICustomRequestParameters {
  // The user you want to block
  user: IUserIdentifier;

  // Whether you want to block the user in addition to report him
  performBlock?: boolean;
}

export class ReportUserForSpamParameters extends CustomRequestParameters implements IReportUserForSpamParameters {
  constructor(userId?: number, username?: string, user?: IUserIdentifier, source?: IReportUserForSpamParameters) {
    if (source) {
      super(source);
      this.user = source?.user;
      this.performBlock = source?.performBlock;
    } else if (userId) {
      this.user = new UserIdentifier(userId);
    } else if (username) {
      this.user = new UserIdentifier(username);
    } else if (user) {
      this.user = user;
    }
  }

  public user: IUserIdentifier;
  public performBlock?: boolean;
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
