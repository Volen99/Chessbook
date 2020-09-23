namespace WorldFeed.Search.DTO
{
    using WorldFeed.Common.DTO;

    public interface ISearchResultsDTO
    {
        TweetWithSearchMetadataDTO[] TweetDTOs { get; set; }

        ISearchMetadata SearchMetadata { get; set; }
    }
}
