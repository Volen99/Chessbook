using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Models.Posts;
using Nop.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.UserNotification
{
    public record PostCommentNotificationModel : BaseNopEntityModel
    {
        public int ThreadId { get; set; }

        public UserInfoModel Account { get; set; }

        public PostInfoModel Post { get; set; } 
    }
}
