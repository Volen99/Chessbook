namespace WorldFeed.Common.DTO
{
    using System;
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class UploadedMediaInfo : IUploadedMediaInfo
    {
        public UploadedMediaInfo()
        {
            CreatedDate = DateTime.Now;
        }

        [JsonIgnore]
        public DateTime CreatedDate { get; }

        [JsonProperty("media_id")]
        public long MediaId { get; set; }

        [JsonProperty("media_id_string")]
        public string MediaIdStr { get; set; }

        [JsonProperty("size")]
        public int MediaSize { get; set; }

        [JsonProperty("image")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IUploadedImageDetails ImageDetails { get; set; }

        [JsonProperty("video")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IUploadedVideoDetails VideoDetails { get; set; }

        [JsonProperty("processing_info")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IUploadProcessingInfo ProcessingInfo { get; set; }
    }
}
