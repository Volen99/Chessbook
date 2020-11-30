namespace Sharebook.Identity.API.Models.User
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class DescriptionEntity
    {
        [JsonProperty("urls")]
        public IEnumerable<UrlEntity> Urls { get; set; }
    }
}