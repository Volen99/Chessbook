import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships
export interface IGetListsOwnedByAccountParameters extends ICursorQueryParameters {
}

export class GetListsOwnedByAccountParameters extends CursorQueryParameters implements IGetListsOwnedByAccountParameters {
  constructor(parameters?: IGetListsOwnedByAccountParameters) {
    if (parameters) {
      super(parameters);
    } else {
      super();
      super.pageSize = TwitterLimits.DEFAULTS.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE;
    }
  }
}

// public GetListsOwnedByAccountParameters()
// {
//   PageSize = TwitterLimits.DEFAULTS.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE;
// }
//
// public GetListsOwnedByAccountParameters(IGetListsOwnedByAccountParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE;
//   }
// }
