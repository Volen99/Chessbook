using Chessbook.Core.Domain.Posts;
using System.Collections.Generic;

namespace Chessbook.Web.Models.Inputs
{
    public class AbuseCreateInputModel
    {
        public string Reason { get; set; }

        public List<string> PredefinedReasons { get; set; }

        public Account Account { get; set; }

        public Post Post { get; set; }
    }

    public class Account
    {
        public int Id { get; set; }
    }
}
