using Chessbook.Data.Common.Repositories;
using Chessbook.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Services.Data
{
    public class StreamersService : IStreamersService
    {
        private readonly IDeletableEntityRepository<TwitchLoginName> twitchLoginNamesRepository;

        public StreamersService(IDeletableEntityRepository<TwitchLoginName> twitchLoginNamesRepository)
        {
            this.twitchLoginNamesRepository = twitchLoginNamesRepository;
        }

        public async Task<string> SaveUserLogin(string userLogin, int userId)
        {
            var doesExits = this.twitchLoginNamesRepository.All()
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

            await this.twitchLoginNamesRepository.AddAsync(twitchLoginName);
            await this.twitchLoginNamesRepository.SaveChangesAsync();

            return userLogin;
        }

        public async Task<string[]> GetAllLoginNames()
        {
            var loginNames = await this.twitchLoginNamesRepository.All()
                .Select(ln => ln.LoginName)
                .ToArrayAsync();

            if (loginNames.Length == 0)
            {
                return null;
            }

            return loginNames;
        }

        public async Task<string> GetByUserId(int userId)
        {
            var current = await this.twitchLoginNamesRepository.All()
                .Where(ln => ln.UserId == userId)
                .Select(ln => ln.LoginName)
                .FirstOrDefaultAsync();

            if (current == null)
            {
                return null;
            }

            return current;
        }

        public async Task<string> EditUserLogin(string newUserLogin, int userId)
        {
            var loginName = await this.twitchLoginNamesRepository.All()
                .Where(ln => ln.UserId == userId)
                .FirstOrDefaultAsync();

            loginName.LoginName = newUserLogin;

            await this.twitchLoginNamesRepository.SaveChangesAsync();

            return newUserLogin;

        }

        public async Task<string> DeleteUserLogin(string userLogin, int userId)
        {
            var loginName = await this.twitchLoginNamesRepository.All()
               .Where(ln => ln.UserId == userId)
               .FirstOrDefaultAsync();

            this.twitchLoginNamesRepository.Delete(loginName);
            await this.twitchLoginNamesRepository.SaveChangesAsync();

            return loginName.LoginName;
        }
    }
}
