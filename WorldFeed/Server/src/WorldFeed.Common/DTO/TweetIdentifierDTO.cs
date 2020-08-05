namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces;

    public class TweetIdentifierDTO : ITweetIdentifier
    {
        [JsonProperty("id")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public long Id { get; set; }

        [JsonProperty("id_str")]
        public string IdStr { get; set; }
    }
}
