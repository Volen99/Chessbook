namespace WorldFeed.Upload.Domain.Models.ExtendedFeedEntities
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class VideoEntityVariant
    {
        public int Bitrate { get; set; }

        public string ContentType { get; set; }

        public string URL { get; set; }

        public VideoInformationEntity VideoFeedInformationEntity { get; set; }
    }
}
