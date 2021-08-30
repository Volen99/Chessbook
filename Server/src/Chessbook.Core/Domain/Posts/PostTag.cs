using System;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Posts
{
    public class PostTag : BaseEntity
    {
        public int PostId { get; set; }
        public Post Post { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
