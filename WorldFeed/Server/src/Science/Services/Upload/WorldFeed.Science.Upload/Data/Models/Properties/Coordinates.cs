namespace WorldFeed.Science.Upload.Data.Models.Properties
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed.Feed.Properties;

    public class Coordinates : BaseDeletableModel<long>, ICoordinates
    {
        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public long FeedId { get; set; }
        public Feed Feed { get; set; }
    }
}
