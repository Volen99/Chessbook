namespace WorldFeed.Common.Models.WorldFeed.Feed.Properties
{
    using System.Collections.Generic;

    using global::WorldFeed.Common.Public.Models;

    public interface IGeoFeed
    {
        public string Type { get; set; }

        // public List<Coordinates> Coordinates { get; set; }

        long FeedId { get; set; }
    }
}
