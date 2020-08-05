namespace WorldFeed.Streams.Model.AccountActivity
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Models.Properties;

    public class BaseAccountActivityMessageEventDTO
    {
        [JsonProperty("apps")]
        public Dictionary<string, App> Apps { get; set; }

        [JsonProperty("users")]
        public Dictionary<string, UserDTO> UsersById { get; set; }
    }
}
