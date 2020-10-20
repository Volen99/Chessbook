namespace Sharebook.Trends.Controllers
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Parameters.TrendsClient;
    using Sharebook.Common.Web;

    public interface ITrendsController
    {
        Task<ITwitterResult<IGetTrendsAtResult[]>> GetPlaceTrendsAtAsync(IGetTrendsAtParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITrendLocation[]>> GetTrendLocationsAsync(IGetTrendsLocationParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITrendLocation[]>> GetTrendsLocationCloseToAsync(IGetTrendsLocationCloseToParameters parameters, ITwitterRequest request);
    }
}