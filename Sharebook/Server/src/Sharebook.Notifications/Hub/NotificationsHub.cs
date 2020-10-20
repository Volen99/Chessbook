namespace Sharebook.Notifications.Hub
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

    using static Constants;

    public class NotificationsHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            if (this.Context.User.Identity.IsAuthenticated)
            {
                await this.Groups.AddToGroupAsync(this.Context.ConnectionId, AuthenticatedUsersGroup);
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (this.Context.User.Identity.IsAuthenticated)
            {
                // this.Context.ConnectionId is a unique browser Id that is connected
                await this.Groups.RemoveFromGroupAsync(this.Context.ConnectionId, AuthenticatedUsersGroup);
            }
        }
    }
}
