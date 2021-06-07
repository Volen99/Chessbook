using Chessbook.Core.Domain.Notifications;
using Chessbook.Data.Models.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Inputs
{
    public class UserNotificationModelForApi
    {
        public Post Post { get; set; }

        public UserNotificationSettingModel NotificationSetting { get; set; }
    }
}
