namespace WorldFeed.Search.Client.Validators
{
    using System;

    using WorldFeed.Common.Exceptions.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Search.Application.Parameters;
    using WorldFeed.Search.Application.Parameters.Enums;

    public interface ISearchClientParametersValidator
    {
        void Validate(ISearchTweetsParameters parameters);

        void Validate(ISearchUsersParameters parameters);

        void Validate(ICreateSavedSearchParameters parameters);

        void Validate(IGetSavedSearchParameters parameters);

        void Validate(IListSavedSearchesParameters parameters);

        void Validate(IDestroySavedSearchParameters parameters);
    }

    public class SearchClientParametersValidator : ISearchClientParametersValidator
    {
        private readonly ITwitterClient client;
        private readonly ISearchClientRequiredParametersValidator searchClientRequiredParametersValidator;

        public SearchClientParametersValidator(
            ITwitterClient client,
            ISearchClientRequiredParametersValidator searchClientRequiredParametersValidator)
        {
            this.client = client;
            this.searchClientRequiredParametersValidator = searchClientRequiredParametersValidator;
        }

        public void Validate(ISearchTweetsParameters parameters)
        {
            this.searchClientRequiredParametersValidator.Validate(parameters);

            var isSearchQuerySet = !string.IsNullOrEmpty(parameters.Query);
            var isSearchQueryValid = IsSearchQueryValid(parameters.Query);
            var isGeoCodeSet = IsGeoCodeValid(parameters.GeoCode);
            var isEntitiesTypeSet = parameters.Filters != TweetSearchFilters.None;

            var isSearchValid = (isSearchQuerySet && isSearchQueryValid) || isGeoCodeSet || isEntitiesTypeSet;
            if (!isSearchValid)
            {
                throw new ArgumentException("At least one of the required parameters needs to be valid (query, geocode or filter).");
            }

            var maxPageSize = this.client.Config.Limits.SEARCH_TWEETS_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(this.client.Config.Limits.SEARCH_TWEETS_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(ISearchUsersParameters parameters)
        {
            this.searchClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = this.client.Config.Limits.SEARCH_USERS_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(this.client.Config.Limits.SEARCH_USERS_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(ICreateSavedSearchParameters parameters)
        {
            this.searchClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetSavedSearchParameters parameters)
        {
            this.searchClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IListSavedSearchesParameters parameters)
        {
            this.searchClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IDestroySavedSearchParameters parameters)
        {
            this.searchClientRequiredParametersValidator.Validate(parameters);
        }

        private bool IsSearchQueryValid(string searchQuery)
        {
            // We might want to restrict the size to 1000 characters as indicated in the documentation
            return !string.IsNullOrWhiteSpace(searchQuery);
        }

        private bool IsGeoCodeValid(IGeoCode geoCode)
        {
            return geoCode != null;
        }
    }
}
