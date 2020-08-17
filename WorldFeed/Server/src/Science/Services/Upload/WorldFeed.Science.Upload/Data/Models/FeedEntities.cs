namespace WorldFeed.Science.API.Data.Models
{
    using System.Collections.Generic;

    using WorldFeed.Common.Models;
    using WorldFeed.Science.Upload.Data.Models;

    public class FeedEntities : BaseDeletableModel<long>
    {
        public List<UrlFeedEntity> Urls { get; set; }

        public List<UserMentionFeedEntity> UserMentions { get; set; }

        public List<HashtagFeedEntity> Hashtags { get; set; }

        public List<SymbolFeedEntity> Symbols { get; set; }

        public List<MediaFeedEntity> Medias { get; set; }

        public long FeedId { get; set; }
        public Feed Feed { get; set; }
    }
}
