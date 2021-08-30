namespace Chessbook.Data.Models.Post.Properties
{
    using global::System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    using Chessbook.Data.Models.Post.Enums;

    [Owned]
    public class Place
    {
        public string Id { get; set; } // ID representing this place. Note that this is represented as a string, not an integer. Example:

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Url { get; set; }

        public PlaceType PlaceType { get; set; }

        public string Country { get; set; }

        public string CountryCode { get; set; }

        // public Dictionary<string, string> Attributes { get; set; }

        public List<Place> ContainedWithin { get; set; }


        // You can map the same CLR type as different owned types in the same owner entity through separate navigation properties
        // [JsonProperty("bounding_box")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public Geo BoundingBox { get; set; }

        // [JsonProperty("geometry")]
        // [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public Geo Geometry { get; set; }
    }
}
