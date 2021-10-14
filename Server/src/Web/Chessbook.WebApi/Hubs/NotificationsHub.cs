using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Services.Notifications;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Models.Inputs;

namespace Ordering.SignalrHub
{
    [Authorize]
    public class NotificationsHub : Hub
    {
        static readonly List<NotificationConnection> _notificationConnections = new List<NotificationConnection>();

        private readonly IUserNotificationService userNotificationService; 
        private readonly IUserNotificationModelFactory userNotificationModelFactory;

        public NotificationsHub(IUserNotificationModelFactory userNotificationModelFactory, IUserNotificationService userNotificationService)
        {
            this.userNotificationModelFactory = userNotificationModelFactory;
            this.userNotificationService = userNotificationService;
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            await base.OnDisconnectedAsync(ex);
        }

        private UserNotificationSettingValue IsWebNotificationEnabled(UserNotificationSettingValue value)
        {

            return value & UserNotificationSettingValue.WEB;
        }

        public class NotificationConnection
        {
            public string ConnectionId { get; set; }
            public int UserId { get; set; }
        }
    }
}
