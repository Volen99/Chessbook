using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chessbook.Services.Data
{
    public interface IStreamersService
    {
        Task<string> GetByUserId(int userId);

        Task<IList<string>> GetAllLoginNames();

        Task<string> SaveUserLogin(string userLogin, int userId);

        Task<string> EditUserLogin(string userLogin, int userId);

        Task<string> DeleteUserLogin(string userLogin, int userId);

    }
}
