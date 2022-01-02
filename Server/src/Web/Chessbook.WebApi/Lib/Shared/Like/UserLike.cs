using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using Chessbook.Services.Blocklist;
using Chessbook.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Notifications;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Web.Api.Lib.Shared.Common;
using Chessbook.Core.Infrastructure;

namespace Chessbook.Web.Api.Lib.Shared.Like
{
    public class UserLike : AbstractNotification<PostVote, Customer>
    {
        private readonly IUserService userService = EngineContext.Current.Resolve<IUserService>();
        private readonly IPostsService postService = EngineContext.Current.Resolve<IPostsService>();
        private readonly IBlocklistService blocklistService = EngineContext.Current.Resolve<IBlocklistService>();
        private readonly INotificationsSettingsService notificationsSettingsService = EngineContext.Current.Resolve<INotificationsSettingsService>();
        private readonly IUserNotificationService userNotificationService = EngineContext.Current.Resolve<IUserNotificationService>();

        private Customer user;

        public UserLike(PostVote payload) : base(payload)
        {
        }

        public async override Task Prepare()
        {
            var post = await this.postService.GetPostByIdAsync(this.payload.PostId);
            this.user = await this.userService.GetCustomerByIdAsync(post.UserId);

            // Don't notify if I liked my own post
            if (this.user.Id == this.payload.UserId)
            {
                this.user = null;
                return;
            }
        }

        public async Task<bool> IsDisabled()
        {
            var likerAccount = await this.userService.GetCustomerByIdAsync(this.payload.Id);

            return await this.blocklistService.IsBlockedByServerOrAccount(likerAccount, this.user);
        }

        public override void Log()
        {
            // logger.info('Notifying user %s of new follower: %s.', this.user.username, this.actorFollow.ActorFollower.Account.getDisplayName();
        }

        public async override Task<UserNotificationSettingValue> GetSetting(Customer user)
        {
            var userNotificationSettings = await this.notificationsSettingsService.GetByUserId(user.Id);
            return userNotificationSettings.NewFollow;
        }

        public override List<Customer> GetTargetUsers()
        {
            if (this.user == null)
            {
                return new List<Customer>();
            }

            return new List<Customer>() { this.user };
        }

        public async override Task<UserNotification> CreateNotification(Customer user)
        {
            var notification = await this.userNotificationService.Create(UserNotificationType.NEW_LIKE_ON_MY_POST, user.Id, this.payload.Id);
            notification.PostVote = this.payload;       

            return notification;
        }

        public async override Task CreateEmail(UserNotification to)
        {
            throw new System.NotImplementedException();
        }
    }
}
