namespace WorldFeed.Upload.Domain.Models.ExtendedFeedEntities
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class VideoInformationEntity
    {
        public string AspectRatio { get; set; }

        public int DurationInMilliseconds { get; set; }

        public VideoEntityVariant[] Variants { get; set; }
    }
}
