namespace Sharebook.Storage.API.Data.Models.ExtendedEntities
{
    using Newtonsoft.Json;

    public class VideoEntityVariant
    {
        [JsonProperty("bitrate")]
        public int Bitrate { get; set; }
        [JsonProperty("content_type")]
        public string ContentType { get; set; }
        [JsonProperty("url")]
        public string URL { get; set; }
    }
}