using System;

using Chessbook.Core.Domain.Posts;
using Chessbook.Core.Domain.Relationships;
using Chessbook.Data.Models;
using Chessbook.Data.Models.Post;

namespace Chessbook.Core.Domain.Notifications
{
    public class UserNotification : BaseEntity
    {
        public UserNotificationType Type { get; set; }

        public int UserId { get; set; }
        public Customer User { get; set; }

        public int? PostId { get; set; }
        public Post Post { get; set; }

        public int? CommentId { get; set; }
        public PostComment Comment { get; set; }

        public int? RelationshipId { get; set; }
        public Relationship Relationship { get; set; }

        public int? UserFollowId { get; set; }
        public UserFollow UserFollow { get; set; }

        public int? PostVoteId { get; set; }
        public PostVote PostVote { get; set; }

        public bool Read { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
