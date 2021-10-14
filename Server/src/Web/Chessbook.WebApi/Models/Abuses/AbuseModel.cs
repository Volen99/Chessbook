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

        public DateTime CreatedAt { get; set; }
    }

    public record StateModel
    {
        public int Id { get; set; }

        public string Label { get; set; }
    }
}
