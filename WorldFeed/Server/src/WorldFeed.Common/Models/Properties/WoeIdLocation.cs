namespace WorldFeed.Common.Models.Properties
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces;

    public class WoeIdLocation : IWoeIdLocation
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("woeid")]
        public long WoeId { get; set; }
    }
}
