using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Chessbook.Data;
using Chessbook.Services.Data;
using Chessbook.Services;
using Chessbook.Core.Domain.Notifications;

namespace Chessbook.Services.Notifications.Settings
{
    public class NotificationsSettingsService : INotificationsSettingsService
    {
        private readonly IRepository<UserNotificationSettingModel> userNotificationRepository;
        private readonly IRelationshipService relationshipService;
        private readonly IUserService userService;

        public NotificationsSettingsService(IRepository<UserNotificationSettingModel> userNotificationRepository, IRelationshipService relationshipService, IUserService userService)
        {
            this.userNotificationRepository = userNotificationRepository;
            this.relationshipService = relationshipService;
            this.userService = userService;
        }

        public async Task CreateAsync(UserNotificationSettingModel settings)
        {
            await this.userNotificationRepository.InsertAsync(settings);
        }

        public async Task<UserNotificationSettingModel> GetByUserId(int userId)
        {
            var userNotificationSetting = await this.userNotificationRepository.Table
                .Include(u => u.Customer)
                .Where(p => p.CustomerId == userId)
                .FirstOrDefaultAsyncExt();

            if (userNotificationSetting == null)
            {
                return null;
            }

            if (userNotificationSetting.Customer == null)
            {
                userNotificationSetting.Customer = await this.userService.GetCustomerByIdAsync(userNotificationSetting.CustomerId);
            }

            return userNotificationSetting;
        }

        public async Task<List<UserNotificationSettingModel>> ListUserSubscribersOf(int yourId)
        {
            var users = await this.userNotificationRepository.Table.Include(u => u.Customer).ToListAsync();

            // TODO: I think bad performance here
            var res = new List<UserNotificationSettingModel>();
            foreach (var user in users)
            {
                var relationship = await this.relationshipService.GetByUsersId(user.CustomerId, yourId);

                if (relationship.Following)
                {
                    res.Add(user);
                }
            }

            return res;
        }

        public async Task UpdateUserNotificationSettingModelAsync(UserNotificationSettingModel userNotificationSetting)
        {
            await this.userNotificationRepository.UpdateAsync(userNotificationSetting);
        }
    }
}
