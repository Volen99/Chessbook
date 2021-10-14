using Microsoft.AspNetCore.Mvc;

namespace Chessbook.Web.Models.Polls
{
    public class PostCreateBody
    {
        public string[] Tags { get; set; }

        public int Privacy { get; set; }

        public PollCreateBody Poll { get; set; }
    }

    public class PollCreateBody
    {
        // poll
        public string[] Options { get; set; }

        public long ExpiresIn { get; set; }

        public bool Multiple { get; set; }

    }
}
