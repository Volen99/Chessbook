using System;

using Chessbook.Web.Areas.Admin.Models.Customers;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Blocklist
{
    public record UserBlocklistModel : BaseNopEntityModel
    {
        public CustomerModel ByAccount { get; set; }

        public CustomerModel BlockedAccount { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
