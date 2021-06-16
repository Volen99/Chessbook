using System.Collections.Generic;
using Chessbook.Core.Domain.Abuse;

namespace Chessbook.Web.Api.Areas.Admin.Web.Models
{
    public class QueryListAbusesAdminModel
    {
        public int Start { get; set; } // Offset used to paginate results

        public int Count { get; set; } // Number of items to return

        public string Filter { get; set; } // Enum: "video" "comment" "account" only list account, comment or video reports

        public int Id { get; set; } // only list the report with this id

        public List<string> PredefinedReasons { get; set; }

        public string Search { get; set; } // plain search that will match with video titles, reporter names and more

        public string SearchReportee { get; set; }

        public string SearchReporter { get; set; }

        public string SearchVideo { get; set; }

        public string Sort { get; set; } 

        public AbuseState AbuseState { get; set; }

        public string VideoIs { get; set; } // Enum: "deleted" "blacklisted" only list deleted or blocklisted videos
    }
}
