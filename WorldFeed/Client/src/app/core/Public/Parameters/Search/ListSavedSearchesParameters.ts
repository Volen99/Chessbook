import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information read: https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-list
export interface IListSavedSearchesParameters extends ICustomRequestParameters {
}

export class ListSavedSearchesParameters extends CustomRequestParameters implements IListSavedSearchesParameters {
  constructor() {
    super();
  }
}
