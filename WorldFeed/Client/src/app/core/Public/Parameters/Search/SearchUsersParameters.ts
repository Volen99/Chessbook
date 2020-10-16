import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {TwitterLimits} from "../../Settings/TwitterLimits";
import ArgumentOutOfRangeException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentOutOfRangeException";

// For more information read : https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-search
export interface ISearchUsersParameters extends ICustomRequestParameters {
  // Query to search for people.
  Query: string;

  // Search result page to retrieve.
  Page?: number;

  // Number of Users to Retrieve. Cannot be more than 1000 as per the documentation. | I am the documentation. 01.10.2020
  PageSize: number;

  // Retrieve the user entities.
  IncludeEntities?: boolean;
}

// https://dev.twitter.com/rest/reference/get/users/search
export class SearchUsersParameters extends CustomRequestParameters implements ISearchUsersParameters {
  constructor(queryOrParameters: string | ISearchUsersParameters) {
    if (SearchUsersParameters.isISearchUsersParameters(queryOrParameters)) {
      super(queryOrParameters);

      this.PageSize = queryOrParameters.PageSize;
      this.Query = queryOrParameters.Query;
      this.IncludeEntities = queryOrParameters.IncludeEntities;
      this.Page = queryOrParameters.Page;
    } else {
      this.PageSize = TwitterLimits.DEFAULTS.SEARCH_USERS_MAX_PAGE_SIZE;
      this.Query = queryOrParameters;
      this.IncludeEntities = true;
      this.Page = 1;
    }
  }

  public Query: string;

  private _page?: number;

  get Page(): number {  // int?
    return this._page;
  }

  set Page(value: number) {
    if (value == null) {
      this._page = null;
    } else {
      if (this._page < 1) {
        throw new ArgumentOutOfRangeException(nameof(this.Page), "Search users page number cannot be lower than 1");
      }

      this._page = value;
    }
  }

  public PageSize: number;

  public IncludeEntities?: boolean;

  private static isISearchUsersParameters(queryOrParameters: any): queryOrParameters is ISearchUsersParameters {
    return (queryOrParameters as ISearchUsersParameters).Query !== undefined;
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
