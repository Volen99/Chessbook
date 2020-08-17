namespace WorldFeed.Common.Models.WorldFeed.Feed.Entities
{
    public interface IUrlFeedEntity
    {
        /// <summary>
        /// Real url
        /// </summary>
        string URL { get; set; }

        /// <summary>
        /// Message displayed instead of the url
        /// </summary>
        string DisplayedURL { get; set; }

        /// <summary>
        /// The fully resolved URL
        /// </summary>
        string ExpandedURL { get; set; }

        /// <summary>
        /// The character positions the url was extracted from
        /// </summary>
        string Indices { get; set; }

        long FeedEntitiesId { get; set; }
    }
}
