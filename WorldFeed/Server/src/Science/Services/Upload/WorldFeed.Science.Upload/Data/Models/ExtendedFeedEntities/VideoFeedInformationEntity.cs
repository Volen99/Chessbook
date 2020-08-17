namespace WorldFeed.Science.Upload.Data.Models.ExtendedFeedEntities
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed.Feed.ExtendedEntities;

    public class VideoFeedInformationEntity : BaseDeletableModel<long>, IVideoFeedInformationEntity
    {
        public string AspectRatio { get; set; }

        public int DurationInMilliseconds { get; set; }

        public VideoFeedEntityVariant[] Variants { get; set; }

        public long MediaFeedEntityId { get; set; }
        public MediaFeedEntity MediaFeedEntity { get; set; }
    }
}
