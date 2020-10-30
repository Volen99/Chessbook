import {GetCursorUsersOptionalParameters, IGetCursorUsersOptionalParameters} from "../Optionals/GetCursorUsersOptionalParameters";
import {SharebookLimits} from "../../Settings/SharebookLimits";

// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-list
export interface IGetBlockedUsersParameters extends IGetCursorUsersOptionalParameters {
}

export class GetBlockedUsersParameters extends GetCursorUsersOptionalParameters implements IGetBlockedUsersParameters {
  constructor(source?: IGetBlockedUsersParameters) {
    if (source) {
      super(source);

      super.pageSize = source.pageSize;
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
    }
  }
}


// public GetBlockedUsersParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
// }
//
// public GetBlockedUsersParameters(IGetBlockedUsersParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
//     return;
//   }
//
//   PageSize = source.PageSize;
// }
