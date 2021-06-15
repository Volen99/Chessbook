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

        public async Task<UserNotification> Create(UserNotificationType type, int userId, int entityId)
        {
            var notification = new UserNotification
            {
                Type = type,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            if (type == UserNotificationType.NEW_VIDEO_FROM_SUBSCRIPTION)
            {
                notification.PostId = entityId;
            }
            else if (type == UserNotificationType.NEW_FOLLOW)
            {
                notification.RelationshipId = entityId;
            }

            await this.userNotificationRepository.InsertAsync(notification);

            return notification;
        }

        public async Task<IPagedList<UserNotification>> List(int userId, int start, int count, string sort, bool? unread)
        {
            var getOnlyTotalCount = string.IsNullOrEmpty(sort) ? true : false;

            var userNotifications = await this.userNotificationRepository.GetAllPagedAsync(query =>
            {
                query = query.Where(p => p.UserId == userId);

                if (unread.HasValue)
                {
                    query = query.Where(n => n.Read == !unread.Value);
                }

                //query = ascSort
                //    ? query.OrderBy(fp => fp.CreatedAt).ThenBy(fp => fp.Id)
                //    : query.OrderByDescending(fp => fp.CreatedAt).ThenBy(fp => fp.Id);

                return query;

            }, start, count, getOnlyTotalCount);

            return userNotifications;

        }

        public async Task ReadAll(int userId)
        {
            var allCurrentUserNotifications = this.userNotificationRepository.Table
                .Where(un => un.UserId == userId)
                .ToList();

            foreach (var userNotification in allCurrentUserNotifications)
            {
                userNotification.Read = true;
            }

            await this.userNotificationRepository.UpdateAsync(allCurrentUserNotifications);
        }
    }
}
