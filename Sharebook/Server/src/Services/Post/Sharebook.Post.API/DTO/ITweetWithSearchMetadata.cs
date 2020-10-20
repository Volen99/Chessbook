namespace Sharebook.Post.DTO
{
    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public interface ITweetWithSearchMetadata : ITweet
    {
        /// <summary>
        /// Property containing search metadata.
        /// </summary>
        ITweetFromSearchMetadata SearchMetadata { get; }
    }
}
