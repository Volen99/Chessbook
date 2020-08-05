namespace WorldFeed.Common.Models
{
    using System;
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces;

    public class GetTrendsAtResult : IGetTrendsAtResult
    {
        [JsonProperty("as_of")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public DateTime AsOf { get; set; }

        [JsonProperty("created_at")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("locations")]
        public IWoeIdLocation[] WoeIdLocations { get; set; }

        [JsonProperty("trends")]
        public ITrend[] Trends { get; set; }
    }
}
