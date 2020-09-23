namespace WorldFeed.Trends.Domain.AggregateRoots.TrendAggregate
{
    using Newtonsoft.Json;

    public class WoeIdLocation : IWoeIdLocation
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("woeid")]
        public long WoeId { get; set; }
    }
}
