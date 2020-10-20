namespace Sharebook.Trends.Domain.AggregateRoots.TrendAggregate
{
    using System;
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces;

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
