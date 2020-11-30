namespace Sharebook.Storage.API.Data.Models.ExtendedEntities
{
    using Newtonsoft.Json;

    public class VideoInformationEntity
    {
        [JsonProperty("aspect_ratio")]
        public int[] AspectRatio { get; set; }

        [JsonProperty("duration_millis")]
        public int DurationInMilliseconds { get; set; }

        [JsonProperty("variants")]
        public VideoEntityVariant[] Variants { get; set; }
    }
}
