using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Services.Data;
using Chessbook.Services.Data.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Models.Posts;
using Chessbook.Web.Api.Models.Relationships;
using Chessbook.Web.Api.Models.UserNotification;

namespace Chessbook.Web.Api.Factories
{
    public class UserNotificationModelFactory : IUserNotificationModelFactory
    {
        private readonly IPostsService postService;
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IRelationshipService relationshipService;

        public UserNotificationModelFactory(IPostsService postService, IUserService userService, IUserModelFactory userModelFactory,
            IRelationshipService relationshipService)
        {
            this.postService = postService;
            this.userService = userService;
            this.userModelFactory = userModelFactory;
            this.relationshipService = relationshipService;
        }

        public async Task<UserNotificationModel> PrepareUserNotificationModelAsync(UserNotification notification)
        {
            var userWhoReceiveTheNotification = await this.userService.GetCustomerByIdAsync(notification.UserId);
            var model = new UserNotificationModel
            {
                Type = (int)notification.Type,
                Read = notification.Read,
                CreatedAt = notification.CreatedAt,
                UpdatedAt = notification.UpdatedAt,
            };

            if (notification.PostId.HasValue)
            {
                var notificationPost = await this.postService.GetPostByIdAsync(notification.PostId.Value);
                var notificationSenderUser = await this.userService.GetCustomerByIdAsync(notificationPost.UserId);

                var avatarUrl = await this.userModelFactory.PrepareCustomerAvatarModelAsync(notificationSenderUser.Id);
                notificationPost.User = notificationSenderUser;

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

                model.Post = post;
            }
            else if (notification.RelationshipId.HasValue)
            {
                // relationship
                var relationship = await this.relationshipService.GetByIdAsync(notification.RelationshipId.Value);

                var follower = await this.userService.GetCustomerByIdAsync(relationship.SourceId);
                var avatarUrl = await this.userModelFactory.PrepareCustomerAvatarModelAsync(follower.Id);
                var follow = new FollowInfoModel
                {
                    Id = relationship.Id,
                    Follower = new Follower
                    {
                        Id = follower.Id,
                        DisplayName = follower.DisplayName,
                        ScreenName = follower.ScreenName,
                        AvatarUrl = avatarUrl,
                    }
                };

                model.ActorFollow = follow;
            }

            return model;
        }
    }
}
