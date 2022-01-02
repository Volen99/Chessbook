using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

using Ordering.SignalrHub;
using Chessbook.Core.Domain.Notifications;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using Chessbook.Services;
using Chessbook.Services.Notifications;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.UserNotification;
using Chessbook.Web.Api.Lib.Shared.Comment;
using Chessbook.Web.Api.Lib.Shared.Common;
using Chessbook.Core.Infrastructure;
using Chessbook.Services.Logging;
using Chessbook.Web.Api.Lib.Shared.Follow;
using Chessbook.Core.Domain.Relationships;
using Chessbook.Web.Api.Lib.Shared.Like;

using static Chessbook.Web.Api.Controllers.RelationshipsController;

namespace Chessbook.Web.Api.Lib
{
    public class Notifier
    {
        private static Notifier instance;

        private readonly dynamic notificationModels = new
        {
            newComment = new List<Type>() { typeof(CommentMention), typeof(NewCommentForPostOwner) },
            userFollow = new List<Type>() { typeof(FollowForUser) },
            newPostLike = new List<Type>() { typeof(UserLike) },
        };


        private INotificationsSettingsService userNotificationSettingsService = EngineContext.Current.Resolve<INotificationsSettingsService>();
        private IUserNotificationService userNotificationService = EngineContext.Current.Resolve<IUserNotificationService>();
        private IUserService userService = EngineContext.Current.Resolve<IUserService>();

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

        public void NotifyOfNewUserFollow(UserFollowFull userFollow)
        {
            var models = this.notificationModels.userFollow;

            this.SendNotifications(models, userFollow);
        }

        public void NotifyOfNewPostLike(PostVote postVote)
        {
            var models = this.notificationModels.newPostLike;

            this.SendNotifications(models, postVote);
        }

        public void NotifyOnNewComment(PostComment comment)
        {
            var models = this.notificationModels.newComment;

            this.SendNotifications(models, comment);
        }

        private async Task SendNotifications<T>(List<Type> models, T payload)
        {
            foreach (var model in models)
            {
                try
                {
                    var instance = (AbstractNotification<T, Customer>)Activator.CreateInstance(model, payload);         // Hello darkness, my old friend...
                    await this.Notify(instance);
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

        private async Task NotifySubscribersOfNewVideo(Post post)
        {

            // List all followers that are users
            var users = await userNotificationSettingsService.ListUserSubscribersOf(post.User.Id);

            var logger = EngineContext.Current.Resolve<ILogger>();

            await logger.InformationAsync(string.Format($"Notifying {0} users of new video {1}.", users.Count, post.Id));


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

        private async Task NotifyUserOfNewActorFollow(Relationship relationship)
        {
            var theFollowedUser = await this.userNotificationSettingsService.GetByUserId(relationship.TargetId);
            var followerAccount = await this.userNotificationSettingsService.GetByUserId(relationship.SourceId);

            if (theFollowedUser == null)
            {
                return;
            }

            // check if blocked


            var logger = EngineContext.Current.Resolve<ILogger>();

            await logger.InformationAsync(string.Format($"Notifying {0} users of new follower {1}.", theFollowedUser.Customer.ScreenName, followerAccount.Customer.ScreenName));

            Func<UserNotificationSettingModel, UserNotificationSettingValue> SettingGetter = delegate (UserNotificationSettingModel user)
            {
                return user.NewFollow;
            };

            Func<UserNotificationSettingModel, Task<UserNotificationModel>> NotificationCreator = async delegate (UserNotificationSettingModel user)
            {
                var res = await this.userNotificationService.Create(UserNotificationType.NEW_FOLLOW, user.CustomerId, relationship.Id);
                res.Relationship = relationship;

                var userNotificationModelFactory = EngineContext.Current.Resolve<IUserNotificationModelFactory>();

                var userNotificationModel = await userNotificationModelFactory.PrepareUserNotificationModelAsync(res);

                return userNotificationModel;
            };

            // email

            await this.Notify<UserNotificationSettingModel>(new List<UserNotificationSettingModel>() { theFollowedUser }, SettingGetter, NotificationCreator);

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

        private async Task Notify<T>(AbstractNotification<T, Customer> @object)
        {
            await @object.Prepare();

            var users = @object.GetTargetUsers();

            if (users.Count == 0)
            {
                return;
            }

            if (await @object.IsDisabled())
            {
                return;
            }

            @object.Log();

            // var toEmails = new List<string>();

            foreach (var user in users)
            {
                var setting = await @object.GetSetting(user);

                var notification = await @object.CreateNotification(user);
                if (this.IsNotificationBoth(setting))
                {
                    await this.sendNotificationHub(user.Id, notification);
                    await @object.CreateEmail(notification);
                }
                else if (this.IsWebNotificationEnabled(setting))
                {
                    await this.sendNotificationHub(user.Id, notification);
                }
                else if (this.IsEmailEnabled(setting))
                {
                    await @object.CreateEmail(notification);
                }
            }
        }

        private bool IsWebNotificationEnabled(UserNotificationSettingValue value)
        {
            return value == UserNotificationSettingValue.WEB;
        }

        private bool IsEmailEnabled(UserNotificationSettingValue value)
        {
            // if (CONFIG.SIGNUP.REQUIRES_EMAIL_VERIFICATION === true && user.emailVerified === false) return false
            return value == UserNotificationSettingValue.EMAIL;
        }

        private bool IsNotificationBoth(UserNotificationSettingValue value)
        {
            return value == UserNotificationSettingValue.BOTH;
        }

        private async Task sendNotificationHub(int userId, UserNotification notification)
        {
            // log

            var userNotificationModelFactory = EngineContext.Current.Resolve<IUserNotificationModelFactory>();
            var notificationMessage = await userNotificationModelFactory.PrepareUserNotificationModelAsync(notification);

            var notificationsHub = EngineContext.Current.Resolve<IHubContext<NotificationsHub>>();

            await notificationsHub.Clients.All.SendAsync("newNotification", notificationMessage);
        }

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
