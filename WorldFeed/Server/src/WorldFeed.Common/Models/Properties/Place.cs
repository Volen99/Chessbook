﻿namespace WorldFeed.Common.Models.Properties
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;

    public class Place : IPlace
    {
        [JsonProperty("id")]
        public string IdStr { get; private set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("full_name")]
        public string FullName { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("place_type")]
        public PlaceType PlaceType { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("country_code")]
        public string CountryCode { get; set; }

        [JsonProperty("attributes")]
        public Dictionary<string, string> Attributes { get; set; }

        [JsonProperty("contained_within")]
        public List<IPlace> ContainedWithin { get; set; }

        [JsonProperty("bounding_box")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IGeo BoundingBox { get; set; }

        [JsonProperty("geometry")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IGeo Geometry { get; set; }
    }
}
