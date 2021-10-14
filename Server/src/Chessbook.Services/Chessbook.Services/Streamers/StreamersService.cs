using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Data;
using Chessbook.Data.Models;

namespace Chessbook.Services.Data
{
    public class StreamersService : IStreamersService
    {
        private readonly IRepository<TwitchLoginName> twitchLoginNamesRepository;

        public StreamersService(IRepository<TwitchLoginName> twitchLoginNamesRepository)
        {
            this.twitchLoginNamesRepository = twitchLoginNamesRepository;
        }

        public async Task<string> SaveUserLogin(string userLogin, int userId)
        {
            var doesExits = this.twitchLoginNamesRepository.Table
                .Where(ul => ul.LoginName == userLogin)
                .FirstOrDefault();

            if (doesExits != null)
            {
                return null;
            }

            var twitchLoginName = new TwitchLoginName
            {
                LoginName = userLogin,
                UserId = userId,
            };

            await this.twitchLoginNamesRepository.InsertAsync(twitchLoginName);

            return userLogin;
        }

        public async Task<IList<string>> GetAllLoginNames()
        {
            var loginNames = await this.twitchLoginNamesRepository.Table
                .Select(ln => ln.LoginName)
                .ToListAsync();

            if (loginNames.Count == 0)
            {
                return null;
            }

            return loginNames;
        }

        public async Task<string> GetByUserId(int userId)
        {
            var current = await this.twitchLoginNamesRepository.Table
                .Where(ln => ln.UserId == userId)
                .Select(ln => ln.LoginName)
                .FirstOrDefaultAsyncExt();

            if (current == null)
            {
                return null;
            }

            return current;
        }

        public async Task<string> EditUserLogin(string newUserLogin, int userId)
        {
            var loginName = await this.twitchLoginNamesRepository.Table
                .Where(ln => ln.UserId == userId)
                .FirstOrDefaultAsyncExt();

            loginName.LoginName = newUserLogin;

            await this.twitchLoginNamesRepository.UpdateAsync(loginName);

            return newUserLogin;

        }

        public async Task<string> DeleteUserLogin(string userLogin, int userId)
        {
            var loginName = await this.twitchLoginNamesRepository.Table
               .Where(ln => ln.UserId == userId)
               .FirstOrDefaultAsyncExt();

            await this.twitchLoginNamesRepository.DeleteAsync(loginName);

            return loginName.LoginName;
        }
    }
}
