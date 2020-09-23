namespace WorldFeed.Profile.Application.DTO.QueryDTO.Cursor
{
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Profile.DTO;
    public interface IUserCursorQueryResultDTO : IBaseCursorQueryDTO<IUserDTO>
    {
        IUserDTO[] Users { get; set; }
    }
}
