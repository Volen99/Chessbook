import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {IReportUserForSpamParameters} from "./ReportUserForSpamParameters";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-create
export interface IMuteUserParameters extends ICustomRequestParameters {
  // User that you want to mute
  user: IUserIdentifier;
}

export class MuteUserParameters extends CustomRequestParameters implements IMuteUserParameters {
  constructor(userIdOrUsernameOrUserIdentifierOrParameters: number | string | IUserIdentifier | IMuteUserParameters) {
    if (MuteUserParameters.isIMuteUserParameters(userIdOrUsernameOrUserIdentifierOrParameters)) {
      super(userIdOrUsernameOrUserIdentifierOrParameters);

      this.user = userIdOrUsernameOrUserIdentifierOrParameters?.user;
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

  private static isIMuteUserParameters(userIdOrUsernameOrUserIdentifierOrParameters: any):
    userIdOrUsernameOrUserIdentifierOrParameters is IMuteUserParameters {
      return (userIdOrUsernameOrUserIdentifierOrParameters as IMuteUserParameters).user !== undefined;
    }
}

// public MuteUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public MuteUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public MuteUserParameters(IUserIdentifier user)
// {
//     User = user;
// }
//
// public MuteUserParameters(IMuteUserParameters source) : base(source)
// {
//     User = source?.User;
// }
