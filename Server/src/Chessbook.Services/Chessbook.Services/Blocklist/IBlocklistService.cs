using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Customers;
using Chessbook.Data.Models;
using Chessbook.Core;

namespace Chessbook.Services.Blocklist
{
    public interface IBlocklistService
    {
        Task Block(int userId, string screenName);

        Task<UserBlocklist> LoadByUserAndTarget(int accountId, int targetAccountId);

        Task<IPagedList<UserBlocklist>> GetUserBlocklistAccounts(int start, int count, string sort, int userId, string search = null);

        Task UnBlock(int userId, string screenName);

        Task<Dictionary<int, bool>> IsAccountMutedByMulti(List<int> accountIds, int targetAccountId);

        Task<bool> IsBlockedByServerOrAccount(Customer targetAccount, Customer userAccount);
    };
}
