import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {IQueryParameterGenerator, IQueryParameterGeneratorToken, QueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import IEnumerable from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable';
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";
import {TweetSearchFilters} from "../../core/Public/Parameters/Enum/TweetSearchFilters";
import {ISearchTweetsParameters} from "../../core/Public/Parameters/Search/SearchTweetsParameters";
import {ISearchUsersParameters} from "../../core/Public/Parameters/Search/SearchUsersParameters";
import {ICreateSavedSearchParameters} from "../../core/Public/Parameters/Search/CreateSavedSearchParameters";
import {IGetSavedSearchParameters} from "../../core/Public/Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../core/Public/Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../core/Public/Parameters/Search/DestroySavedSearchParameters";
import {
  ISearchQueryParameterGenerator,
  ISearchQueryParameterGeneratorToken,
  SearchQueryParameterGenerator
} from "./SearchQueryParameterGenerator";
import {Inject, Injectable, InjectionToken} from "@angular/core";

export interface ISearchQueryGenerator {
  getSearchTweetsQuery(parameters: ISearchTweetsParameters, tweetMode: ComputedTweetMode): string;

  getSearchUsersQuery(parameters: ISearchUsersParameters): string;

  getCreateSavedSearchQuery(parameters: ICreateSavedSearchParameters): string;

  getSavedSearchQuery(parameters: IGetSavedSearchParameters): string;

  getListSavedSearchQuery(parameters: IListSavedSearchesParameters): string;

  getDestroySavedSearchQuery(parameters: IDestroySavedSearchParameters): string;
}

export const ISearchQueryGeneratorToken = new InjectionToken<ISearchQueryGenerator>('ISearchQueryGenerator', {
  providedIn: 'root',
  factory: () => new SearchQueryGenerator(Inject(QueryParameterGenerator), Inject(SearchQueryParameterGenerator)),
});

@Injectable()
export class SearchQueryGenerator implements ISearchQueryGenerator {
  private readonly _queryParameterGenerator: IQueryParameterGenerator;
  private readonly _searchQueryParameterGenerator: ISearchQueryParameterGenerator;

  constructor(@Inject(IQueryParameterGeneratorToken) queryParameterGenerator: IQueryParameterGenerator,
              @Inject(ISearchQueryParameterGeneratorToken) searchQueryParameterGenerator: ISearchQueryParameterGenerator) {
    this._queryParameterGenerator = queryParameterGenerator;
    this._searchQueryParameterGenerator = searchQueryParameterGenerator;
  }

  public getSearchTweetsQuery(parameters: ISearchTweetsParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Search_SearchTweets);

    query.addParameterToQuery("q", this.generateQueryParameter(parameters.query, parameters.filters));
    query.addParameterToQuery("geocode", this._searchQueryParameterGenerator.generateGeoCodeParameter(parameters.geoCode));

    query.addParameterToQuery("lang", parameters.lang?.getLanguageCode());
    query.addParameterToQuery("locale", parameters.locale);
    query.addParameterToQuery("result_type", parameters.searchType?.ToString().ToLowerInvariant());

    this._queryParameterGenerator.addMinMaxQueryParameters(query, parameters);

    query.addFormattedParameterToQuery(this._searchQueryParameterGenerator.generateSinceParameter(parameters.since));
    query.addFormattedParameterToQuery(this._searchQueryParameterGenerator.generateUntilParameter(parameters.until));
    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.toString();
  }

  private generateQueryParameter(query: string, tweetSearchFilters: TweetSearchFilters): string {
    if (tweetSearchFilters === TweetSearchFilters.None) {
      return query;
    }

    for (const entitiesTypeFilter of this.getFlags(tweetSearchFilters)) {
      if (entitiesTypeFilter !== TweetSearchFilters.None) {
        let filter = entitiesTypeFilter.GetQueryFilterName().ToLowerInvariant();
        query += ` filter:${filter}`;
      }
    }

    return query;
  }

        private  getFlags(tweetSearchFilters: TweetSearchFilters): IEnumerable<TweetSearchFilters>
        {
            for (const value: TweetSearchFilters of Enum.GetValues(tweetSearchFilters.GetType()))
            {
                if (tweetSearchFilters.HasFlag(value) && (tweetSearchFilters & value) === value)
                {
                    yield return value;
                }
            }
        }

  public getSearchUsersQuery(parameters: ISearchUsersParameters): string {
    let query = new StringBuilder(Resources.Search_SearchUsers);

    query.addParameterToQuery("q", parameters.query);
    query.addParameterToQuery("page", parameters.page);
    query.addParameterToQuery("count", parameters.pageSize);
    query.addParameterToQuery("include_entities", parameters.includeEntities);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getCreateSavedSearchQuery(parameters: ICreateSavedSearchParameters): string {
    let query = new StringBuilder(Resources.SavedSearch_Create);

    query.addParameterToQuery("query", parameters.query);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getSavedSearchQuery(parameters: IGetSavedSearchParameters): string {
    let query = new StringBuilder(string.Format(Resources.SavedSearch_Get, parameters.savedSearchId));

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListSavedSearchQuery(parameters: IListSavedSearchesParameters): string {
    let query = new StringBuilder(Resources.SavedSearches_List);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getDestroySavedSearchQuery(parameters: IDestroySavedSearchParameters): string {
    let query = new StringBuilder(string.Format(Resources.SavedSearch_Destroy, parameters.savedSearchId));

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
