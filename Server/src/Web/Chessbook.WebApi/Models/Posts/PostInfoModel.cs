using Chessbook.Web.Framework.Models;
using Chessbook.Web.Api.Areas.Admin.Models.Users;

namespace Chessbook.Web.Api.Models.Posts
{
    public partial record PostInfoModel : BaseNopEntityModel
    {
        public string Uuid { get; set; }

        public string Name { get; set; }

        public UserInfoModel User { get; set; }
    }
}
