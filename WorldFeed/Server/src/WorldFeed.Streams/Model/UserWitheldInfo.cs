
namespace WorldFeed.Streams.Model
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Streaming.Events;

    public class UserWitheldInfo : IUserWitheldInfo
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("withheld_in_countries")]
        public IEnumerable<string> WitheldInCountries { get; set; }
    }
}
