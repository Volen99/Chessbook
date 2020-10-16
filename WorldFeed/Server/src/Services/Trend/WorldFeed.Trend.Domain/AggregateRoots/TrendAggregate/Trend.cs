﻿namespace WorldFeed.Trends.Domain.AggregateRoots.TrendAggregate
{
    using Newtonsoft.Json;

    public class Trend : ITrend
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string URL { get; set; }

        [JsonProperty("query")]
        public string Query { get; set; }

        [JsonProperty("promoted_content")]
        public string PromotedContent { get; set; }

        [JsonProperty("tweet_volume")]
        public long? TweetVolume { get; set; }
    }
}