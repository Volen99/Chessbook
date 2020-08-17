namespace WorldFeed.Common.Models.TwitterEntities.ExtendedEntities
{
    using Newtonsoft.Json;

    using global::WorldFeed.Common.Public.Models.Entities.ExtendedEntities;

    public class VideoInformationEntity : IVideoInformationEntity
    {
        [JsonProperty("aspect_ratio")]
        public int[] AspectRatio { get; set; }


        [JsonProperty("duration_millis")]
        public int DurationInMilliseconds { get; set; }


        [JsonProperty("variants")]
        public IVideoEntityVariant[] Variants { get; set; }
    }
}
