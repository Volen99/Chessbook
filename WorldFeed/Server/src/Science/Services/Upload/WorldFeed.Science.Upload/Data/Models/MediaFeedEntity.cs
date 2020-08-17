namespace WorldFeed.Science.Upload.Data.Models
{
    using WorldFeed.Common.Models.WorldFeed.Feed.Entities;
    using WorldFeed.Science.API.Data.Models;
    using WorldFeed.Science.Upload.Data.Models.ExtendedFeedEntities;

    public class MediaFeedEntity : IMediaFeedEntity
    {
        public long? Id { get; set; }

        public string IdStr { get; set; }

        public string MediaURL { get; set; }

        public string MediaURLHttps { get; set; }

        public string URL { get; set; }

        public string DisplayURL { get; set; }

        public string ExpandedURL { get; set; }

        public string MediaType { get; set; }

        public string Indices { get; set; }

        public long VideoFeedInformationEntityId { get; set; }
        public VideoFeedInformationEntity VideoDetails { get; set; }

        public long FeedEntitiesId { get; set; }
        public FeedEntities Feed { get; set; }

        public long ExtendedEntitiesId { get; set; }
        public ExtendedEntities ExtendedEntities { get; set; }
    }
}
