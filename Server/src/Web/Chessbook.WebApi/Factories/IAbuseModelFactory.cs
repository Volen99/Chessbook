using Chessbook.Core.Domain.Abuse;
using Chessbook.Web.Api.Models.Abuses;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Factories
{
    public interface IAbuseModelFactory
    {
        Task<AbuseModel> PrepareAbuseModel(Abuse abuse);
    }
}
