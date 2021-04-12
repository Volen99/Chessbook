namespace Chessbook.Services.Data.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Chessbook.Data.Common.Filters;
    using Chessbook.Data.Common.System;
    using Chessbook.Data.Models;
    using Chessbook.Web.Models;

    public interface IUserService
    {
        Task<GridData<UserDTO>> GetDataForGrid(UsersGridFilter filter, bool includeDeleted = false);

        Task<UserDTO> GetById(int id, bool includeDeleted = false);

        Task<UserDTO> GetByScreenName(string screenName, bool includeDeleted = true);

        Task<UserDTO> GetByLogin(string login, bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<UserDTO> Edit(UserDTO dto);
        Task<byte[]> GetUserPhoto(int userId);

        Task<(IEnumerable<User>, int)> GetAllUsers(UsersGridFilter filter);
      
    }
}
