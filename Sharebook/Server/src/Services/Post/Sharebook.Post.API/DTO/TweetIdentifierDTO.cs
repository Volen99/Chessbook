namespace Sharebook.Post.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces;

    public class TweetIdentifierDTO : ITweetIdentifier
    {
        [JsonProperty("id")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public long Id { get; set; }

        [JsonProperty("id_str")]
        public string IdStr { get; set; }
    }
}
