using Microsoft.AspNetCore.Mvc;

namespace Chessbook.Web.Models.Inputs.Posts
{
    public class QueryPostsProfileTimeline
    {
        public int UserId { get; set; }

        public int Start { get; set; }

        public bool OnlyMedia { get; set; }

        public int Count { get; set; }

        public string Sort { get; set; }

        public bool SkipCount { get; set; }

        public bool ExcludeReplies { get; set; }

        public bool IncludeRts { get; set; }

    }
}
