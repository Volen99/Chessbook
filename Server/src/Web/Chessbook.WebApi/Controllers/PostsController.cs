namespace Chessbook.Web.Api.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Services.Data.Services;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Web.Models.Inputs.Posts;
    using Chessbook.Data.Models.Polls;
    using Chessbook.Web.Models.Polls;
    using Chessbook.Web.Models.Outputs.Polls;
    using Chessbook.Web.Models;
    using Chessbook.Services.Data.Services.Media;
    using Chessbook.Common;
    using Chessbook.Web.Api.Factories;
    using Chessbook.Data.Models.Media;
    using Chessbook.Web.Api.Areas.Admin.Models.Post;
    using Nop.Services.Logging;
    using Chessbook.Services.Localization;
    using Nop.Web.Areas.Admin.Models.Customers;
    using Chessbook.Data.Models.Post;
    using Chessbook.Web.Api.Lib;
    using Chessbook.Services.Entities;
    using Chessbook.Web.Api.Models.Posts;
    using Chessbook.Core.Domain.Post;

    [Route("posts")]
    public class PostsController : BaseApiController
    {
        private const int ITEM_PER_PAGE = 3;

        private IPostsService postService;
        private IPollService pollService;
        private IUserService userService;


        private readonly IMediaService mediaService;
        private readonly IPictureService pictureService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IPostModelFactory postModelFactory;
        private readonly ICustomerActivityService customerActivityService;
        private readonly ILocaleStringResourceService localeStringResourceService;
        private readonly IPostCommentService postCommentService;

        public PostsController(IPostsService postService, IPollService pollService, IUserService userService, IMediaService mediaService,
            IPictureService pictureService, IUserModelFactory userModelFactory, IPostModelFactory productModelFactory,
            ICustomerActivityService customerActivityService, ILocaleStringResourceService localeStringResourceService,
            IPostCommentService postCommentService)
        {
            this.postService = postService;
            this.userService = userService;
            this.mediaService = mediaService;
            this.pollService = pollService;
            this.pictureService = pictureService;
            this.userModelFactory = userModelFactory;
            this.postModelFactory = productModelFactory;
            this.customerActivityService = customerActivityService;
            this.localeStringResourceService = localeStringResourceService;
            this.postCommentService = postCommentService;
        }

        [HttpGet]
        [Route("home_timeline")]
        public async Task<IActionResult> GetHomeTimeline([FromQuery] QueryPostsTimeline query)
        {
            var skip = 0;
            if (query.SkipCount)
            {
                skip = query.Start;
            }

            var posts = await this.postService.GetHomeTimeline(true, query.Start, query.Count);
            var models = new List<PostModel>();
            for (int i = 0; i < posts.Count; i++)
            {
                var postCurrent = posts[i];

                var model = (await postModelFactory.PreparePostModelAsync(postCurrent));

                models.Add(model);

                //if (postDTO.Reshared)
                //{
                //    postDTO = postDTO.ResharedStatus = await this.postService.GetResharedOriginal<PostModel>(postDTO.Id);
                //}

                if (postCurrent.HasMedia)
                {
                    //var picture = (await this.pictureService.GetPicturesByProductIdAsync(postDTO.Id)).FirstOrDefault();

                    //var pictureSize = 480;

                    //string displayUrl;
                    //string expandUrl;

                    //(expandUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture);
                    //(displayUrl, _) = await this.pictureService.GetPictureUrlAsync(picture, pictureSize);

                    //var pictureModel = new MediaEntityDTO
                    //{
                    //    Id = picture.Id,
                    //    IdStr = picture.Id.ToString(),
                    //    DisplayURL = ChessbookConstants.SiteHttps + displayUrl,
                    //    ExpandedURL = ChessbookConstants.SiteHttps + expandUrl,
                    //    MediaURL = picture.VirtualPath,
                    //};

                    //if (picture != null)
                    //{
                    //    postDTO.Entities.Medias.Add(pictureModel);
                    //}
                }

                //postDTO.Reshared = await this.postService.GetReshareStatus(postDTO.Id, User.GetUserId());
                //postDTO.ReshareCount = await this.postService.GetReshareCount(postDTO.Id);
            }

            return this.Ok(new
            {
                data = models,
                total = models.Count,
            });
        }

        [HttpGet]
        [Route("timeline/profile")]
        public async Task<IActionResult> GetProfilePosts([FromQuery] QueryPostsProfileTimeline query)
        {
            var skip = 0;
            if (query.SkipCount)
            {
                skip = query.Start;
            }


            var posts = await this.postService.GetUserProfileTimeline(query.UserId, true, query.Start, query.Count);
            var models = new List<PostModel>();
            for (int i = 0; i < posts.Count; i++)
            {
                var postCurrent = posts[i];

                var model = (await postModelFactory.PreparePostModelAsync(postCurrent));
                models.Add(model);

                //if (postDTO.Reshared)
                //{
                //    postDTO = postDTO.ResharedStatus = await this.postService.GetResharedOriginal<PostModel>(postDTO.Id);
                //}

                if (postCurrent.HasMedia)
                {
                    //var picture = (await this.pictureService.GetPicturesByProductIdAsync(postDTO.Id)).FirstOrDefault();

                    //var pictureSize = 480;

                    //string displayUrl;
                    //string expandUrl;

                    //(expandUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture);
                    //(displayUrl, _) = await this.pictureService.GetPictureUrlAsync(picture, pictureSize);

                    //var pictureModel = new MediaEntityDTO
                    //{
                    //    Id = picture.Id,
                    //    IdStr = picture.Id.ToString(),
                    //    DisplayURL = ChessbookConstants.SiteHttps + displayUrl,
                    //    ExpandedURL = ChessbookConstants.SiteHttps + expandUrl,
                    //    MediaURL = picture.VirtualPath,
                    //};

                    //if (picture != null)
                    //{
                    //    postDTO.Entities.Medias.Add(pictureModel);
                    //}
                }

                //postDTO.Reshared = await this.postService.GetReshareStatus(postDTO.Id, User.GetUserId());
                //postDTO.ReshareCount = await this.postService.GetReshareCount(postDTO.Id);
            }

            return this.Ok(new
            {
                data = models,
                total = models.Count(),
            });
        }

        [HttpPost]
        public async Task<IActionResult> PostPublish([FromQuery] QueryPostParams query, [FromBody] PollCreateBody pollBody)
        {
            Post post = null;
            if (!query.HasPoll)
            {
                post = await this.postService.CreateAsync(query, User.GetUserId(), query.MediaIds);
            }
            else
            {
                var pollId = await this.pollService.InsertPollAsync(pollBody, query.Status, false);

                var options = await this.pollService.InsertPollAnswerAsync(pollId, pollBody.Options);

                post = await this.postService.CreateAsync(query, User.GetUserId(), null, pollId);
            }

            var postUser = await this.userService.GetCustomerByIdAsync(post.UserId);
            post.User = postUser;

            Notifier.Instance.NotifyOnNewVideoIfNeeded(post);
            return this.Ok(post);
        }


        [HttpPost]
        [Route("reshare")]
        public async Task<IActionResult> PostReshare([FromQuery] QueryRetweetParams query)
        {
            var post = await this.postService.CreateRetweet(query.Id, User.GetUserId(), query.TrimUser);

            return this.Ok(post);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await this.postService.GetPostByIdAsync(id);

            var model = await this.postModelFactory.PreparePostModelAsync(post);

            return this.Ok(model);
        }



        [HttpGet]
        [Route("likers/{id}")]
        public async Task<IActionResult> Likers(int id)
        {
            var users = await this.postService.GetLikers(id);

            var models = new List<CustomerModel>();
            foreach (var user in users)
            {
                models.Add(await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user));
            }

            return this.Ok(models);
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            // try to get a product with the specified id
            var product = await this.postService.GetPostByIdAsync(id);
            if (product == null)
            {
                return this.NotFound("List");
            }


            await this.postService.DeleteProductAsync(product);

            //activity log
            await this.customerActivityService.InsertActivityAsync("DeleteProduct", string.Format(await this.localeStringResourceService.GetResourceAsync("ActivityLog.DeleteProduct"), product.Id), product);

            // _notificationService.SuccessNotification(await this.localeStringResourceService.GetResourceAsync("Admin.Catalog.Products.Deleted"));

            return RedirectToAction("List");
        }

        [HttpPost]
        [Route("unshare")]
        public async Task<IActionResult> PostUnshare([FromQuery] int id)
        {
            //var product = await postService.GetByIdClean(id);
            //if (product == null)
            //{
            //    return this.BadRequest("List");
            //}

            //await this.postService.Unshare(product);

            return this.Ok();
        }

        [HttpPost]
        [Route("{postId:int}/comment-threads")]
        public async Task<IActionResult> CommentCreate(int postId, CreatePostCommentBody input)
        {
            var comment = await this.postCommentService.Create(User.GetUserId(), postId, input.Text);

            if (comment == null)
            {
                return this.BadRequest();
            }

            var model = await this.postModelFactory.PreparePostCommentModelAsync(comment);

            return this.Ok(model);
        }

        [HttpPost]
        [Route("{postId:int}/comments/{threadId:int}")]
        public async Task<IActionResult> CommentThreadCreate(int postId, int threadId, CreatePostCommentBody input)
        {
            var postComment = await this.postCommentService.GetById(threadId);

            if (postComment == null)
            {
                return this.NotFound("Post comment thread not found");
            }

            if (postComment.PostId != postId)
            {
                return this.BadRequest("Post comment is not associated to this video.");
            }

            if (postComment.InReplyToCommentId != null)
            {
                return this.BadRequest("Post comment is not a thread.");
            }

           var res = this.postCommentService.Create(User.GetUserId(), postId, input.Text, postComment);


            var comment = await this.postCommentService.Create(User.GetUserId(), postId, input.Text);

            if (comment == null)
            {
                return this.BadRequest();
            }

            var model = await this.postModelFactory.PreparePostCommentModelAsync(comment);

            return this.Ok(model);
        }

        [HttpGet]
        [Route("{postId:int}/comment-threads")]
        public async Task<IActionResult> GetPostCommentThreads(int postId, [FromQuery] QueryGetInputModel query)
        {
            var models = new List<PostCommentModel>();

            var comments = await this.postCommentService.GetPostCommentThreads(
                   postId: postId,
                   userId: User.GetUserId(),
                   pageIndex: query.Start,
                   pageSize: query.Count);

            foreach (var pc in comments)
            {
                var commentModel = await this.postModelFactory.PreparePostCommentModelAsync(pc);
                models.Add(commentModel);
            }


            return this.Ok(new
            {
                total = comments.TotalCount,
                data = models,
            });
        }

        [HttpGet]
        [Route("{postId:int}/comment-threads/{threadId:int}")]
        public async Task<IActionResult> GetPostThreadComments(int postId, int threadId)
        {
            var comments = await this.postCommentService.GetPostThreadComments(
                   postId: postId,
                   threadId: threadId,
                   userId: User.GetUserId());

            if (comments.Count == 0)
            {
                return this.NotFound("No comments were found");
            }

            var model = await this.postModelFactory.PreparePostCommentTree(comments);


            return this.Ok(model);
        }
    }
}
