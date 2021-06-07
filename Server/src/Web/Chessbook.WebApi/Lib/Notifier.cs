using Chessbook.Core.Domain.Notifications;
using Chessbook.Data.Models;
using Chessbook.Data.Models.Post;
using Chessbook.Services.Data;
using Chessbook.Services.Notifications;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.UserNotification;
using Chessbook.Web.Models.Inputs;
using Microsoft.AspNetCore.SignalR;
using Nop.Core.Infrastructure;
using Nop.Services.Logging;
using Ordering.SignalrHub;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Lib
{
    public class Notifier
    {
        private static Notifier instance;

        private INotificationsSettingsService userNotificationSettingsService = EngineContext.Current.Resolve<INotificationsSettingsService>();
        private IUserNotificationService userNotificationService = EngineContext.Current.Resolve<IUserNotificationService>();

        private Notifier()
        {

        }

        public void NotifyOnNewVideoIfNeeded(Post post)
        {
            // Only notify on public and published videos which are not blacklisted
            if (post == null)
            {
                return;
            }

            this.NotifySubscribersOfNewVideo(post);

        }

        public void NotifyOfNewUserFollow()
        {

        }

        private async Task NotifySubscribersOfNewVideo(Post post)
        {

            // List all followers that are users
            var users = await userNotificationSettingsService.ListUserSubscribersOf(post.User.Id);

            var logger = EngineContext.Current.Resolve<ILogger>();

            await logger.InformationAsync(string.Format($"Notifying {0} users of new video {1}.", users.Count, post.Urls));


            Func<UserNotificationSettingModel, UserNotificationSettingValue> SettingGetter = delegate (UserNotificationSettingModel user)
            {
                return user.NewVideoFromSubscription;
            };

            Func<UserNotificationSettingModel, Task<UserNotificationModel>> NotificationCreator = async delegate (UserNotificationSettingModel user)
            {
                var res = await this.userNotificationService.Create(UserNotificationType.NEW_VIDEO_FROM_SUBSCRIPTION, user.CustomerId, post.Id);
                res.Post = post;

                var userNotificationModelFactory = EngineContext.Current.Resolve<IUserNotificationModelFactory>();

                var userNotificationModel = await userNotificationModelFactory.PrepareUserNotificationModelAsync(res);

                return userNotificationModel;
            };

            // email here


            await this.Notify<UserNotificationSettingModel>(users, SettingGetter, NotificationCreator);
        }

        private async Task Notify<T>(List<T> users, Func<UserNotificationSettingModel, UserNotificationSettingValue> settingGetter, Func<UserNotificationSettingModel, Task<UserNotificationModel>> notificationCreator) where T : UserNotificationSettingModel
        {
            // const
            var emails = new List<string>();

            var notificationsHub = EngineContext.Current.Resolve<IHubContext<NotificationsHub>>();
            foreach (var user in users)
            {
                var notificationCurrent = await notificationCreator(user);

                await notificationsHub.Clients.All.SendAsync("newNotification", notificationCurrent);

                //if (this.isEmailEnabled(user, settingGetter(user)))
                //{
                //    emails.Add(user.User.Email);
                //}
            }
        }

        //private bool isEmailEnabled(UserNotificationSettingModel user, UserNotificationSettingValue value)
        //{
        //    // if (CONFIG.SIGNUP.REQUIRES_EMAIL_VERIFICATION === true && user.emailVerified === false) return false;

        //    // return value & UserNotificationSettingValue.EMAIL;
        //}

        public static Notifier Instance
        {
            get
            {
                if (instance != null)
                {
                    return instance;
                }

                return instance = new Notifier();
            }
        }
    }
}
