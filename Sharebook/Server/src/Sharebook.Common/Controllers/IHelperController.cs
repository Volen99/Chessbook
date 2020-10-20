//namespace WorldFeed.Common.Controllers
//{
//    using System.Threading.Tasks;

//    using WorldFeed.Common.DTO;
//    using WorldFeed.Common.Models;
//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Common.Public.Models.Interfaces.DTO;
//    using WorldFeed.Common.Public.Parameters.HelpClient;

//    /// <summary>
//    /// The Help api provide some endpoints that let you retrieve different resources from Twitter - docs
//    /// </summary>
//    public interface IHelpController
//    {
//        Task<ITwitterResult<CredentialsRateLimitsDTO>> GetRateLimitsAsync(IGetRateLimitsParameters parameters, ITwitterRequest request);

//        Task<ITwitterResult<ITwitterConfiguration>> GetTwitterConfigurationAsync(IGetTwitterConfigurationParameters parameters, ITwitterRequest request);

//        Task<ITwitterResult<SupportedLanguage[]>> GetSupportedLanguagesAsync(IGetSupportedLanguagesParameters parameters, ITwitterRequest request);

//        Task<ITwitterResult<IPlace>> GetPlaceAsync(IGetPlaceParameters parameters, ITwitterRequest request);

//        Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoAsync(IGeoSearchParameters parameters, ITwitterRequest request);

//        Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoReverseAsync(IGeoSearchReverseParameters parameters, ITwitterRequest request);
//    }
//}
