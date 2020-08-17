namespace WorldFeed.Science.Upload.Data.Models.ExtendedFeedEntities
{
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.WorldFeed.Feed.ExtendedEntities;

    public class VideoFeedEntityVariant : BaseDeletableModel<long>, IVideoFeedEntityVariant
    {
        public int Bitrate { get; set; }

        public string ContentType { get; set; }

        public string URL { get; set; }

        public long VideoFeedInformationEntityId { get; set; }
        public VideoFeedInformationEntity VideoFeedInformationEntity { get; set; }
    }
}
