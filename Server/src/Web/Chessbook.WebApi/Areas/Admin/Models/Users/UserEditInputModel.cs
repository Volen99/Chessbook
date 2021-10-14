using System.Collections.Generic;

namespace Chessbook.Web.Api.Areas.Admin.Models.Users
{
    public class UserEditInputModel
    {
        public int UserId { get; set; }

        public IList<int> Role { get; set; }

        public string Email { get; set; }
    }
}
