using Chessbook.Data.Models;
using Chessbook.Web.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Factories
{
    public interface IUserModelFactory
    {
        Task<UserDTO> PrepareCustomerModelAsync(UserDTO model, bool excludeProperties = false);
    }

}
