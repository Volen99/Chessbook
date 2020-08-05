namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using WorldFeed.Common.DTO;

    public interface ISearchResultsDTO
    {
        TweetWithSearchMetadataDTO[] TweetDTOs { get; set; }

        ISearchMetadata SearchMetadata { get; set; }
    }
}
