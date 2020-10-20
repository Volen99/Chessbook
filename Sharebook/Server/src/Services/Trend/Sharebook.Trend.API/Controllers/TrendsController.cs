namespace Sharebook.Trends.Controllers
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Core.Controllers;
    using Sharebook.Trend.Application.Parameters;
    using Sharebook.Trends.Application.QueryExecutors;

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
