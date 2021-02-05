namespace Sharebook.Web.Models.Outputs.Chunked
{
    using Newtonsoft.Json;

    public class UploadedImageDetailsOutputModel
    {
        [JsonProperty("w")]
        public int? Width { get; set; }

        [JsonProperty("h")]
        public int? Height { get; set; }

        public string ImageType { get; set; }
    }
}
