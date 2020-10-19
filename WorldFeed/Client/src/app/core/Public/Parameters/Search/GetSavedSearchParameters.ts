import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information read : https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-show-id
export interface IGetSavedSearchParameters extends ICustomRequestParameters {
  // The ID of the saved search.
  savedSearchId: number;
}

export class GetSavedSearchParameters extends CustomRequestParameters implements IGetSavedSearchParameters {
  constructor(savedSearchId: number) {
    super();

    this.savedSearchId = savedSearchId;
  }

  public savedSearchId: number;
}
