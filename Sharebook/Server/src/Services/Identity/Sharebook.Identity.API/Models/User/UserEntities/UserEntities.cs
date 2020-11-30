namespace Sharebook.Identity.API.Models.User
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