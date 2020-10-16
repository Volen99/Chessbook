import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {IQueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import IEnumerable from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable';
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";
import {TweetSearchFilters} from "../../core/Public/Parameters/Enum/TweetSearchFilters";

export interface ISearchQueryGenerator {
  GetSearchTweetsQuery(parameters: ISearchTweetsParameters, tweetMode: ComputedTweetMode): string;

  GetSearchUsersQuery(parameters: ISearchUsersParameters): string;

  GetCreateSavedSearchQuery(parameters: ICreateSavedSearchParameters): string;

  GetSavedSearchQuery(parameters: IGetSavedSearchParameters): string;

  GetListSavedSearchQuery(parameters: IListSavedSearchesParameters): string;

  GetDestroySavedSearchQuery(parameters: IDestroySavedSearchParameters): string;
}

    export class SearchQueryGenerator implements ISearchQueryGenerator
    {
        private readonly _queryParameterGenerator: IQueryParameterGenerator;
        private readonly _searchQueryParameterGenerator: ISearchQueryParameterGenerator;

        constructor(queryParameterGenerator: IQueryParameterGenerator, searchQueryParameterGenerator: ISearchQueryParameterGenerator)
        {
            this._queryParameterGenerator = queryParameterGenerator;
            this._searchQueryParameterGenerator = searchQueryParameterGenerator;
        }

        public  GetSearchTweetsQuery(parameters: ISearchTweetsParameters, tweetMode: ComputedTweetMode): string
        {
            let query = new StringBuilder(Resources.Search_SearchTweets);

            query.addParameterToQuery("q", GenerateQueryParameter(parameters.Query, parameters.Filters));
            query.addParameterToQuery("geocode", this._searchQueryParameterGenerator.GenerateGeoCodeParameter(parameters.GeoCode));

            query.addParameterToQuery("lang", parameters.Lang?.GetLanguageCode());
            query.addParameterToQuery("locale", parameters.Locale);
            query.addParameterToQuery("result_type", parameters.SearchType?.ToString().ToLowerInvariant());

            this._queryParameterGenerator.AddMinMaxQueryParameters(query, parameters);

            query.addFormattedParameterToQuery(this._searchQueryParameterGenerator.GenerateSinceParameter(parameters.Since));
            query.addFormattedParameterToQuery(this._searchQueryParameterGenerator.GenerateUntilParameter(parameters.Until));
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);
            query.addParameterToQuery("tweet_mode", tweetMode);

            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.toString();
        }

        private  GenerateQueryParameter(query: string, tweetSearchFilters: TweetSearchFilters): string
        {
            if (tweetSearchFilters == TweetSearchFilters.None)
            {
                return query;
            }

            foreach (var entitiesTypeFilter in GetFlags(tweetSearchFilters))
            {
                if (entitiesTypeFilter != TweetSearchFilters.None)
                {
                    var filter = entitiesTypeFilter.GetQueryFilterName().ToLowerInvariant();
                    query += string.Format(" filter:{0}", filter);
                }
            }

            return query;
        }

        private  GetFlags(tweetSearchFilters: TweetSearchFilters): IEnumerable<TweetSearchFilters>
        {
            foreach (TweetSearchFilters value in Enum.GetValues(tweetSearchFilters.GetType()))
            {
                if (tweetSearchFilters.HasFlag(value) && (tweetSearchFilters & value) == value)
                {
                    yield return value;
                }
            }
        }

        public  GetSearchUsersQuery(parameters: ISearchUsersParameters): string
        {
            var query = new StringBuilder(Resources.Search_SearchUsers);

            query.addParameterToQuery("q", parameters.Query);
            query.addParameterToQuery("page", parameters.Page);
            query.addParameterToQuery("count", parameters.PageSize);
            query.addParameterToQuery("include_entities", parameters.IncludeEntities);

            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  GetCreateSavedSearchQuery(parameters: ICreateSavedSearchParameters): string
        {
            var query = new StringBuilder(Resources.SavedSearch_Create);

            query.addParameterToQuery("query", parameters.Query);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  GetSavedSearchQuery(parameters: IGetSavedSearchParameters): string
        {
            var query = new StringBuilder(string.Format(Resources.SavedSearch_Get, parameters.SavedSearchId));

            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  GetListSavedSearchQuery(parameters: IListSavedSearchesParameters): string
        {
            var query = new StringBuilder(Resources.SavedSearches_List);

            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public  GetDestroySavedSearchQuery(parameters: IDestroySavedSearchParameters): string
        {
            var query = new StringBuilder(string.Format(Resources.SavedSearch_Destroy, parameters.SavedSearchId));

            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.toString();
        }
    }
