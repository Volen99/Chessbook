namespace WorldFeed.Common.Public.Models.Interfaces
{
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

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
