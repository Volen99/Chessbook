using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Data;
using Chessbook.Web.Models.Inputs;
using Microsoft.EntityFrameworkCore;
using Nop.Core;

namespace Chessbook.Services.Notifications
{
    public class UserNotificationService : IUserNotificationService
    {
        private readonly IRepository<UserNotification> userNotificationRepository;
        private readonly IRepository<UserNotificationSettingModel> userNotificationSettingModelRepository;

        public UserNotificationService(IRepository<UserNotification> userNotificationRepository, IRepository<UserNotificationSettingModel> userNotificationSettingModelRepository)
        {
            this.userNotificationRepository = userNotificationRepository;
            this.userNotificationSettingModelRepository = userNotificationSettingModelRepository;
        }

        public async Task<UserNotification> Create(UserNotificationType type, int userId, int postId)
        {
            var notification = new UserNotification
            {
                Type = type,
                UserId = userId,
                PostId = postId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            await this.userNotificationRepository.InsertAsync(notification);

            return notification;
        }

        public Task<UserNotification> InsertUserNotificationAsync(UserNotificationSettingModel notification)
        {
            var userNotification = new UserNotification
            {
            };

            return default(Task<UserNotification>);
        }

        public Task<UserNotification> InsertUserNotificationAsync(UserNotificationModelForApi notification)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IPagedList<UserNotification>> List(int userId, int start, int count, string sort, bool? unread)
        {
            var userNotifications = await this.userNotificationRepository.GetAllPagedAsync(query =>
            {
                query = query.Where(p => p.UserId == userId);

                if (unread != null)
                {
                    query.Where(n => n.Read == !unread);
                }

                //query = ascSort
                //    ? query.OrderBy(fp => fp.CreatedAt).ThenBy(fp => fp.Id)
                //    : query.OrderByDescending(fp => fp.CreatedAt).ThenBy(fp => fp.Id);

                return query;

            }, start, count);

            return userNotifications;

        }

        public Task<List<UserNotification>> ListUserSubscribersOf(int userId)
        {
            return null;
        }
    }
}
