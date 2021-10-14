using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Areas.Admin.Models.Users
{
    public record UserInfoModel: BaseNopEntityModel
    {
        public string DisplayName { get; set; }

        public string ScreenName { get; set; }

        public string AvatarUrl { get; set; }
    }
}
