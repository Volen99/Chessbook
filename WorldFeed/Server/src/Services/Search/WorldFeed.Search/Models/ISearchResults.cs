namespace WorldFeed.Search.Models
{
    using WorldFeed.Search.DTO;

    public interface ISearchResults
    {
        /// <summary>
        /// All the tweets returned by the Twitter Request
        /// </summary>
        ITweetWithSearchMetadata[] Tweets { get; }

        /// <summary>
        /// Search Metadata Information
        /// </summary>
        ISearchMetadata SearchMetadata { get; }
    }
}
