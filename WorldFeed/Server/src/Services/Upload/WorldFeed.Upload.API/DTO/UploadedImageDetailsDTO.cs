﻿namespace WorldFeed.Upload.DTO
{
    using Newtonsoft.Json;

    public class UploadedImageDetailsDTO : IUploadedImageDetails
    {
        [JsonProperty("w")]
        public int? Width { get; set; }

        [JsonProperty("h")]
        public int? Height { get; set; }

        [JsonProperty("image_type")]
        public string ImageType { get; set; }
    }
}
