namespace WorldFeed.Common.Models.WorldFeed.Feed.Entities
{
    public interface ISymbolFeedEntity
    {
        /// <summary>
        /// Text containing the symbol
        /// </summary>
        string Text { get; set; }

        /// <summary>
        /// The symbol text start and end position
        /// </summary>
        string Indices { get; set; }

        long FeedEntitiesId { get; set; }
    }
}
