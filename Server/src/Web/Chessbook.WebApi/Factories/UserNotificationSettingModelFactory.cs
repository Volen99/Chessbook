using Chessbook.Core.Domain.Notifications;
using Chessbook.Web.Api.Models.UserNotification;
using System.Threading.Tasks;

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
                MyVideoPublished = (int)userNotificationSettingModel.MyVideoPublished,
                NewCommentOnMyVideo = (int)userNotificationSettingModel.NewCommentOnMyVideo,
                NewFollow = (int)userNotificationSettingModel.NewFollow,
                NewUserRegistration = (int)userNotificationSettingModel.NewUserRegistration,
                NewVideoFromSubscription = (int)userNotificationSettingModel.NewVideoFromSubscription,
                VideoAutoBlacklistAsModerator = (int)userNotificationSettingModel.VideoAutoBlacklistAsModerator,
            };

            return model;
        }
    }
}
