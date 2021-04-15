using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Inputs.Posts
{
    public class QueryPostsProfileTimeline
    {
        [BindProperty(Name = "user_id")]

        public int UserId { get; set; }

        public int Start { get; set; }

        public int Count { get; set; }

        public string Sort { get; set; }

        [BindProperty(Name = "skip_count")]
        public bool SkipCount { get; set; }

        [BindProperty(Name = "exclude_replies")]
        public bool ExcludeReplies { get; set; }

        [BindProperty(Name = "include_rts")]
        public bool IncludeRts { get; set; }

    }
}
