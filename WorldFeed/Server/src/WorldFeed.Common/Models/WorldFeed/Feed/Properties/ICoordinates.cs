namespace WorldFeed.Common.Models.WorldFeed.Feed.Properties
{
    public interface ICoordinates
    {
        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public long FeedId { get; set; }

    }
}
