using System;

using Chessbook.Core.Domain.Post;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Abuse
{
    public class PostCommentAbuseModel : BaseEntity
    {
        public int AbuseId { get; set; }
        public Abuse Abuse { get; set; }

        public int PostCommentId { get; set; }
        public PostComment PostComment { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
