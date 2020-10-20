namespace Sharebook.Common.Models
{
    using Newtonsoft.Json;

    public class SupportedLanguage
    {
        [JsonProperty("code")]
        public string Code { get; set; }


        [JsonProperty("status")]
        public string Status { get; set; }


        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
