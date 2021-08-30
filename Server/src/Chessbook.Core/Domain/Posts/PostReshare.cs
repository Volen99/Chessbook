using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Posts
{
    public class PostReshare : BaseEntity
    {
        // originalPostId
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public int ResharedPostId { get; set; }

        public int UserId { get; set; } // the creator of this share..
    }
}
