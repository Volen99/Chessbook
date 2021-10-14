using System.Threading.Tasks;

using Chessbook.Core.Domain.Abuse;
using Chessbook.Web.Api.Models.Abuses;

namespace Chessbook.Web.Api.Factories
{
    public interface IAbuseModelFactory
    {
        Task<AbuseModel> PrepareAbuseModel(Abuse abuse);
    }
}
