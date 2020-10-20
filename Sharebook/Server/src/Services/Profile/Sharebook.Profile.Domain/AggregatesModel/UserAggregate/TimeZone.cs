namespace Sharebook.Profile.Domain.AggregatesModel.UserAggregate
{
    using Newtonsoft.Json;

    using global::Sharebook.Common.JsonConverters;
    using global::Sharebook.Common.Public.Models.Interfaces;

    public class TimeZone : ITimeZone
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("tzinfo_name")]
        public string TzinfoName { get; set; }

        [JsonProperty("utc_offset")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public int UtcOffset { get; set; }
    }
}
