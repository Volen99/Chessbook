namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities.ExtendedEntities
{
    using Newtonsoft.Json;
    using Sharebook.Storage.Domain.AggregatesModel.PostAggregate.Entities.ExtendedEntities;

    public class VideoEntityVariant : IVideoEntityVariant
    {
        [JsonProperty("bitrate")]
        public int Bitrate { get; set; }
        [JsonProperty("content_type")]
        public string ContentType { get; set; }
        [JsonProperty("url")]
        public string URL { get; set; }
    }
}