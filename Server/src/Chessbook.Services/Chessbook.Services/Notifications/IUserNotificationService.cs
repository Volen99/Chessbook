using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Core;

namespace Chessbook.Services.Notifications
{
    public interface IUserNotificationService
    {
        Task<UserNotification> Create(UserNotificationType type, int userId, int entityId);

        Task<IPagedList<UserNotification>> List(int userId, int start, int count, string sort, bool? unread);

        Task ReadAll(int userI);
    }
}
