using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using Chessbook.Services.Blocklist;
using Chessbook.Services;
using Chessbook.Services.Entities;
using Chessbook.Services.Notifications;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Web.Api.Lib.Shared.Common;
using Chessbook.Core;
using Chessbook.Core.Infrastructure;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Messages;

namespace Chessbook.Web.Api.Lib.Shared.Comment
{
    public class NewCommentForPostOwner : AbstractNotification<PostComment, Customer>
    {
        private readonly IPostCommentService postCommentService = EngineContext.Current.Resolve<IPostCommentService>();
        private readonly IPostsService postService = EngineContext.Current.Resolve<IPostsService>();
        private readonly ILogger logger = EngineContext.Current.Resolve<ILogger>();
        private readonly IUserService userService = EngineContext.Current.Resolve<IUserService>();
        private readonly IWorkContext workContext = EngineContext.Current.Resolve<IWorkContext>();
        private readonly IBlocklistService blocklistService = EngineContext.Current.Resolve<IBlocklistService>();
        private readonly INotificationsSettingsService notificationsSettingsService = EngineContext.Current.Resolve<INotificationsSettingsService>();
        private readonly IUserNotificationService userNotificationService = EngineContext.Current.Resolve<IUserNotificationService>();
        private readonly IWorkflowMessageService workflowMessageService = EngineContext.Current.Resolve<IWorkflowMessageService>();

        private Customer user;
        private int serverAccountId;
        private Dictionary<int, bool> accountMutedHash;

        public NewCommentForPostOwner(PostComment payload) : base(payload)
        {
            this.accountMutedHash = new Dictionary<int, bool>();
        }

        public async override Task Prepare()
        {
            var post = await this.postService.GetPostByIdAsync(this.payload.PostId);
            this.user = await this.userService.GetCustomerByIdAsync(post.UserId);

            // Don't notify if I commented on my own post
            if (this.user.Id == this.payload.UserId)
            {
                this.user = null;
                return;
            }
        }

        public override void Log()
        {
            // this.logger.LogInformation($"Notifying {this.users.Count} users of new comment {this.payload.Url}.");
        }

        public async Task<bool> IsDisabled()
        {
            // Not our user or user comments its own video
            if (this.user == null || this.payload.UserId == this.user.Id)
            {
                return true;
            }

            var theUserWhoMadeTheComment = await this.userService.GetCustomerByIdAsync(this.payload.UserId);
            return await this.blocklistService.IsBlockedByServerOrAccount(theUserWhoMadeTheComment, this.user);
        }

        public async override Task<UserNotificationSettingValue> GetSetting(Customer user)
        {
            //var accountId = user.Id;
            //if (this.accountMutedHash[accountId] == true || this.accountMutedHash[this.serverAccountId] == true)
            //{
            //    return UserNotificationSettingValue.NONE;
            //}

            var userNotificationSettings = await this.notificationsSettingsService.GetByUserId(user.Id);
            return userNotificationSettings.NewCommentOnMyVideo;
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
            var notification = await this.userNotificationService.Create(UserNotificationType.NEW_COMMENT_ON_MY_VIDEO, user.Id, this.payload.Id); //
            notification.Comment = payload;

            return notification;
        }

        public async override Task CreateEmail(UserNotification userNotification)
        {
            await this.workflowMessageService.SendBlogCommentNotificationMessageAsync(userNotification.Comment);
        }
    }
}
