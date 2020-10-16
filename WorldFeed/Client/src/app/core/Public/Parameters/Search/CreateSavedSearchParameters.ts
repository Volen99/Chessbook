import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information read: https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-create
export interface ICreateSavedSearchParameters extends ICustomRequestParameters {
  // The query of the search the user would like to save.
  Query: string;
}

export class CreateSavedSearchParameters extends CustomRequestParameters implements ICreateSavedSearchParameters {
  constructor(query: string) {
    super();
    this.Query = query;
  }

  public Query: string;
}
