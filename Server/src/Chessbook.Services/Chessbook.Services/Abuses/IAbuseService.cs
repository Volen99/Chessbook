using Nop.Core;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Abuse;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Chessbook.Services.Abuses
{
    public interface IAbuseService
    {
        Task<int> CreateAccountAbuse(int reporterAccountId, string reason, AbuseState state, string predefinedReasons, int flaggedAccountId);

        Task<Abuse> LoadByIdWithReporter(int number);

        Task<IPagedList<Abuse>> ListMyAbuses(int start, int count, string sort, int? id = null, string search = null, AbuseState? abuseState = default(AbuseState), int? customerId = null);

        Task<IPagedList<Abuse>> ListAbusesForAdmins(int start, int count, string sort, string filter, int? accountId = null, int? id = null, List<string> PredefinedReasons = null,
            AbuseState? abuseState = default(AbuseState), string videoIs = null, string search = null, string searchReporter = null, string searchReportee = null,
            string searchVideo = null);

        /// <summary>
        /// Parse "predefinedReasons enum Ids" property
        /// </summary>
        /// <param name="product">Product</param>
        /// <returns>A list of required product IDs</returns>
        public virtual int[] ParsePredefinedReasonsIds(Abuse abuse)
        {
            if (abuse == null)
            {
                throw new ArgumentNullException(nameof(abuse));
            }

            if (string.IsNullOrEmpty(abuse.PredefinedReasons))
            {
                return Array.Empty<int>();
            }

            var ids = new List<int>();

            foreach (var idStr in abuse.PredefinedReasons
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => x.Trim()))
                if (int.TryParse(idStr, out var id))
                    ids.Add(id);

            return ids.ToArray();
        }

    }
}
