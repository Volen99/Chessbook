using System;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Abuse
{
    public class Abuse : BaseEntity
    {
        public string Reason { get; set; }

        public AbuseState State { get; set; }

        public string ModerationComment { get; set; }

        // enum int's array (comma separated)
        public string PredefinedReasons { get; set; }

        public int? ReporterAccountId { get; set; }
        public Customer ReporterAccount { get; set; }

        public int? FlaggedAccountId { get; set; }
        public Customer FlaggedAccount { get; set; }

        public int? PostAbuseId { get; set; }
        public PostAbuseModel PostAbuse { get; set; }

        public int? PostCommentAbuseId { get; set; }
        public PostCommentAbuseModel PostCommentAbuse { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
