using Chessbook.Core.Domain.Abuse;

namespace Chessbook.Web.Models.Inputs
{
    public class QueryGetInputModel
    {
        public int Start { get; set; }

        public int Count { get; set; }

        public string Sort { get; set; }


        public int? Id { get; set; }

        public string Search { get; set; }

        public AbuseState? AbuseState { get; set; }

    }
}
