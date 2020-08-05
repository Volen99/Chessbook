namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class AccountActivityUserToUserEventDTO
    {
        public string Type { get; set; }

        [JsonProperty("created_timestamp")]
        public string CreatedTimestamp { get; set; }

        [JsonProperty("source")]
        public IUserDTO Source { get; set; }

        [JsonProperty("target")]
        public IUserDTO Target { get; set; }
    }
}
