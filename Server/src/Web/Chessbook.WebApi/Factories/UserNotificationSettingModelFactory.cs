using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Web.Api.Models.UserNotification;

namespace Chessbook.Web.Api.Factories
{
    public class UserNotificationSettingModelFactory : IUserNotificationSettingModelFactory
    {
        public async Task<NotificationSettingsModel> PrepareUserNotificationSettingModelAsync(UserNotificationSettingModel userNotificationSettingModel)
        {
            var model = new NotificationSettingsModel
            {
                AbuseAsModerator = (int)userNotificationSettingModel.AbuseAsModerator,
                AbuseNewMessage = (int)userNotificationSettingModel.AbuseNewMessage,
                AbuseStateChange = (int)userNotificationSettingModel.AbuseStateChange,
                BlacklistOnMyVideo = (int)userNotificationSettingModel.BlacklistOnMyVideo,
                CommentMention = (int)userNotificationSettingModel.CommentMention,
                NewCommentOnMyVideo = (int)userNotificationSettingModel.NewCommentOnMyVideo,
                NewFollow = (int)userNotificationSettingModel.NewFollow,
                NewVideoFromSubscription = (int)userNotificationSettingModel.NewVideoFromSubscription,
            };

            return model;
        }
    }
}
