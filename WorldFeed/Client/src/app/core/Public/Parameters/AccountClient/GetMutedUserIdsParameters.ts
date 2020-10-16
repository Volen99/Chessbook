import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";

// For more information visit: https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-ids
export interface IGetMutedUserIdsParameters extends ICursorQueryParameters {
}

export class GetMutedUserIdsParameters extends CursorQueryParameters implements IGetMutedUserIdsParameters {
  constructor(source?: IGetMutedUserIdsParameters) {
    if (source) {
      super(source);
    } else {
      super();

      super.pageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE;
    }
  }
}

// public GetMutedUserIdsParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE;
// }
//
// public GetMutedUserIdsParameters(IGetMutedUserIdsParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE;
//   }
// }
