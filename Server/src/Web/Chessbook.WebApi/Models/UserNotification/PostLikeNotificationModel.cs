using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Models.Posts;

namespace Chessbook.Web.Api.Models.UserNotification
{
    public class PostLikeNotificationModel
    {
        public UserInfoModel Account { get; set; }

        public PostInfoModel Post { get; set; }
    }
}
