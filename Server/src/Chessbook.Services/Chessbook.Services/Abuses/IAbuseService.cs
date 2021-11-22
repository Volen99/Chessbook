using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Abuse;

namespace Chessbook.Services.Abuses
{
    public interface IAbuseService
    {
        Task<int> CreatePostAbuse(Abuse baseAbuse, int postId);

        Task<int> CreateCommentAbuse(Abuse baseAbuse, int commentId);

        Task<int> CreateAccountAbuse(Abuse baseAbuse, int reporterAccountId, int flaggedAccountId);

        Task<Abuse> GetById(int id);

        Task<Abuse> LoadByIdWithReporter(int number);

        Task<IPagedList<Abuse>> ListMyAbuses(int start, int count, string sort, int? id = null, string search = null, AbuseState? abuseState = default(AbuseState), int? customerId = null);

        Task<IPagedList<Abuse>> ListAbusesForAdmins(int start, int count, string sort, string filter, int? accountId = null, int? id = null, List<string> PredefinedReasons = null,
            AbuseState? abuseState = default(AbuseState), string videoIs = null, string search = null, string searchReporter = null, string searchReportee = null,
            string searchVideo = null);

        Task DeleteAbuse(Abuse abuse);

        int CountReportsForPost(int postId);

        int[] ParsePredefinedReasonsIds(Abuse abuse);

    }
}
