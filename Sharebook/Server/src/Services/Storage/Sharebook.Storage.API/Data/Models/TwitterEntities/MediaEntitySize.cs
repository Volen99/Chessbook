namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using Newtonsoft.Json;

    /// <summary>
    /// Object storing information related with media size on Twitter
    /// </summary>
    public class MediaEntitySize
    {
        [JsonProperty("w")]
        public int? Width { get; set; }

        [JsonProperty("h")]
        public int? Height { get; set; }

        [JsonProperty("resize")]
        public string Resize { get; set; }
    }
}