import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-blocks-create
export interface IBlockUserParameters extends ICustomRequestParameters {
  // The user that you wish to block
  user: IUserIdentifier;
}

export class BlockUserParameters extends CustomRequestParameters implements IBlockUserParameters {
  constructor(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IBlockUserParameters) {
    if (BlockUserParameters.isIBlockUserParameters(userIdOrUsernameOrUserOrParameters)) {
      super(userIdOrUsernameOrUserOrParameters);

      this.user = userIdOrUsernameOrUserOrParameters?.user;
    } else {
      super();

      let userCurrent: IUserIdentifier;
      if (Type.isString(userIdOrUsernameOrUserOrParameters) || Type.isNumber(userIdOrUsernameOrUserOrParameters)) {
        userCurrent = new UserIdentifier(userIdOrUsernameOrUserOrParameters);
      } else {
        userCurrent = userIdOrUsernameOrUserOrParameters;
      }

      this.user = userCurrent;
    }
  }

  public user: IUserIdentifier;

  private static isIBlockUserParameters(userIdOrUsernameOrUserOrParameters: number | string | IUserIdentifier | IBlockUserParameters):
    userIdOrUsernameOrUserOrParameters is IBlockUserParameters {
    return (userIdOrUsernameOrUserOrParameters as IBlockUserParameters).user !== undefined;
  }
}


// public BlockUserParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public BlockUserParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public BlockUserParameters(IUserIdentifier user)
// {
//   User = user;
// }
//
// public BlockUserParameters(IBlockUserParameters source) : base(source)
// {
//   User = source?.User;
// }
