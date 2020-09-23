namespace WorldFeed.Trend.Client.Clients
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Trend.Application.Parameters;

    public class TrendsClient : ITrendsClient
    {
        private readonly ITwitterClient client;

        public TrendsClient(ITwitterClient client)
        {
            this.client = client;
        }

        public ITrendsClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<IGetTrendsAtResult> GetPlaceTrendsAtAsync(long woeid)
        {
            return GetPlaceTrendsAtAsync(new GetTrendsAtParameters(woeid));
        }

        public async Task<IGetTrendsAtResult> GetPlaceTrendsAtAsync(IGetTrendsAtParameters parameters)
        {
            var twitterResult = await this.client.Raw.Trends.GetPlaceTrendsAtAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model[0];
        }

        public Task<ITrendLocation[]> GetTrendLocationsAsync()
        {
            return GetTrendLocationsAsync(new GetTrendsLocationParameters());
        }

        public async Task<ITrendLocation[]> GetTrendLocationsAsync(IGetTrendsLocationParameters parameters)
        {
            var twitterResult = await this.client.Raw.Trends.GetTrendLocationsAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }

        public Task<ITrendLocation[]> GetTrendsLocationCloseToAsync(double latitude, double longitude)
        {
            return GetTrendsLocationCloseToAsync(new GetTrendsLocationCloseToParameters(latitude, longitude));
        }

        public Task<ITrendLocation[]> GetTrendsLocationCloseToAsync(ICoordinates coordinates)
        {
            return GetTrendsLocationCloseToAsync(new GetTrendsLocationCloseToParameters(coordinates));
        }

        public async Task<ITrendLocation[]> GetTrendsLocationCloseToAsync(IGetTrendsLocationCloseToParameters parameters)
        {
            var twitterResult = await this.client.Raw.Trends.GetTrendsLocationCloseToAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }
    }
}