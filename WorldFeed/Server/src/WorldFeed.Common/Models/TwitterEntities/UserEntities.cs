namespace WorldFeed.Common.Models.TwitterEntities
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Entities;

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
