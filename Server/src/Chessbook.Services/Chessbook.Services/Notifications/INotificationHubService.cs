using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Services.Notifications
{
    public interface INotificationHubService
    {
        Task NewUserRegistered(int userId);
        Task NotificationDataUpdate(int senderId, int receiverId);
    }
}
