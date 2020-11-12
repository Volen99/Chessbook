import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {IQueryParameterGenerator, IQueryParameterGeneratorToken, QueryParameterGenerator} from "../Shared/QueryParameterGenerator";
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
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";
import {format} from "typescript-dotnet-commonjs/System/Text/Utility";

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
  factory: () => new SearchQueryGenerator(inject(QueryParameterGenerator), inject(SearchQueryParameterGenerator)),
});

@Injectable({
  providedIn: 'root',
})
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

    StringBuilderExtensions.addParameterToQuery(query, "q", this.generateQueryParameter(parameters.query, parameters.filters));
    StringBuilderExtensions.addParameterToQuery(query, "geocode", this._searchQueryParameterGenerator.generateGeoCodeParameter(parameters.geoCode));

    StringBuilderExtensions.addParameterToQuery(query, "lang", parameters.lang?.getLanguageCode());
    StringBuilderExtensions.addParameterToQuery(query, "locale", parameters.locale);
    StringBuilderExtensions.addParameterToQuery(query, "result_type", parameters.searchType?.toString().toLocaleLowerCase());

    this._queryParameterGenerator.addMinMaxQueryParameters(query, parameters);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._searchQueryParameterGenerator.generateSinceParameter(parameters.since));
    StringBuilderExtensions.addFormattedParameterToQuery(query, this._searchQueryParameterGenerator.generateUntilParameter(parameters.until));
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  private generateQueryParameter(query: string, tweetSearchFilters: TweetSearchFilters): string {
    if (tweetSearchFilters === TweetSearchFilters.None) {
      return query;
    }

    // for (const entitiesTypeFilter of this.getFlags(tweetSearchFilters)) {
    //   if (entitiesTypeFilter !== TweetSearchFilters.None) {
    //     let filter = entitiesTypeFilter.getQueryFilterName().ToLowerInvariant();
    //     query += ` filter:${filter}`;
    //   }
    // }

    return query;
  }

        // private  getFlags(tweetSearchFilters: TweetSearchFilters): Iterable<TweetSearchFilters>
        // {
        //     for (const value: TweetSearchFilters of Enum.GetValues(tweetSearchFilters.GetType()))
        //     {
        //         if (tweetSearchFilters.HasFlag(value) && (tweetSearchFilters & value) === value)
        //         {
        //             yield return value;
        //         }
        //     }
        // }

  public getSearchUsersQuery(parameters: ISearchUsersParameters): string {
    let query = new StringBuilder(Resources.Search_SearchUsers);

    StringBuilderExtensions.addParameterToQuery(query, "q", parameters.query);
    StringBuilderExtensions.addParameterToQuery(query, "page", parameters.page);
    StringBuilderExtensions.addParameterToQuery(query, "count", parameters.pageSize);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return StringBuilderExtensions.toString();
  }

  public getCreateSavedSearchQuery(parameters: ICreateSavedSearchParameters): string {
    let query = new StringBuilder(Resources.SavedSearch_Create);

    StringBuilderExtensions.addParameterToQuery(query, "query", parameters.query);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getSavedSearchQuery(parameters: IGetSavedSearchParameters): string {
    let query = new StringBuilder(format(Resources.SavedSearch_Get, parameters.savedSearchId));

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getListSavedSearchQuery(parameters: IListSavedSearchesParameters): string {
    let query = new StringBuilder(Resources.SavedSearches_List);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getDestroySavedSearchQuery(parameters: IDestroySavedSearchParameters): string {
    let query = new StringBuilder(format(Resources.SavedSearch_Destroy, parameters.savedSearchId));

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
