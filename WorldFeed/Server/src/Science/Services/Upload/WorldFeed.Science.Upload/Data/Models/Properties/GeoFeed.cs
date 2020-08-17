namespace WorldFeed.Science.Upload.Data.Models.Properties
{
    using System.Collections.Generic;

    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed.Feed.Properties;

    public class GeoFeed : BaseDeletableModel<long>, IGeoFeed
    {
        public string Type { get; set; }

        public List<Coordinates> Coordinates { get; set; }

        public long FeedId { get; set; }
        public Feed Feed { get; set; }
    }
}
