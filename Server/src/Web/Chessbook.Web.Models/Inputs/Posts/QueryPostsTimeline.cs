namespace Chessbook.Web.Models.Inputs.Posts
{
    using Microsoft.AspNetCore.Mvc;

    public class QueryPostsTimeline
    {
        public int Start { get; set; }

        public int Count { get; set; }

        public string Sort { get; set; }

        // [BindProperty(Name = "skip_count")]
        public bool SkipCount { get; set; }
    }
}
