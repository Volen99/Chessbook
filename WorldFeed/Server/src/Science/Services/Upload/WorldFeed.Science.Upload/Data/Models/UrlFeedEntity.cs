namespace WorldFeed.Science.Upload.Data.Models
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed.Feed.Entities;
    using WorldFeed.Science.API.Data.Models;

    public class UrlFeedEntity : BaseDeletableModel<long>, IUrlFeedEntity
    {
        public string URL { get; set; }

        public string DisplayedURL { get; set; }

        public string ExpandedURL { get; set; }

        public string Indices { get; set; }

        public long FeedEntitiesId { get; set; }
        public FeedEntities Feed { get; set; }
    }
}
