namespace Sharebook.Storage.API.ViewModels
{
    using Newtonsoft.Json;

    public class UploadedImageDetailsViewModel
    {
        [JsonProperty("w")]
        public int? Width { get; set; }

        [JsonProperty("h")]
        public int? Height { get; set; }

        public string ImageType { get; set; }
    }
}
