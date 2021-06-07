using Chessbook.Core.Domain.Notifications;
using Chessbook.Web.Api.Models.UserNotification;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Factories
{
    public interface IUserNotificationSettingModelFactory
    {
        Task<NotificationSettingsModel> PrepareUserNotificationSettingModelAsync(UserNotificationSettingModel userNotificationSettingModel);
    }
}
