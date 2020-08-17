namespace WorldFeed.Common.Models.WorldFeed.Feed.Properties
{
    using System.Collections.Generic;

    using global::WorldFeed.Common.Public.Models.Enums;

    public interface IPlaceFeed
    {
        string IdStr { get; }

        string Name { get; set; }

        string FullName { get; set; }

        string Url { get; set; }

        PlaceType PlaceType { get; set; }

        string Country { get; set; }

        string CountryCode { get; set; }

        // Dictionary<string, string> Attributes { get; set; }

        // List<PlaceFeed> ContainedWithin { get; set; }

        //GeoFeed BoundingBox { get; set; }

        //GeoFeed Geometry { get; set; }
    }
}
