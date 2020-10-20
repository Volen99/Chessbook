import {CursorQueryParameters, ICursorQueryParameters} from "../../CursorQueryParameters";
import {TwitterLimits} from "../../../Settings/TwitterLimits";

// For more information visit: https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships
export interface IGetAccountListMembershipsParameters extends ICursorQueryParameters {
  // When set to true the request will return only the lists the authenticating user owns,
  // and the specified user is a member of.
  onlyRetrieveAccountLists?: boolean;
}

export class GetAccountListMembershipsParameters extends CursorQueryParameters implements IGetAccountListMembershipsParameters {
  constructor(parameters?: IGetAccountListMembershipsParameters) {
    if (parameters) {
      super(parameters);
      this.onlyRetrieveAccountLists = parameters?.onlyRetrieveAccountLists;
      return;
    }

    super.pageSize = TwitterLimits.DEFAULTS.LISTS_GET_USER_MEMBERSHIPS_MAX_PAGE_SIZE;
  }

  public onlyRetrieveAccountLists?: boolean;
}


// public GetAccountListMembershipsParameters()
// {
//
// }
//
// public GetAccountListMembershipsParameters(IGetAccountListMembershipsParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.LISTS_GET_USER_MEMBERSHIPS_MAX_PAGE_SIZE;
//   }
//
//   OnlyRetrieveAccountLists = parameters?.OnlyRetrieveAccountLists;
// }
