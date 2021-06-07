using System.Threading.Tasks;
using Chessbook.Core.Domain.Notifications;
using Chessbook.Web.Api.Models.UserNotification;
using Chessbook.Web.Models.Inputs;

namespace Chessbook.Web.Api.Factories
{
    public interface IUserNotificationModelFactory
    {
        public Task<UserNotificationModel> PrepareUserNotificationModelAsync(UserNotification notification);
    }
}
