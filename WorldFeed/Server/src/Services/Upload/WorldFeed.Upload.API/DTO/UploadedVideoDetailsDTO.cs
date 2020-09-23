namespace WorldFeed.Upload.DTO
{
    using Newtonsoft.Json;

    public class UploadedVideoDetailsDTO : IUploadedVideoDetails
    {
        [JsonProperty("video_type")]
        public string VideoType { get; set; }
    }
}
