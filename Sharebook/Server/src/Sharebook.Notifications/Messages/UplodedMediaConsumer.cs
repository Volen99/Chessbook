namespace Sharebook.Notifications.Messages
{
    using System.Threading.Tasks;
    using Hub;
    using MassTransit;
    using Microsoft.AspNetCore.SignalR;

    using Sharebook.Common.Messages.Uploads;
    using static Constants;

    public class UplodedMediaConsumer : IConsumer<UploadMediaCreatedMessage>
    {
        private readonly IHubContext<NotificationsHub> hub;

        public UplodedMediaConsumer(IHubContext<NotificationsHub> hub)
        {
            this.hub = hub;
        }

        public async Task Consume(ConsumeContext<UploadMediaCreatedMessage> context)
        {
            await this.hub.Clients
                .Groups(AuthenticatedUsersGroup)
                .SendAsync(ReceiveNotificationEndpoint, context.Message);
        }
    }
}
