namespace Chessbook.Core.Domain.Posts
{
    using System;
    using System.Collections.Generic;

    using Chessbook.Core.Domain.Common;
    using Chessbook.Core.Domain.Polls;
    using Chessbook.Data.Models;

    public class Post : BaseEntity, ISoftDeletedEntity
    {
        public string IdStr { get; set; }

        public int UserId { get; set; }
        public virtual Customer User { get; set; }

        public string Status { get; set; }

        public string UserMentionsIds { get; set; }

        public int? PollId { get; set; }
        public virtual Poll Poll { get; set; }

        public int InReplyToStatusId { get; set; }

        public string InReplyToStatusIdStr { get; set; }

        public int InReplyToUserId { get; set; }

        public string InReplyToScreenName { get; set; }

        public int RepostCount { get; set; }

        public long FavoriteCount { get; set; }

        public long DislikeCount { get; set; }

        public int ReplyCount { get; set; }

        public int QuoteCount { get; set; }

        public bool Favorited { get; set; }

        public bool IsQuoteStatus { get; set; }

        public bool Pinned { get; set; }

        public bool HasMedia { get; set; }

        public bool Deleted { get; set; }

        public int? RepostId { get; set; }
        public Post Repost { get; set; }

        public ICollection<Tag> Tags { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
