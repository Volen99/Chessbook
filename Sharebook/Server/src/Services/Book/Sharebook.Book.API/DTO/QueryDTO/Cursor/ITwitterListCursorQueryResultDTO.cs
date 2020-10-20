namespace Sharebook.Book.DTO.QueryDTO.Cursor
{
    public interface ITwitterListCursorQueryResultDTO : IBaseCursorQueryDTO<ITwitterListDTO>
    {
        ITwitterListDTO[] TwitterLists { get; set; }
    }
}
