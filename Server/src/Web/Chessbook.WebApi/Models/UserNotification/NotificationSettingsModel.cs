using Chessbook.Core.Domain.Notifications;
using Nop.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.UserNotification
{
    public record NotificationSettingsModel : BaseNopEntityModel
    {
        public int NewVideoFromSubscription { get; set; }

        public int NewCommentOnMyVideo { get; set; }

        public int AbuseAsModerator { get; set; }

        public int VideoAutoBlacklistAsModerator { get; set; }

        public int BlacklistOnMyVideo { get; set; }

        public int MyVideoPublished { get; set; }

        public int NewUserRegistration { get; set; }

        public int NewFollow { get; set; }

        public int CommentMention { get; set; }

        public int AbuseStateChange { get; set; }

        public int AbuseNewMessage { get; set; }

    }
}
