namespace Chessbook.Data.Models.Comments
{
    using global::System.Collections.Generic;
    using global::System.ComponentModel.DataAnnotations;

    using Chessbook.Data.Common.Models;

    public class Comment : BaseDeletableModel<long>
    {
        public Comment()
        {
            Status = CommentStatus.Approved;
        }

        public int PostId { get; set; }

        public virtual Post.Post Post { get; set; }

        public long UserId { get; set; }

        public virtual Customer User { get; set; }

        public string Text { get; set; }

        [StringLength(450)]
        public string CommenterName { get; set; }

        public CommentStatus Status { get; set; }

        [StringLength(450)]
        public string EntityTypeId { get; set; }

        public long EntityId { get; set; }

        public long? ParentId { get; set; }

        public Comment Parent { get; set; }

        public IList<Comment> Replies { get; protected set; } = new List<Comment>();

    }
}
