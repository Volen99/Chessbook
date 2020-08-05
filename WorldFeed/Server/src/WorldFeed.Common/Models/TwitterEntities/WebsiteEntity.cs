namespace WorldFeed.Common.Models.TwitterEntities
{
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using WorldFeed.Common.Public.Models.Entities;

    public class WebsiteEntity : IWebsiteEntity
    {
        [JsonProperty("urls")]
        public IEnumerable<IUrlEntity> Urls { get; set; }
    }
}
