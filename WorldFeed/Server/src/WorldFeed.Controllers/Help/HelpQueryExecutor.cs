namespace WorldFeed.Controllers.Help
{
    using System.Threading.Tasks;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.HelpClient;
    using WorldFeed.Common.QueryGenerators;
    using WorldFeed.Common.Web;

    public interface IHelpQueryExecutor
    {
        Task<ITwitterResult<CredentialsRateLimitsDTO>> GetRateLimitsAsync(IGetRateLimitsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterConfiguration>> GetTwitterConfigurationAsync(IGetTwitterConfigurationParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<SupportedLanguage[]>> GetSupportedLanguagesAsync(IGetSupportedLanguagesParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IPlace>> GetPlaceAsync(IGetPlaceParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoAsync(IGeoSearchParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoReverseAsync(IGeoSearchReverseParameters parameters, ITwitterRequest request);
    }

    public class HelpQueryExecutor : IHelpQueryExecutor
    {
        private readonly IHelpQueryGenerator helpQueryGenerator;
        private readonly ITwitterAccessor twitterAccessor;

        public HelpQueryExecutor(IHelpQueryGenerator helpQueryGenerator, ITwitterAccessor twitterAccessor)
        {
            this.helpQueryGenerator = helpQueryGenerator;
            this.twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<CredentialsRateLimitsDTO>> GetRateLimitsAsync(IGetRateLimitsParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.helpQueryGenerator.GetRateLimitsQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<CredentialsRateLimitsDTO>(request);
        }

        public Task<ITwitterResult<ITwitterConfiguration>> GetTwitterConfigurationAsync(IGetTwitterConfigurationParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.helpQueryGenerator.GetTwitterConfigurationQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterConfiguration>(request);
        }

        public Task<ITwitterResult<SupportedLanguage[]>> GetSupportedLanguagesAsync(IGetSupportedLanguagesParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.helpQueryGenerator.GetSupportedLanguagesQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<SupportedLanguage[]>(request);
        }

        public Task<ITwitterResult<IPlace>> GetPlaceAsync(IGetPlaceParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.helpQueryGenerator.GetPlaceQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IPlace>(request);
        }

        public Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoAsync(IGeoSearchParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.helpQueryGenerator.GetSearchGeoQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<SearchGeoSearchResultDTO>(request);
        }

        public Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoReverseAsync(IGeoSearchReverseParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.helpQueryGenerator.GetSearchGeoReverseQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<SearchGeoSearchResultDTO>(request);
        }
    }
}
