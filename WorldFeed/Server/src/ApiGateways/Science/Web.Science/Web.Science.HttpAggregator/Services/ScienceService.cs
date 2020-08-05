namespace Web.Science.HttpAggregator.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using GrpcScience;

    using Web.Science.HttpAggregator.Config;
    using WorldFeed.Common.Models;

    using static GrpcScience.Science;

    public class ScienceService
    {
        private readonly HttpClient httpClient;
        private readonly UrlsConfig urls;

        public ScienceService(HttpClient httpClient, IOptions<UrlsConfig> config)
        {
            this.httpClient = httpClient;
            this.urls = config.Value;
        }

        public async Task<Media> GetMediaItemAsync(int id)
        {
            return await GrpcCallerService.CallService(this.urls.GrpcScience, async channel =>
            {
                var client = new ScienceClient(channel);
                var request = new MediaRequest { Id = id };
                var response = await client.GetMediaByIdAsync(request);

                return MapToMediaResponse(response);
            });
        }

        public async Task<IEnumerable<Media>> GetMediasAsync(IEnumerable<int> ids)
        {
            return await GrpcCallerService.CallService(this.urls.GrpcScience, async channel =>
            {
                var client = new ScienceClient(channel);
                var request = new MediasRequest { Ids = string.Join(",", ids), PageIndex = 1, PageSize = 10 };
                var response = await client.GetMediasByIdsAsync(request);
                return response.Data.Select(this.MapToMediaResponse);
            });
        }

        private Media MapToMediaResponse(MediaResponse mediaResponse)
        {
            return new Media
            {
                Id = mediaResponse.Id,
            };
        }
    }
}
