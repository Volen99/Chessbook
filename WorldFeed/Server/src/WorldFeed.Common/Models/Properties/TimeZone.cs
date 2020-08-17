namespace WorldFeed.Common.Models.Properties
{
    using Newtonsoft.Json;

    using global::WorldFeed.Common.JsonConverters;
    using global::WorldFeed.Common.Public.Models.Interfaces;

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
