using System;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Relationships
{
    public class UserFollow : BaseEntity
    {
        public FollowState State { get; set; }

        public int Score { get; set; }              // lol that is dope 🔥

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public int UserId { get; set; }
        public Customer UserFollower { get; set; }

        public int TargetUserId { get; set; }
        public Customer UserFollowing { get; set; }
    }
}
