import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {SharebookLimits} from "../../Settings/SharebookLimits";

export interface IGetUserIdsYouRequestedToFollowParameters extends ICursorQueryParameters {

}

export class GetUserIdsYouRequestedToFollowParameters extends CursorQueryParameters implements IGetUserIdsYouRequestedToFollowParameters {
  constructor(source?: IGetUserIdsYouRequestedToFollowParameters) {
    if (source) {
      super(source);
      super.pageSize = source.pageSize;
      return;
    }

    super.pageSize = SharebookLimits.DEFAULTS.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE;
  }
}

// public GetUserIdsYouRequestedToFollowParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE;
// }
//
// public GetUserIdsYouRequestedToFollowParameters(IGetUserIdsYouRequestedToFollowParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE;
//     return;
//   }
//
//   PageSize = source.PageSize;
// }
