import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";
import ArgumentOutOfRangeException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentOutOfRangeException";

// For more information read : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-search
export interface ISearchUsersParameters extends ICustomRequestParameters {
  // Query to search for people.
  query: string;

  // Search result page to retrieve.
  page?: number;

  // Number of Users to Retrieve. Cannot be more than 1000 as per the documentation. | I am the documentation. 01.10.2020
  pageSize: number;

  // Retrieve the user entities.
  includeEntities?: boolean;
}

// https://dev.twitter.com/rest/reference/get/users/search
export class SearchUsersParameters extends CustomRequestParameters implements ISearchUsersParameters {
  constructor(queryOrParameters: string | ISearchUsersParameters) {
    if (SearchUsersParameters.isISearchUsersParameters(queryOrParameters)) {
      super(queryOrParameters);

      this.pageSize = queryOrParameters.pageSize;
      this.query = queryOrParameters.query;
      this.includeEntities = queryOrParameters.includeEntities;
      this.page = queryOrParameters.page;
    } else {
      this.pageSize = TwitterLimits.DEFAULTS.SEARCH_USERS_MAX_PAGE_SIZE;
      this.query = queryOrParameters;
      this.includeEntities = true;
      this.page = 1;
    }
  }

  public query: string;

  private _page?: number;

  get page(): number {  // int?
    return this._page;
  }

  set page(value: number) {
    if (value == null) {
      this._page = null;
    } else {
      if (this._page < 1) {
        throw new ArgumentOutOfRangeException(nameof(this.page), "Search users page number cannot be lower than 1");
      }

      this._page = value;
    }
  }

  public pageSize: number;

  public includeEntities?: boolean;

  private static isISearchUsersParameters(queryOrParameters: any): queryOrParameters is ISearchUsersParameters {
    return (queryOrParameters as ISearchUsersParameters).query !== undefined;
  }
}

// public SearchUsersParameters(string query)
// {
//     PageSize = TwitterLimits.DEFAULTS.SEARCH_USERS_MAX_PAGE_SIZE;
//     Query = query;
//     IncludeEntities = true;
//     Page = 1;
// }

// public SearchUsersParameters(ISearchUsersParameters source) : base(source)
// {
//     if (source == null)
//     {
//         PageSize = TwitterLimits.DEFAULTS.SEARCH_USERS_MAX_PAGE_SIZE;
//         return;
//     }
//
//     PageSize = source.PageSize;
//     Query = source.Query;
//     IncludeEntities = source.IncludeEntities;
//     Page = source.Page;
// }
