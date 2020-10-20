namespace Sharebook.Upload.Domain.AggregatesModel.TweetAggregate.Properties
{
    using System.Collections.Generic;

    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate.Enums;
    using Sharebook.Upload.Domain.Common;

    public class Place : ValueObject, IPlace
    {
        internal Place(string idStr, string name, string fullName, string url, PlaceType placeType, string country, string countryCode, Dictionary<string, string> attributes, List<Place> containedWithin, Geo boundingBox, Geo geometry)
        {
            this.IdStr = idStr;
            this.Name = name;
            this.FullName = fullName;
            this.Url = url;
            this.PlaceType = placeType;
            this.Country = country;
            this.CountryCode = countryCode;
            this.Attributes = attributes;
            this.ContainedWithin = containedWithin;
            this.BoundingBox = boundingBox;
            this.Geometry = geometry;
        }

        // [JsonProperty("id")]
        public string IdStr { get; private set; }

        // [JsonProperty("name")]
        public string Name { get; set; }

        // [JsonProperty("full_name")]
        public string FullName { get; set; }

        // [JsonProperty("url")]
        public string Url { get; set; }

        // [JsonProperty("place_type")]
        public PlaceType PlaceType { get; set; }

        // [JsonProperty("country")]
        public string Country { get; set; }

        // [JsonProperty("country_code")]
        public string CountryCode { get; set; }

        // [JsonProperty("attributes")]
        public Dictionary<string, string> Attributes { get; set; }

        // [JsonProperty("contained_within")]
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
