using System.Threading.Tasks;
using System.Collections.Generic;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Core.Domain.Relationships;
using Chessbook.Web.Api.Lib.Shared.Common;
using Chessbook.Data.Models;
using Chessbook.Services.Data.Services;
using Nop.Core.Infrastructure;
using Chessbook.Services.Blocklist;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Services.Notifications;
using static Chessbook.Web.Api.Controllers.RelationshipsController;

namespace Chessbook.Web.Api.Lib.Shared.Follow
{
    public class FollowForUser : AbstractNotification<UserFollowFull, Customer>
    {
        private readonly IUserService userService = EngineContext.Current.Resolve<IUserService>();
        private readonly IBlocklistService blocklistService = EngineContext.Current.Resolve<IBlocklistService>();
        private readonly INotificationsSettingsService notificationsSettingsService = EngineContext.Current.Resolve<INotificationsSettingsService>();
        private readonly IUserNotificationService userNotificationService = EngineContext.Current.Resolve<IUserNotificationService>();


        private Customer user;

        public FollowForUser(UserFollowFull payload) : base(payload)
        {
        }

        public async override Task Prepare()
        {
            this.user = await this.userService.GetCustomerByIdAsync(this.ActorFollow().TargetUser.Id);
        }

        public async Task<bool> IsDisabled()
        {
            var followerAccount = this.ActorFollow().UserFollower;

            return await this.blocklistService.IsBlockedByServerOrAccount(followerAccount, this.user);
        }

        public override void Log()
        {
            // logger.info('Notifying user %s of new follower: %s.', this.user.username, this.actorFollow.ActorFollower.Account.getDisplayName())
        }

        public override async Task<UserNotificationSettingValue> GetSetting(Customer user)
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
            var notification = await this.userNotificationService.Create(UserNotificationType.NEW_FOLLOW, user.Id, this.ActorFollow().UserFollow.Id);
            notification.UserFollow = new UserFollow { UserFollower = this.ActorFollow().UserFollower, UserFollowing = this.ActorFollow().TargetUser };           //  this.ActorFollow();

            return notification;
        }

        public override void CreateEmail(string to)
        {
            throw new System.NotImplementedException();
        }

        private UserFollowFull ActorFollow()
        {
            return this.payload;
        }
    }
}
