namespace WorldFeed.Client.Clients
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.HelpClient;

    public class HelpClient : IHelpClient
    {
        private readonly ITwitterClient client;
        private readonly IHelpRequester helpRequester;

        public HelpClient(ITwitterClient client, IHelpRequester helpRequester)
        {
            this.client = client;
            this.helpRequester = helpRequester;
        }

        public IHelpClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<ITwitterConfiguration> GetTwitterConfigurationAsync()
        {
            return GetTwitterConfigurationAsync(new GetTwitterConfigurationParameters());
        }

        public async Task<ITwitterConfiguration> GetTwitterConfigurationAsync(IGetTwitterConfigurationParameters parameters)
        {
            var twitterResult = await this.helpRequester.GetTwitterConfigurationAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }

        public Task<SupportedLanguage[]> GetSupportedLanguagesAsync()
        {
            return GetSupportedLanguagesAsync(new GetSupportedLanguagesParameters());
        }

        public async Task<SupportedLanguage[]> GetSupportedLanguagesAsync(IGetSupportedLanguagesParameters parameters)
        {
            var twitterResult = await this.helpRequester.GetSupportedLanguagesAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }

        public Task<IPlace> GetPlaceAsync(string placeId)
        {
            return GetPlaceAsync(new GetPlaceParameters(placeId));
        }

        public async Task<IPlace> GetPlaceAsync(IGetPlaceParameters parameters)
        {
            var result = await this.helpRequester.GetPlaceAsync(parameters).ConfigureAwait(false);
            return result?.Model;
        }

        public async Task<IPlace[]> SearchGeoAsync(IGeoSearchParameters parameters)
        {
            var result = await this.helpRequester.SearchGeoAsync(parameters).ConfigureAwait(false);
            return result?.Model?.Result.Places;
        }

        public Task<IPlace[]> SearchGeoReverseAsync(ICoordinates coordinates)
        {
            return SearchGeoReverseAsync(new GeoSearchReverseParameters(coordinates));
        }

        public async Task<IPlace[]> SearchGeoReverseAsync(IGeoSearchReverseParameters parameters)
        {
            var result = await this.helpRequester.SearchGeoReverseAsync(parameters).ConfigureAwait(false);
            return result?.Model?.Result.Places;
        }
    }
}