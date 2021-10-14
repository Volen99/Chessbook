using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;

namespace Chessbook.Services.Notifications.Settings
{
    public interface INotificationsSettingsService
    {
        Task CreateAsync(UserNotificationSettingModel settings);
        Task<List<UserNotificationSettingModel>> ListUserSubscribersOf(int userId);

        Task<UserNotificationSettingModel> GetByUserId(int userId);

        /// <summary>
        /// Updates the UserNotificationSetting
        /// </summary>
        /// <param name="customer">UserNotificationSetting</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task UpdateUserNotificationSettingModelAsync(UserNotificationSettingModel userNotificationSetting);
    }
}
