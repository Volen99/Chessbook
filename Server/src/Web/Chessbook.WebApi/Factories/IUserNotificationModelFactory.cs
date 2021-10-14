using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Web.Api.Models.UserNotification;

namespace Chessbook.Web.Api.Factories
{
    public interface IUserNotificationModelFactory
    {
        public Task<UserNotificationModel> PrepareUserNotificationModelAsync(UserNotification notification);
    }
}
