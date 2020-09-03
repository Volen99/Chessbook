namespace WorldFeed.Upload.Domain.Models.Properties
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    using WorldFeed.Upload.Domain.Models.Enums;

    [Owned]
    public class Place
    {
        public string Name { get; set; }

        public string FullName { get; set; }

        public string Url { get; set; }

        public PlaceType PlaceType { get; set; }

        public string Country { get; set; }

        public string CountryCode { get; set; }

        public List<Place> ContainedWithin { get; set; }

        // You can map the same CLR type as different owned types in the same owner entity through separate navigation properties
        public Geo BoundingBox { get; set; }
        public Geo Geometry { get; set; }
    }
}