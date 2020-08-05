namespace WorldFeed.Common.Models.TwitterEntities
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Entities;

    /// <summary>
    /// Object storing information related with media size on Twitter
    /// </summary>
    public class MediaEntitySize : IMediaEntitySize
    {
        [JsonProperty("w")]
        public int? Width { get; set; }

        [JsonProperty("h")]
        public int? Height { get; set; }

        [JsonProperty("resize")]
        public string Resize { get; set; }
    }
}
