namespace WorldFeed.Common.Models.WorldFeed.Feed.ExtendedEntities
{
    public interface IVideoFeedInformationEntity
    {
        /// <summary>
        /// Video aspect ratio (width, height)
        /// </summary>
        string AspectRatio { get; set; }

        /// <summary>
        /// Duration of video in milliseconds
        /// </summary>
        int DurationInMilliseconds { get; set; }

        /// <summary>
        /// Video variants for different codecs, bitrates, etc.
        /// </summary>
        // VideoFeedEntityVariant[] Variants { get; set; }

        long MediaFeedEntityId { get; set; }
    }
}
