namespace Sharebook.Services.Data.Services
{
    using System.Threading.Tasks;

    using Sharebook.Data.Common.Filters;
    using Sharebook.Data.Common.System;
    using Sharebook.Web.Models;

    public interface IUserService
    {
        Task<GridData<UserDTO>> GetDataForGrid(UsersGridFilter filter, bool includeDeleted = false);

        Task<UserDTO> GetById(int id, bool includeDeleted = false);
        Task<UserDTO> GetByLogin(string login, bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<UserDTO> Edit(UserDTO dto);
        Task<byte[]> GetUserPhoto(int userId);
    }
}
