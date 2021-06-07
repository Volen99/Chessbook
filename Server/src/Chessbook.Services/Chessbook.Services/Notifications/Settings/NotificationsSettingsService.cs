using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chessbook.Core.Domain.Notifications;
using Chessbook.Data;
using Chessbook.Services.Data;
using Microsoft.EntityFrameworkCore;

namespace Chessbook.Services.Notifications.Settings
{
    public class NotificationsSettingsService : INotificationsSettingsService
    {
        private readonly IRepository<UserNotificationSettingModel> userNotificationRepository;
        private readonly IRelationshipService relationshipService;

        public NotificationsSettingsService(IRepository<UserNotificationSettingModel> userNotificationRepository, IRelationshipService relationshipService)
        {
            this.userNotificationRepository = userNotificationRepository;
            this.relationshipService = relationshipService;
        }

        public async Task CreateAsync(UserNotificationSettingModel settings)
        {
            await this.userNotificationRepository.InsertAsync(settings);
        }

        public async Task<UserNotificationSettingModel> GetByUserId(int userId)
        {
            var userNotificationSetting = await this.userNotificationRepository.Table
                .Where(p => p.CustomerId == userId)
                .FirstOrDefaultAsyncExt();

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
