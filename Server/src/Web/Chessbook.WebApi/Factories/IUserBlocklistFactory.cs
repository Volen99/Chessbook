using System.Threading.Tasks;

using Chessbook.Core.Domain.Customers;
using Chessbook.Web.Api.Models.Blocklist;

namespace Chessbook.Web.Api.Factories
{
    public interface IUserBlocklistFactory
    {
        Task<UserBlocklistModel> PrepareUserBlocklistModel(UserBlocklist userBlocklist);
    }
}
