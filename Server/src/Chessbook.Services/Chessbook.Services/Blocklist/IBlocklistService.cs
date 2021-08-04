using System.Threading.Tasks;

using Chessbook.Core.Domain.Customers;
using Nop.Core;

namespace Chessbook.Services.Blocklist
{
    public interface IBlocklistService
    {
        Task<UserBlocklist> LoadByUserAndTarget(int accountId, int targetAccountId);

        Task<IPagedList<UserBlocklist>> GetUserBlocklistAccounts(int start, int count, string sort, int userId, string search = null);

        Task Block(int userId, string screenName);

        Task UnBlock(int userId, string screenName);
    };
}
