namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class UploadedVideoDetailsDTO : IUploadedVideoDetails
    {
        [JsonProperty("video_type")]
        public string VideoType { get; set; }
    }
}
