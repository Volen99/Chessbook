namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class WebsiteEntity
    {
        [JsonProperty("urls")]
        public IEnumerable<UrlEntity> Urls { get; set; }
    }
}