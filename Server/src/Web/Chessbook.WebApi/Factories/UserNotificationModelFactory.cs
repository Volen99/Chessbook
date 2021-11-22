using System;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Notifications;
using Chessbook.Services.Data;
using Chessbook.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Entities;
using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Models.Posts;
using Chessbook.Web.Api.Models.Relationships;
using Chessbook.Web.Api.Models.UserNotification;
using Chessbook.Services.Helpers;
using Chessbook.Services.Relationships;

namespace Chessbook.Web.Api.Factories
{
    public class UserNotificationModelFactory : IUserNotificationModelFactory
    {
        private readonly IPostsService postService;
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IRelationshipService relationshipService;
        private readonly IPostCommentService postCommentService;
        private readonly IDateTimeHelper dateTimeHelper;
        private readonly IFollowService followService;

        public UserNotificationModelFactory(IPostsService postService, IUserService userService, IUserModelFactory userModelFactory,
            IRelationshipService relationshipService, IPostCommentService postCommentService, IDateTimeHelper dateTimeHelper,
            IFollowService followService)
        {
            this.postService = postService;
            this.userService = userService;
            this.userModelFactory = userModelFactory;
            this.relationshipService = relationshipService;
            this.postCommentService = postCommentService;
            this.dateTimeHelper = dateTimeHelper;
            this.followService = followService;
        }

        public async Task<UserNotificationModel> PrepareUserNotificationModelAsync(UserNotification notification)
        {
            var userWhoReceiveTheNotification = await this.userService.GetCustomerByIdAsync(notification.UserId);
            var model = new UserNotificationModel
            {
                Id = notification.Id,
                Type = (int)notification.Type,
                Read = notification.Read,
                CreatedAt = await this.dateTimeHelper.ConvertToUserTimeAsync(notification.CreatedAt, DateTimeKind.Utc),
                UpdatedAt = await this.dateTimeHelper.ConvertToUserTimeAsync(notification.UpdatedAt, DateTimeKind.Utc),
            };

            if (notification.PostId.HasValue)
            {
                var notificationPost = await this.postService.GetPostByIdAsync(notification.PostId.Value);

                if (notificationPost == null)
                {
                    model.Type = 99;
                    return model;
                }

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
            else if (notification.CommentId.HasValue)
            {
                var notificationComment = await this.postCommentService.GetById(notification.CommentId.Value);

                if (notificationComment == null)
                {
                    model.Type = 99;
                    return model;
                }

                var notificationSenderUser = await this.userService.GetCustomerByIdAsync(notificationComment.UserId);

                if (notificationSenderUser == null)
                {
                    model.Type = 99;
                    return model;
                }

                var avatarUrl = await this.userModelFactory.PrepareCustomerAvatarModelAsync(notificationSenderUser.Id);

                var userInfo = new UserInfoModel
                {
                    Id = notificationSenderUser.Id,
                    DisplayName = notificationSenderUser.DisplayName,
                    ScreenName = notificationSenderUser.ScreenName,
                    AvatarUrl = avatarUrl,
                };

                var post = await this.postService.GetPostByIdAsync(notificationComment.PostId);
                if (post == null)
                {
                    model.Type = 99;
                    return model;
                }

                var postInfo = new PostInfoModel
                {
                    Id = notificationComment.PostId,
                    Name = post.Status,
                };

                var commentId = notificationComment.OriginCommentId != null ? notificationComment.OriginCommentId.Value : notificationComment.Id;
                var comment = new PostCommentNotificationModel
                {
                    Id = notificationComment.Id,
                    ThreadId = commentId,
                    Account = userInfo,
                    Post = postInfo,
                };

                model.Comment = comment;

            }
            else if (notification.UserFollowId.HasValue)
            {
                // relationship
                var userFollow = await this.followService.GetByIdAsync(notification.UserFollowId.Value);
                if (userFollow == null)
                {
                    model.Type = 99; // so that the client shows Blunder!
                    return model;
                } 
                else
                {
                    var follower = await this.userService.GetCustomerByIdAsync(userFollow.UserId);

                    if (follower == null)
                    {
                        model.Type = 99;
                        return model;
                    }

                    var avatarUrl = await this.userModelFactory.PrepareCustomerAvatarModelAsync(follower.Id);
                    var follow = new FollowInfoModel
                    {
                        Id = userFollow.Id,
                        Follower = new UserInfoModel
                        {
                            Id = follower.Id,
                            DisplayName = follower.DisplayName,
                            ScreenName = follower.ScreenName,
                            AvatarUrl = avatarUrl,
                        }
                    };

                    model.ActorFollow = follow;
                }
            }
            else if (notification.PostVoteId.HasValue) // notification.UserId userId is the user who is receiving the notification
            {
                var notificationPostLike = await this.postService.GetPostVoteByIdAsync(notification.PostVoteId.Value);

                if (notificationPostLike == null)
                {
                    model.Type = 99;
                    return model;
                }

                var liker = await this.userService.GetCustomerByIdAsync(notificationPostLike.UserId);
                if (liker == null)
                {
                    model.Type = 99;
                    return model;
                }

                var avatarUrl = await this.userModelFactory.PrepareCustomerAvatarModelAsync(liker.Id);

                var post = await this.postService.GetPostByIdAsync(notificationPostLike.PostId);
                if (post == null)
                {
                    model.Type = 99;
                    return model;
                }

                var postInfo = new PostInfoModel
                {
                    Id = notificationPostLike.PostId,
                    Name = post?.Status,
                };

                var like = new PostLikeNotificationModel
                {
                    Account = new UserInfoModel
                    {
                        Id = liker.Id,
                        DisplayName = liker.DisplayName,
                        ScreenName = liker.ScreenName,
                        AvatarUrl = avatarUrl,
                    },
                    Post = postInfo,
                };

                model.PostLike = like;
            }

            return model;
        }
    }
}
