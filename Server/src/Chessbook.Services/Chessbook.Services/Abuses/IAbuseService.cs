using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Abuse;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Services.Abuses
{
    public interface IAbuseService
    {
        Task<int> CreateAccountAbuse(int reporterAccountId, string reason, AbuseState state, string predefinedReasons, int flaggedAccountId);

        Task<int> CreatePostAbuse(int reporterAccountId, string reason, AbuseState state, string predefinedReasons, int postId);

        Task<Abuse> LoadByIdWithReporter(int number);

        Task<IPagedList<Abuse>> ListMyAbuses(int start, int count, string sort, int? id = null, string search = null, AbuseState? abuseState = default(AbuseState), int? customerId = null);

        Task<IPagedList<Abuse>> ListAbusesForAdmins(int start, int count, string sort, string filter, int? accountId = null, int? id = null, List<string> PredefinedReasons = null,
            AbuseState? abuseState = default(AbuseState), string videoIs = null, string search = null, string searchReporter = null, string searchReportee = null,
            string searchVideo = null);

        int[] ParsePredefinedReasonsIds(Abuse abuse);
    }
}
