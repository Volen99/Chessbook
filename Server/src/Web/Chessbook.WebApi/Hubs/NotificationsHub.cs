using Chessbook.Core.Domain.Notifications;
using Chessbook.Services.Notifications;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.UserNotification;
using Chessbook.Web.Models.Inputs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Nop.Core.Infrastructure;
using Nop.Services.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public async Task SendNotification(UserNotificationModelForApi notification)
        {
            //// List all followers that are users
            //var users = await userNotificationService.ListUserSubscribersOf(notification.Post.User.Id);

            //var logger = EngineContext.Current.Resolve<ILogger>();

            //await logger.InformationAsync(string.Format($"Notifying {0} users of new video {1}.", users.Count, notification.Post.Urls));


            //UserNotificationSettingValue SettingGetter(UserNotificationModelForApi user)
            //{
            //    return user.NotificationSetting.NewVideoFromSubscription;
            //}

            //async Task<UserNotificationModel> NotificationCreator(UserNotification user)
            //{
            //    var res = await this.userNotificationService.Create(UserNotificationType.NEW_VIDEO_FROM_SUBSCRIPTION, user.User.Id, notification.Post.Id);
            //    res.Post = notification.Post;

            //    var userNotificationModel = await this.userNotificationModelFactory.PrepareUserNotificationModelAsync(res);

            //    return userNotificationModel;
            //}

            //// email here


            //// Abstract it!! Aka make a "Notifier" class and call .Notify(...);


            //foreach (var user in users)
            //{
            //    var notificationCurrent = await NotificationCreator(user);

            //    await this.Clients.Caller.SendAsync("newNotification", notificationCurrent);
            //}



            //var connectedUserInfo = _notificationConnections.Where(p => p.UserId != userId).ToList();
            //foreach (var connectedUser in connectedUserInfo)
            //{
            //    await Clients.Client(connectedUser.ConnectionId).SendAsync("newNotification", userId);
            //}
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
