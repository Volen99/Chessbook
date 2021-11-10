using System;
using System.Collections.Generic;

using Chessbook.Web.Areas.Admin.Models.Customers;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Abuses
{
    public record AbuseModel : BaseNopEntityModel
    {
        public string Reason { get; set; }

        public List<string> PredefinedReasons { get; set; }

        public CustomerModel ReporterAccount { get; set; }

        public CustomerModel FlaggedAccount { get; set; }

        public StateModel State { get; set; }

        public string ModerationComment { get; set; }

        public AdminPostAbuse Post { get; set; }

        public AdminPostCommentAbuse Comment { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public int? CountReportsForReporter { get; set; }
        public int? CountReportsForReportee { get; set; }

        public int CountMessages { get; set; }
    }

    public record AdminPostAbuse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool Deleted { get; set; }

        public int? StartAt { get; set; }

        public int? EndAt { get; set; }

        public bool ThumbnailPath { get; set; }

        public CustomerModel Channel { get; set; }

        public int CountReports { get; set; }

        public int NthReport { get; set; }
    }

    public record AdminPostCommentAbuse
    {
        public int Id { get; set; }

        public int ThreadId { get; set; }

        public CommentVideo Video { get; set; }

        public string Text { get; set; }

        public bool Deleted { get; set; }
    }

    public record StateModel
    {
        public int Id { get; set; }

        public string Label { get; set; }
    }

    public class CommentVideo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ScreenName { get; set; }
    }
}
