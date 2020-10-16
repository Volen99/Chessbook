import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";

// For more information visit: https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids
export interface IGetBlockedUserIdsParameters extends ICursorQueryParameters {
}

export class GetBlockedUserIdsParameters extends CursorQueryParameters implements IGetBlockedUserIdsParameters {
  constructor(source?: IGetBlockedUserIdsParameters) {
    if (source) {
      super(source);

      super.pageSize = source.pageSize;
    } else {
      super();

      super.pageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
    }
  }
}

// public GetBlockedUserIdsParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
// }
//
// public GetBlockedUserIdsParameters(IGetBlockedUserIdsParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
//     return;
//   }
//
//   PageSize = source.PageSize;
// }
