namespace WorldFeed.Common.Models.TwitterEntities
{
    using Newtonsoft.Json;

    using global::WorldFeed.Common.JsonConverters;
    using global::WorldFeed.Common.Public.Models.Entities;

    public class UserEntities : IUserEntities
    {
        [JsonProperty("url")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IWebsiteEntity Website { get; set; }

        [JsonProperty("description")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IDescriptionEntity Description { get; set; }
    }
}
