using System;

namespace Chessbook.Web.Api.Models.Search
{
    public class SearchInputQuery
    {
        public int Start { get; set; }

        public int Count { get; set; }

        public string Search { get; set; }

        public string TagsOneOf { get; set; }

        public string Sort { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? OriginallyPublishedStartDate { get; set; }

        public DateTime? OriginallyPublishedEndDate { get; set; }
    }
}
