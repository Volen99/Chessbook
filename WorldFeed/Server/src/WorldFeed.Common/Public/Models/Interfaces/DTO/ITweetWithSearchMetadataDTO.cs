namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    public interface ITweetWithSearchMetadataDTO : ITweetDTO
    {
        ITweetFromSearchMetadata TweetFromSearchMetadata { get; }
    }
}
