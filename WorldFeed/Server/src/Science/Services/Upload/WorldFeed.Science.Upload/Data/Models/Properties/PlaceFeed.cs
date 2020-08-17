namespace WorldFeed.Science.Upload.Data.Models.Properties
{
    using System.Collections.Generic;

    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed.Feed.Properties;
    using WorldFeed.Common.Public.Models.Enums;

    public class PlaceFeed : BaseDeletableModel<long>, IPlaceFeed
    {
        public string IdStr { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Url { get; set; }

        public PlaceType PlaceType { get; set; }

        public string Country { get; set; }

        public string CountryCode { get; set; }

        public List<PlaceFeed> ContainedWithin { get; set; }

        public GeoFeed BoundingBox { get; set; } // ?

        public GeoFeed Geometry { get; set; }    // ?
    }
}