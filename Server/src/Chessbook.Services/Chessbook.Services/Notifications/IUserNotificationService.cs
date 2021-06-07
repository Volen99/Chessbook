using Chessbook.Core.Domain.Notifications;
using Chessbook.Web.Models.Inputs;
using Nop.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chessbook.Services.Notifications
{
    public interface IUserNotificationService
    {
        Task<UserNotification> Create(UserNotificationType type, int userId, int postId);

        Task<IPagedList<UserNotification>> List(int userId, int start, int count, string sort, bool? unread);

        Task<UserNotification> InsertUserNotificationAsync(UserNotificationModelForApi notification);

        Task<List<UserNotification>> ListUserSubscribersOf(int userId);
    }
}
