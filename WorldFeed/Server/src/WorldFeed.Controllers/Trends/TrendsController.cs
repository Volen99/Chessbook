namespace WorldFeed.Controllers.Trends
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.TrendsClient;
    using WorldFeed.Common.Web;
    using WorldFeed.Core.Controllers;

    public class TrendsController : ITrendsController
    {
        private readonly ITrendsQueryExecutor trendsQueryExecutor;

        public TrendsController(ITrendsQueryExecutor trendsQueryExecutor)
        {
            this.trendsQueryExecutor = trendsQueryExecutor;
        }


        public Task<ITwitterResult<IGetTrendsAtResult[]>> GetPlaceTrendsAtAsync(IGetTrendsAtParameters parameters, ITwitterRequest request)
        {
            return this.trendsQueryExecutor.GetPlaceTrendsAtAsync(parameters, request);
        }

        public Task<ITwitterResult<ITrendLocation[]>> GetTrendLocationsAsync(IGetTrendsLocationParameters parameters, ITwitterRequest request)
        {
            return this.trendsQueryExecutor.GetTrendLocationsAsync(parameters, request);
        }

        public Task<ITwitterResult<ITrendLocation[]>> GetTrendsLocationCloseToAsync(IGetTrendsLocationCloseToParameters parameters, ITwitterRequest request)
        {
            return this.trendsQueryExecutor.GetTrendsLocationCloseToAsync(parameters, request);
        }
    }
}
