import {TwitterLimits} from "../../Settings/TwitterLimits";
import {GetCursorUsersOptionalParameters, IGetCursorUsersOptionalParameters} from "../Optionals/GetCursorUsersOptionalParameters";

// For more information visit: https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-list
export interface IGetMutedUsersParameters extends IGetCursorUsersOptionalParameters {
}

export class GetMutedUsersParameters extends GetCursorUsersOptionalParameters implements IGetMutedUsersParameters {
  constructor(source?: IGetMutedUsersParameters) {
    if (source) {
      super(source);
      super.pageSize = source.pageSize;
      return;
    }

    super.pageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
  }
}

// public GetMutedUsersParameters()
// {
//   super.PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
// }
//
// public GetMutedUsersParameters(IGetMutedUsersParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
//     return;
//   }
//
//   PageSize = source.PageSize;
// }
