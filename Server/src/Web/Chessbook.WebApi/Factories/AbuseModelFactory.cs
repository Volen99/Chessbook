using System;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Abuse;
using Chessbook.Services.Abuses;
using Chessbook.Services;
using Chessbook.Web.Api.Models.Abuses;
using Chessbook.Services.Helpers;
using Chessbook.Web.Areas.Admin.Models.Customers;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Entities;

namespace Chessbook.Web.Api.Factories
{
    public class AbuseModelFactory : IAbuseModelFactory
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IAbuseService abuseService;
        private readonly IDateTimeHelper dateTimeHelper;
        private readonly IPostsService postService;
        private readonly IPostCommentService postCommentService;

        public AbuseModelFactory(IUserService userService, IUserModelFactory userModelFactory, IAbuseService abuseService,
            IDateTimeHelper dateTimeHelper, IPostsService postService, IPostCommentService postCommentService)
        {
            this.userService = userService;
            this.userModelFactory = userModelFactory;
            this.abuseService = abuseService;
            this.dateTimeHelper = dateTimeHelper;
            this.postService = postService;
            this.postCommentService = postCommentService;
        }

        public async Task<AbuseModel> PrepareAbuseModel(Abuse abuse)
        {
            if (abuse == null)
            {
                throw new ArgumentNullException(nameof(abuse));
            }

            var model = new AbuseModel
            {
                Id = abuse.Id,
                Reason = abuse.Reason,
                PredefinedReasons = this.abuseService.ParsePredefinedReasonsIds(abuse).Select(id => (AbusePredefinedReasons)id).Select(x => x.ToString()).ToList(),
                State = new StateModel
                {
                    Id = (int)abuse.State,
                    Label = "string",
                },
                ModerationComment = abuse.ModerationComment,
                CreatedAt = await this.dateTimeHelper.ConvertToUserTimeAsync(abuse.CreatedAt, DateTimeKind.Utc),
            };

            if (abuse.ReporterAccountId.HasValue)
            {
                var reporterAccount = await this.userService.GetCustomerByIdAsync(abuse.ReporterAccountId.Value);

                if (reporterAccount != null)
                {
                    var reporterAccountModel = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), reporterAccount);
                    model.ReporterAccount = reporterAccountModel;
                } 
                else
                {
                    model.ReporterAccount = null;
                }
                
                if (abuse.PostAbuseId.HasValue)
                {
                    model.Post = await this.PrepareAdminPostAbuse(abuse, model);
                } 
                else if (abuse.PostCommentAbuseId.HasValue)
                {
                    model.Comment = await this.PrepareAdminPostCommentAbuse(abuse, model);
                }
                else if (abuse.FlaggedAccountId.HasValue)
                {
                    var flaggedAccount = await this.userService.GetCustomerByIdAsync(abuse.FlaggedAccountId.Value);
                    var flaggedAccountModel = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), flaggedAccount);

                    model.FlaggedAccount = flaggedAccountModel;
                }
            }

            return model;
        }

        public async Task<AdminPostAbuse> PrepareAdminPostAbuse(Abuse abuse, AbuseModel model)
        {
            var post = await this.postService.GetPostByIdAsync(abuse.PostAbuseId.Value);
            if (post != null)
            {
                var postCreator = await this.userService.GetCustomerByIdAsync(post.UserId);

                var abusePostModel = new AdminPostAbuse
                {
                    Id = post.Id,
                    Name = post.Status,
                    Channel = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), postCreator),
                    Deleted = post.Deleted,
                    CountReports = this.abuseService.CountReportsForPost(post.Id),
                };

                return abusePostModel;

            }

            return new AdminPostAbuse
            {
                Deleted = true,
            };

        }

        public async Task<AdminPostCommentAbuse> PrepareAdminPostCommentAbuse(Abuse abuse, AbuseModel model)
        {
            var comment = await this.postCommentService.GetById(abuse.PostCommentAbuseId.Value, true);
            var post = await this.postService.GetPostByIdAsync(comment.PostId, true);
            var postCreator = await this.userService.GetCustomerByIdAsync(post.UserId);

            var abusePostCommentAbuse = new AdminPostCommentAbuse
            {
                Id = comment.Id,
                Text = comment.Text,
                ThreadId = comment.OriginCommentId != null ? comment.OriginCommentId.Value : comment.Id,
                Video = new CommentVideo { Id = post.Id, Name = post.Status, ScreenName = postCreator.ScreenName },
                Deleted = comment.Deleted,
            };

            return abusePostCommentAbuse;
        }
    }
}
