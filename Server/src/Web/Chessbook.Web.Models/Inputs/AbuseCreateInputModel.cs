using System.Collections.Generic;

namespace Chessbook.Web.Models.Inputs
{
    public class AbuseCreateInputModel
    {
        public string Reason { get; set; }

        public List<string> PredefinedReasons { get; set; }

        public Account Account { get; set; }

        public PostInput Post { get; set; }

        public CommentInput Comment { get; set; }
    }

    public class Account
    {
        public int Id { get; set; }
    }

    public class PostInput
    {
        public int Id { get; set; }

    }

    public class CommentInput
    {
        public int Id { get; set; }
    }
}
