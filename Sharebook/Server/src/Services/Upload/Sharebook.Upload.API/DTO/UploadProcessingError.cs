namespace Sharebook.Upload.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public class UploadProcessingError : IUploadProcessingError
    {
        [JsonProperty("code")]
        public int Code { get; set; }


        [JsonProperty("name")]
        public string Name { get; set; }


        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
