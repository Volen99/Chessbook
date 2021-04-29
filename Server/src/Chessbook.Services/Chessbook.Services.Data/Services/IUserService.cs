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
        Task<User> GetByIdClean(int id, bool includeDeleted = false);

        Task<UserDTO> GetByScreenName(string screenName, bool includeDeleted = true);

        Task<UserDTO> GetByLogin(string login, bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<UserDTO> Edit(UserDTO dto);
        Task<byte[]> GetUserPhoto(int userId);

        Task<(IList<User>, int)> GetAllUsers(UsersGridFilter filter, int userId);

        Task SaveAvatarId(int userId, int pictureId);


        Task Update(dynamic user); // pff ...map that thing already!

        /// <summary>
        /// Gets a value indicating whether customer is guest
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>Result</returns>
        Task<bool> IsGuestAsync(User customer, bool onlyActiveCustomerRoles = true);

        /// <summary>
        /// Gets a value indicating whether customer is a forum moderator
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>Result</returns>
        Task<bool> IsForumModeratorAsync(User customer, bool onlyActiveCustomerRoles = true);

    }
}
