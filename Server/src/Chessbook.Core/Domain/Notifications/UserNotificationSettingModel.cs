using System;
using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Notifications
{
    public class UserNotificationSettingModel : BaseEntity
    {
        public UserNotificationSettingValue NewVideoFromSubscription { get; set; }

        public UserNotificationSettingValue NewCommentOnMyVideo { get; set; }

        public UserNotificationSettingValue AbuseAsModerator { get; set; } // change to NewPrivateMessage

        public UserNotificationSettingValue BlacklistOnMyVideo { get; set; }

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
