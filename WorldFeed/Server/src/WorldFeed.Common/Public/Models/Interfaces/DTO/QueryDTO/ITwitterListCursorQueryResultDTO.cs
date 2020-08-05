namespace WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO
{
    public interface ITwitterListCursorQueryResultDTO : IBaseCursorQueryDTO<ITwitterListDTO>
    {
        ITwitterListDTO[] TwitterLists { get; set; }
    }
}
