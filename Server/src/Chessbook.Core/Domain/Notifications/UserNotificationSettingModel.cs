using Chessbook.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Core.Domain.Notifications
{
    public class UserNotificationSettingModel : BaseEntity
    {
        public UserNotificationSettingValue NewVideoFromSubscription { get; set; }

        public UserNotificationSettingValue NewCommentOnMyVideo { get; set; }

        public UserNotificationSettingValue AbuseAsModerator { get; set; }

        public UserNotificationSettingValue VideoAutoBlacklistAsModerator { get; set; }

        public UserNotificationSettingValue BlacklistOnMyVideo { get; set; }

        public UserNotificationSettingValue MyVideoPublished { get; set; }

        public UserNotificationSettingValue NewUserRegistration { get; set; }

        public UserNotificationSettingValue NewFollow { get; set; }

        public UserNotificationSettingValue CommentMention { get; set; }

        public UserNotificationSettingValue AbuseStateChange { get; set; }

        public UserNotificationSettingValue AbuseNewMessage { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }          // onDelete: 'cascade'

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
