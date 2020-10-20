namespace Sharebook.Search.DTO
{
    using Sharebook.Common.DTO;

    public interface ISearchResultsDTO
    {
        TweetWithSearchMetadataDTO[] TweetDTOs { get; set; }

        ISearchMetadata SearchMetadata { get; set; }
    }
}
