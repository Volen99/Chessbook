using System;

using Chessbook.Web.Areas.Admin.Models.Customers;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.PrivateMessages
{
    public record PrivateMessageModel : BaseNopEntityModel
    {
        public int FromCustomerId { get; set; }
        public string CustomerFromName { get; set; }
        public bool AllowViewingFromProfile { get; set; }

        public CustomerModel FromUser { get; set; }

        public CustomerModel ToUser { get; set; }

        public int ToCustomerId { get; set; }
        public string CustomerToName { get; set; }
        public bool AllowViewingToProfile { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }
        
        public DateTime CreatedOn { get; set; }

        public bool IsRead { get; set; }
    }
}