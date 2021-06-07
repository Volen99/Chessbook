using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Services.Data.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Models.Posts;
using Chessbook.Web.Api.Models.UserNotification;

namespace Chessbook.Web.Api.Factories
{
    public class UserNotificationModelFactory : IUserNotificationModelFactory
    {
        private readonly IPostsService postService;
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;

        public UserNotificationModelFactory(IPostsService postService, IUserService userService, IUserModelFactory userModelFactory)
        {
            this.postService = postService;
            this.userService = userService;
            this.userModelFactory = userModelFactory;
        }

        public async Task<UserNotificationModel> PrepareUserNotificationModelAsync(UserNotification notification)
        {
            var notificationPost = await this.postService.GetPostByIdAsync(notification.PostId);
            notificationPost.User = await this.userService.GetCustomerByIdAsync(notification.UserId);

            var avatarUrl = await this.userModelFactory.PrepareCustomerAvatarModelAsync(notificationPost.User.Id);
            var user = new UserInfoModel
            {
                Id = notificationPost.User.Id,
                DisplayName = notificationPost.User.DisplayName,
                ScreenName = notificationPost.User.ScreenName,
                AvatarUrl = avatarUrl,
            };


            var post = new PostInfoModel
            {
                Id = notificationPost.Id,
                Name = notificationPost.Status,
                User = user,
            };


            var model = new UserNotificationModel
            {
                Type = (int)notification.Type,
                Read = notification.Read,
                Post = post,
                CreatedAt = notification.CreatedAt,
                UpdatedAt = notification.UpdatedAt,
            };


            return model;
        }
    }
}
