using System.Collections.Generic;
using System.Linq;
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

namespace Chessbook.Web.Api.Lib.Shared.Comment
{
    public class CommentMention : AbstractNotification<PostComment, Customer>
    {
        private readonly IPostCommentService postCommentService = EngineContext.Current.Resolve<IPostCommentService>();
        private readonly ILogger logger = EngineContext.Current.Resolve<ILogger>();
        private readonly IUserService userService = EngineContext.Current.Resolve<IUserService>();
        private readonly IWorkContext workContext = EngineContext.Current.Resolve<IWorkContext>();
        private readonly IBlocklistService blocklistService = EngineContext.Current.Resolve<IBlocklistService>();
        private readonly INotificationsSettingsService notificationsSettingsService = EngineContext.Current.Resolve<INotificationsSettingsService>();
        private readonly IUserNotificationService userNotificationService = EngineContext.Current.Resolve<IUserNotificationService>();

        private List<Customer> users;
        private int serverAccountId;
        private Dictionary<int, bool> accountMutedHash;

        public CommentMention(PostComment payload) : base(payload)
        {
            this.users = new List<Customer>();
            this.accountMutedHash = new Dictionary<int, bool>();
        }

        public async override Task Prepare()
        {
            // screenNames are returned without '@'
            var extractedUsernames = this.postCommentService.ExtractMentions(this.payload.Text);

            for (int i = 0; i < extractedUsernames.Length; i++)
            {
                var screenName = extractedUsernames[i];
                if (!screenName.StartsWith('@'))
                {
                    extractedUsernames[i] = "@" + screenName;
                }
            }

            // this.logger.LogDebug($"Extracted {extractedUsernames.Length} username from comment {this.payload.Url}.",
            //    new { usernames = extractedUsernames, text = this.payload.Text });

            this.users = await this.userService.ListByUsernames(extractedUsernames);

            // if (this.payload.Video.isOwned())
            var userException = await this.userService.GetCustomerByIdAsync(this.payload.UserId);
            this.users = this.users.Where(u => u.Id != userException.Id).ToList();

            // Don't notify if I mentioned myself
            this.users = this.users.Where(u => u.Id != this.payload.UserId).ToList();

            if (this.users.Count == 0)
            {
                return;
            }

            this.serverAccountId = (await this.workContext.GetCurrentCustomerAsync()).Id;

            var sourceAccounts = this.users.Select(u => u.Id).Concat(new List<int> { this.serverAccountId }).ToList();

            this.accountMutedHash = await this.blocklistService.IsAccountMutedByMulti(sourceAccounts, this.payload.UserId);
        }

        public override void Log()
        {
            // this.logger.LogInformation($"Notifying {this.users.Count} users of new comment {this.payload.Url}.");
        }

        public async override Task<UserNotificationSettingValue> GetSetting(Customer user)
        {
            var accountId = user.Id;
            if (this.accountMutedHash[accountId] == true || this.accountMutedHash[this.serverAccountId] == true)
            {
                return UserNotificationSettingValue.NONE;
            }

            var userNotificationSettings = await this.notificationsSettingsService.GetByUserId(user.Id);
            return userNotificationSettings.CommentMention;
        }

        public override List<Customer> GetTargetUsers()
        {
            return this.users;
        }

        public async override Task<UserNotification> CreateNotification(Customer user)
        {
            var notification = await this.userNotificationService.Create(UserNotificationType.COMMENT_MENTION, user.Id, this.payload.Id); //
            notification.Comment = payload;

            return notification;
        }

        public override void CreateEmail(string to)
        {
            throw new System.NotImplementedException();
        }

    }
}
