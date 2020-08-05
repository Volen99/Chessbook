namespace WorldFeed.Common.Public.Models.Interfaces
{
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public interface ITweetWithSearchMetadata : ITweet
    {
        /// <summary>
        /// Property containing search metadata.
        /// </summary>
        ITweetFromSearchMetadata SearchMetadata { get; }
    }
}
