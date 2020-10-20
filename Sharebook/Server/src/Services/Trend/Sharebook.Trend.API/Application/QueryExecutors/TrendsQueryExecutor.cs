namespace Sharebook.Trends.Application.QueryExecutors
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Parameters.TrendsClient;

    public interface ITrendsQueryExecutor
    {
        Task<ITwitterResult<IGetTrendsAtResult[]>> GetPlaceTrendsAtAsync(IGetTrendsAtParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITrendLocation[]>> GetTrendLocationsAsync(IGetTrendsLocationParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITrendLocation[]>> GetTrendsLocationCloseToAsync(IGetTrendsLocationCloseToParameters parameters, ITwitterRequest request);
    }

    public class TrendsQueryExecutor : ITrendsQueryExecutor
    {
        private readonly ITrendsQueryGenerator trendsQueryGenerator;
        private readonly ITwitterAccessor twitterAccessor;

        public TrendsQueryExecutor(ITrendsQueryGenerator trendsQueryGenerator, ITwitterAccessor twitterAccessor)
        {
            this.trendsQueryGenerator = trendsQueryGenerator;
            this.twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<IGetTrendsAtResult[]>> GetPlaceTrendsAtAsync(IGetTrendsAtParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.trendsQueryGenerator.GetTrendsAtQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IGetTrendsAtResult[]>(request);
        }

        public Task<ITwitterResult<ITrendLocation[]>> GetTrendLocationsAsync(IGetTrendsLocationParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.trendsQueryGenerator.GetTrendsLocationQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITrendLocation[]>(request);
        }

        public Task<ITwitterResult<ITrendLocation[]>> GetTrendsLocationCloseToAsync(IGetTrendsLocationCloseToParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.trendsQueryGenerator.GetTrendsLocationCloseToQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITrendLocation[]>(request);
        }
    }
}
