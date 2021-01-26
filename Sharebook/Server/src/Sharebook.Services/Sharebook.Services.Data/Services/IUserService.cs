namespace Sharebook.Services.Data.Services
{
    using System.Threading.Tasks;

    using Sharebook.Web.Models;

    public interface IUserService
    {
        Task<UserDTO> GetById(int id, bool includeDeleted = false);
        Task<UserDTO> GetByLogin(string login, bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<UserDTO> Edit(UserDTO dto);
        Task<byte[]> GetUserPhoto(int userId);
    }
}
