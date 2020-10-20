namespace Sharebook.Post.DTO
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.Entities;

    public class ObjectEntitiesDTO : IObjectEntities
    {
        [JsonProperty("urls")]
        public List<IUrlEntity> Urls { get; set; }

        [JsonProperty("user_mentions")]
        public List<IUserMentionEntity> UserMentions { get; set; }

        [JsonProperty("hashtags")]
        public List<IHashtagEntity> Hashtags { get; set; }

        [JsonProperty("symbols")]
        public List<ISymbolEntity> Symbols { get; set; }

        [JsonProperty("media")]
        public List<IMediaEntity> Medias { get; set; }
    }
}
