namespace Sharebook.Post.DTO
{
    public interface ITweetWithSearchMetadataDTO : IPostDTO
    {
        ITweetFromSearchMetadata TweetFromSearchMetadata { get; }
    }
}
