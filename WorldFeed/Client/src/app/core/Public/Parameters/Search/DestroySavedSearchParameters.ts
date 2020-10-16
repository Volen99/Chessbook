import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ISavedSearch} from "../../Models/Interfaces/ISavedSearch";

// For more information read: https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-destroy-id
export interface IDestroySavedSearchParameters extends ICustomRequestParameters {
  // The ID of the saved search.
  SavedSearchId: number;
}

export class DestroySavedSearchParameters extends CustomRequestParameters implements IDestroySavedSearchParameters {
  constructor(savedSearchIdOrSavedSearch: number | ISavedSearch) {
    super();

    if (typeof savedSearchIdOrSavedSearch === 'number') {
      this.SavedSearchId = savedSearchIdOrSavedSearch;
    } else {
      this.SavedSearchId = savedSearchIdOrSavedSearch.id;
    }
  }

  public SavedSearchId: number;
}


// public DestroySavedSearchParameters(long savedSearchId)
// {
//   SavedSearchId = savedSearchId;
// }
//
// public DestroySavedSearchParameters(ISavedSearch savedSearch)
// {
//   SavedSearchId = savedSearch.Id;
// }
