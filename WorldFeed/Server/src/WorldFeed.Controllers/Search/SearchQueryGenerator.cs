namespace WorldFeed.Controllers.Search
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Parameters.Enums;
    using WorldFeed.Common.Public.Parameters.Search;
    using WorldFeed.Common.Settings;
    using WorldFeed.Controllers.Properties;
    using WorldFeed.Controllers.Shared;

    public interface ISearchQueryGenerator
    {
        string GetSearchTweetsQuery(ISearchTweetsParameters parameters, TweetMode? requestTweetMode);

        string GetSearchUsersQuery(ISearchUsersParameters parameters);

        string GetCreateSavedSearchQuery(ICreateSavedSearchParameters parameters);

        string GetSavedSearchQuery(IGetSavedSearchParameters parameters);

        string GetListSavedSearchQuery(IListSavedSearchesParameters parameters);

        string GetDestroySavedSearchQuery(IDestroySavedSearchParameters parameters);
    }

    public class SearchQueryGenerator : ISearchQueryGenerator
    {
        private readonly IQueryParameterGenerator queryParameterGenerator;
        private readonly ISearchQueryParameterGenerator searchQueryParameterGenerator;

        public SearchQueryGenerator(IQueryParameterGenerator queryParameterGenerator, ISearchQueryParameterGenerator searchQueryParameterGenerator)
        {
            this.queryParameterGenerator = queryParameterGenerator;
            this.searchQueryParameterGenerator = searchQueryParameterGenerator;
        }

        public string GetSearchTweetsQuery(ISearchTweetsParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.Search_SearchTweets);

            query.AddParameterToQuery("q", GenerateQueryParameter(parameters.Query, parameters.Filters));
            query.AddParameterToQuery("geocode", this.searchQueryParameterGenerator.GenerateGeoCodeParameter(parameters.GeoCode));

            query.AddParameterToQuery("lang", parameters.Lang?.GetLanguageCode());
            query.AddParameterToQuery("locale", parameters.Locale);
            query.AddParameterToQuery("result_type", parameters.SearchType?.ToString().ToLowerInvariant());

            this.queryParameterGenerator.AddMinMaxQueryParameters(query, parameters);

            query.AddFormattedParameterToQuery(this.searchQueryParameterGenerator.GenerateSinceParameter(parameters.Since));
            query.AddFormattedParameterToQuery(this.searchQueryParameterGenerator.GenerateUntilParameter(parameters.Until));
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);

            this.queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        private string GenerateQueryParameter(string query, TweetSearchFilters tweetSearchFilters)
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

        private IEnumerable<TweetSearchFilters> GetFlags(TweetSearchFilters tweetSearchFilters)
        {
            foreach (TweetSearchFilters value in Enum.GetValues(tweetSearchFilters.GetType()))
            {
                if (tweetSearchFilters.HasFlag(value) && (tweetSearchFilters & value) == value)
                {
                    yield return value;
                }
            }
        }

        public string GetSearchUsersQuery(ISearchUsersParameters parameters)
        {
            var query = new StringBuilder(Resources.Search_SearchUsers);

            query.AddParameterToQuery("q", parameters.Query);
            query.AddParameterToQuery("page", parameters.Page);
            query.AddParameterToQuery("count", parameters.PageSize);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetCreateSavedSearchQuery(ICreateSavedSearchParameters parameters)
        {
            var query = new StringBuilder(Resources.SavedSearch_Create);

            query.AddParameterToQuery("query", parameters.Query);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetSavedSearchQuery(IGetSavedSearchParameters parameters)
        {
            var query = new StringBuilder(string.Format(Resources.SavedSearch_Get, parameters.SavedSearchId));

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetListSavedSearchQuery(IListSavedSearchesParameters parameters)
        {
            var query = new StringBuilder(Resources.SavedSearches_List);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetDestroySavedSearchQuery(IDestroySavedSearchParameters parameters)
        {
            var query = new StringBuilder(string.Format(Resources.SavedSearch_Destroy, parameters.SavedSearchId));

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }
    }
}
