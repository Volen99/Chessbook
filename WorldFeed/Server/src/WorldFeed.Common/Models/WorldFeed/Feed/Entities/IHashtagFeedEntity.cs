namespace WorldFeed.Common.Models.WorldFeed.Feed.Entities
{
    public interface IHashtagFeedEntity
    {
        /// <summary>
        /// HashTag name
        /// </summary>
        string Text { get; set; }

        /// <summary>
        /// The character positions the Hashtag was extracted from
        /// </summary>
        string Indices { get; set; }

        long FeedEntitiesId { get; set; }
    }
}
