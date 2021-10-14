using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Web.Api.Models.UserNotification;

namespace Chessbook.Web.Api.Factories
{
    public interface IUserNotificationSettingModelFactory
    {
        Task<NotificationSettingsModel> PrepareUserNotificationSettingModelAsync(UserNotificationSettingModel userNotificationSettingModel);
    }
}
