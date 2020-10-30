import {CursorQueryParameters, ICursorQueryParameters} from "../../CursorQueryParameters";
import {SharebookLimits} from "../../../Settings/SharebookLimits";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions
export interface IGetAccountListSubscriptionsParameters extends ICursorQueryParameters {
}

export class GetAccountListSubscriptionsParameters extends CursorQueryParameters implements IGetAccountListSubscriptionsParameters {
  constructor(parameters?: IGetAccountListSubscriptionsParameters) {
    if (parameters) {
      super(parameters);
    } else {
      super.pageSize = SharebookLimits.DEFAULTS.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE;
    }
  }
}

// public GetAccountListSubscriptionsParameters()
// {
//     PageSize = TwitterLimits.DEFAULTS.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE;
// }
//
// public GetAccountListSubscriptionsParameters(IGetAccountListSubscriptionsParameters parameters) : base(parameters)
// {
//     if (parameters == null)
//     {
//         PageSize = TwitterLimits.DEFAULTS.LISTS_GET_USER_SUBSCRIPTIONS_MAX_PAGE_SIZE;
//     }
// }
