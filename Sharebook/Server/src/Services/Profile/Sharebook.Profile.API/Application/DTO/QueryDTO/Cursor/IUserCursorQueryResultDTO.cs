namespace Sharebook.Profile.Application.DTO.QueryDTO.Cursor
{
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Profile.DTO;
    public interface IUserCursorQueryResultDTO : IBaseCursorQueryDTO<IUserDTO>
    {
        IUserDTO[] Users { get; set; }
    }
}
