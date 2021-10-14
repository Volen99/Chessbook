using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using System;

namespace Chessbook.Core.Domain.Abuse
{
    public class PostAbuseModel : BaseEntity
    {
        public int AbuseId { get; set; }
        public Abuse Abuse { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
