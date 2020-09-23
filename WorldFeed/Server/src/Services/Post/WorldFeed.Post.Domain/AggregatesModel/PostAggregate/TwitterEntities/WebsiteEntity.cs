namespace WorldFeed.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities;

    public class WebsiteEntity : IWebsiteEntity
    {
        [JsonProperty("urls")]
        public IEnumerable<IUrlEntity> Urls { get; set; }
    }
}