using System;
using System.Collections.Generic;

using Chessbook.Core.Domain.Abuse;
using Chessbook.Core.Domain.Common;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Posts
{
    public class PostComment : BaseEntity, ISoftDeletedEntity
    {
        public string Url { get; set; }

        public string Text { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

        public int UserId { get; set; }
        public Customer User { get; set; }

        public int? OriginCommentId { get; set; }  // ParentId? 🤔
        public PostComment OriginPostComment { get; set; }

        public int? InReplyToCommentId { get; set; }
        public PostComment InReplyToVideoComment { get; set; }

        public List<PostCommentAbuseModel> CommentAbuses { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        public bool Deleted { get; set; }
    }
}
