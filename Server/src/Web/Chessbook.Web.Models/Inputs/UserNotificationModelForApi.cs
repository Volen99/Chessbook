using Chessbook.Core.Domain.Notifications;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Web.Models.Inputs
{
    public class UserNotificationModelForApi
    {
        public Post Post { get; set; }

        public UserNotificationSettingModel NotificationSetting { get; set; }
    }
}
