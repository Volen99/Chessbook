namespace WorldFeed.History.BC.Science.Hubs
{
    using Microsoft.AspNetCore.SignalR;
    using System;
    using System.Threading.Tasks;

    using static WorldFeed.History.BC.Science.Common.Constants;

    public class PostsHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
                await this.Groups.AddToGroupAsync(this.Context.ConnectionId, AuthenticatedUsersGroup);
            if (this.Context.User.Identity.IsAuthenticated)
            {
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await this.Groups.RemoveFromGroupAsync(this.Context.ConnectionId, AuthenticatedUsersGroup);
        }
    }
}
