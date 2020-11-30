namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class DescriptionEntity
    {
        [JsonProperty("urls")]
        public IEnumerable<UrlEntity> Urls { get; set; }
    }
}