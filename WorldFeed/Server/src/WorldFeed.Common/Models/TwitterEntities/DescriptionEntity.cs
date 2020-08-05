namespace WorldFeed.Common.Models.TwitterEntities
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Entities;

    public class DescriptionEntity : IDescriptionEntity
    {
        [JsonProperty("urls")]
        public IEnumerable<IUrlEntity> Urls { get; set; }
    }
}
