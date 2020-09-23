namespace WorldFeed.Trends.Controllers
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Core.Controllers;
    using WorldFeed.Trend.Application.Parameters;
    using WorldFeed.Trends.Application.QueryExecutors;

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
