//namespace WorldFeed.Controllers.Help
//{
//    using System.Threading.Tasks;

//    using WorldFeed.Common.Controllers;
//    using WorldFeed.Common.DTO;
//    using WorldFeed.Common.Models;
//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Common.Public.Models.Interfaces.DTO;
//    using WorldFeed.Common.Public.Parameters.HelpClient;
//    using WorldFeed.Common.Web;

//    public class HelpController : IHelpController
//    {
//        private readonly IHelpQueryExecutor helpQueryExecutor;

//        public HelpController(IHelpQueryExecutor helpQueryExecutor)
//        {
//            this.helpQueryExecutor = helpQueryExecutor;
//        }

//        public Task<ITwitterResult<CredentialsRateLimitsDTO>> GetRateLimitsAsync(IGetRateLimitsParameters parameters, ITwitterRequest request)
//        {
//            return this.helpQueryExecutor.GetRateLimitsAsync(parameters, request);
//        }

//        public Task<ITwitterResult<ITwitterConfiguration>> GetTwitterConfigurationAsync(IGetTwitterConfigurationParameters parameters, ITwitterRequest request)
//        {
//            return this.helpQueryExecutor.GetTwitterConfigurationAsync(parameters, request);
//        }

//        public Task<ITwitterResult<SupportedLanguage[]>> GetSupportedLanguagesAsync(IGetSupportedLanguagesParameters parameters, ITwitterRequest request)
//        {
//            return this.helpQueryExecutor.GetSupportedLanguagesAsync(parameters, request);
//        }

//        public Task<ITwitterResult<IPlace>> GetPlaceAsync(IGetPlaceParameters parameters, ITwitterRequest request)
//        {
//            return this.helpQueryExecutor.GetPlaceAsync(parameters, request);
//        }

//        public Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoAsync(IGeoSearchParameters parameters, ITwitterRequest request)
//        {
//            return this.helpQueryExecutor.SearchGeoAsync(parameters, request);
//        }

//        public Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoReverseAsync(IGeoSearchReverseParameters parameters, ITwitterRequest request)
//        {
//            return this.helpQueryExecutor.SearchGeoReverseAsync(parameters, request);
//        }
//    }
//}
