namespace WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO
{
    public interface IUserCursorQueryResultDTO : IBaseCursorQueryDTO<IUserDTO>
    {
        IUserDTO[] Users { get; set; }
    }
}
