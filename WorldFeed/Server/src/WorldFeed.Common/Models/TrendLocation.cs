namespace WorldFeed.Common.Models
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;

    public class TrendLocation : ITrendLocation
    {
        private class PlaceTypeDTO
        {
            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("code")]
            public int Code { get; set; }
        }

        [JsonProperty("woeid")]
        public long WoeId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("countryCode")]
        public string CountryCode { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("parentid")]
        public long ParentId { get; set; }

        [JsonProperty]
        public PlaceType PlaceType
        {
            get
            {
                if (this.placeTypeDTO == null)
                {
                    return PlaceType.Undefined;
                }

                return (PlaceType)this.placeTypeDTO.Code;
            }
            set
            {
                if (this.placeTypeDTO == null)
                {
                    this.placeTypeDTO = new PlaceTypeDTO();
                }

                this.placeTypeDTO.Code = (int) value;
            }
        }

        [JsonProperty("placeType")]
        private PlaceTypeDTO placeTypeDTO { get; set; }
    }
}
