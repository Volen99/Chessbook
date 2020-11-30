namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using Newtonsoft.Json;


    public class UserEntities
    {
        [JsonProperty("url")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        public WebsiteEntity Website { get; set; }

        //[JsonProperty("description")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        public DescriptionEntity Description { get; set; }
    }
}