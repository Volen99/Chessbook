namespace WorldFeed.Common.Models.Properties
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces;

    public class App : IApp
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }
}
