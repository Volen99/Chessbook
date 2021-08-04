using System;

using Nop.Web.Areas.Admin.Models.Customers;
using Nop.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Blocklist
{
    public record UserBlocklistModel : BaseNopEntityModel
    {
        public CustomerModel ByAccount { get; set; }

        public CustomerModel BlockedAccount { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
