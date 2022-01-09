namespace Chessbook.Web.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    using Chessbook.Services;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Web.Models.Inputs.Posts;
    using Chessbook.Web.Models.Polls;
    using Chessbook.Services.Data.Services.Media;
    using Chessbook.Web.Api.Factories;
    using Chessbook.Web.Api.Areas.Admin.Models.Post;
    using Chessbook.Services.Logging;
    using Chessbook.Web.Areas.Admin.Models.Customers;
    using Chessbook.Web.Api.Lib;
    using Chessbook.Services.Entities;
    using Chessbook.Web.Api.Models.Posts;
    using Chessbook.Core.Domain.Posts;
    using Chessbook.Data.Models;
    using Chessbook.Services.Security;
    using Chessbook.Core;

    [Route("posts")]
    public class PostsController : BaseApiController
    {
        private IPostsService postService;
        private IPollService pollService;
        private IUserService userService;


        private readonly IUserModelFactory userModelFactory;
        private readonly IPostModelFactory postModelFactory;
        private readonly ICustomerActivityService customerActivityService;
        private readonly IPostCommentService postCommentService;
        private readonly IPostTagService postTagService;
        private readonly IPermissionService permissionService;
        private readonly IWorkContext workContext;

        public PostsController(IPostsService postService, IPollService pollService, IUserService userService,
            IUserModelFactory userModelFactory, IPostModelFactory productModelFactory,
            ICustomerActivityService customerActivityService, IPostCommentService postCommentService,
            IPostTagService postTagService, IPermissionService permissionService, IWorkContext workContext)
        {
            this.postService = postService;
            this.userService = userService;
            this.pollService = pollService;
            this.userModelFactory = userModelFactory;
            this.postModelFactory = productModelFactory;
            this.customerActivityService = customerActivityService;
            this.postCommentService = postCommentService;
            this.postTagService = postTagService;
            this.permissionService = permissionService;
            this.workContext = workContext;
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

            var posts = await this.postService.GetUserProfileTimeline(query.UserId, true, query.OnlyMedia, query.Start, query.Count);
            var models = new List<PostModel>();
            for (int i = 0; i < posts.Count; i++)
            {
                var postCurrent = posts[i];

                var model = (await postModelFactory.PreparePostModelAsync(postCurrent));
                models.Add(model);
            }

            // I the worst programmer the world has ever seen. I am literally burn out right now... 11/22/2021, Monday, 20:22 | Дикий кайф, с кем же я летал
            if (query.Start == 0)
            {
                var pinnedPost = await this.postService.GetPinnedPost(query.UserId);

                if (pinnedPost != null)
                {
                    var model = await this.postModelFactory.PreparePostModelAsync(pinnedPost);
                    models.Insert(0, model);
                }
            }

            return this.Ok(new
            {
                data = models,
                total = models.Count(),
            });
        }

        [HttpPost]
        public async Task<IActionResult> PostPublish([FromQuery] QueryPostParams query, [FromForm] PostCreateBody body)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized("You have to be registered in order to post.");
            }

            if (query.Status == null && query.MediaIds?.Length == 0 && body.Poll == null && query.InReplyToStatusId.HasValue == false)
            {
                return this.BadRequest();
            }

            Post post = null;
            if (body.Poll == null)
            {
                post = await this.postService.CreateAsync(query, User.GetUserId(), query.MediaIds);
            }
            else if(body.Poll != null)
            {
                if (body.Poll.Options.Any(o => String.IsNullOrEmpty(o)))
                {
                    return this.UnprocessableEntity("Validation failed: Choices can't be blank, Choices must have more than one item");
                }

                var pollId = await this.pollService.InsertPollAsync(body.Poll.ExpiresIn, query.Status, false);

                var options = await this.pollService.InsertPollAnswerAsync(pollId, body.Poll.Options);

                post = await this.postService.CreateAsync(query, User.GetUserId(), null, pollId);
            }

            // tags
            if (body.Tags.Length > 0 && body.Tags[0] != "null")
            {
                await this.postTagService.UpdatePostTagsAsync(post, ParsePostTags(string.Join(",", body.Tags)));
            }

            var postUser = await this.userService.GetCustomerByIdAsync(post.UserId);
            post.User = postUser;

            Notifier.Instance.NotifyOnNewVideoIfNeeded(post);
            return this.Ok(post);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await this.postService.GetPostByIdAsync(id);

            if (post == null || post.Deleted)
            {
                return this.NotFound();
            }

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

        [HttpGet]
        [Route("reposters/{id:int}")]
        public async Task<IActionResult> Reposters(int id)
        {
            var users = await this.postService.GetReposters(id);

            var models = new List<CustomerModel>();
            foreach (var user in users)
            {
                models.Add(await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user));
            }

            return this.Ok(models);
        }

        [HttpPost]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            //if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageProducts))
            //{
            //    return this.Unauthorized();
            //}

            // try to get a product with the specified id
            var post = await this.postService.GetPostByIdAsync(id);
            if (post == null)
            {
                return this.NotFound("Post not found");
            }

            if (post.Pinned)
            {
                post.Pinned = false;
                await this.postService.UpdatePostAsync(post);
            }

            await this.postService.DeleteProductAsync(post);

            // activity log
            await this.customerActivityService.InsertActivityAsync("DeleteProduct", string.Format("Deleted a product ('{0}')", post.Id), post);

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

            if (comment.InReplyToCommentId != null)
            {
                return this.BadRequest("Post comment is not a thread.");
            }

           Notifier.Instance.NotifyOnNewComment(comment);

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


            var comment = await this.postCommentService.Create(User.GetUserId(), postId, input.Text, postComment);

            if (comment == null)
            {
                return this.BadRequest();
            }

            Notifier.Instance.NotifyOnNewComment(comment);

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
                   pageSize: query.Count,
                   sort: query.Sort);

            foreach (var pc in comments)
            {
                var commentModel = await this.postModelFactory.PreparePostCommentModelAsync(pc);
                models.Add(commentModel);
            }

            // should return all the post comments, not the pagintation ones only.
            var totalNotDeletedComments = await this.postCommentService.GetPostCommentsCount(postId);

            // we do the sorting here, coz it is easier :\
            if (query.Sort == "-totalReplies")
            {
                var currentUser = await this.workContext.GetCurrentCustomerAsync();
                models = models.OrderByDescending(c => c.TotalReplies).ToList();
            }
       
            return this.Ok(new
            {
                total = comments.TotalCount,
                data = models,
                totalNotDeletedComments = totalNotDeletedComments,
            });
        }

        [HttpGet]
        [Route("{postId:int}/comment-threads/{threadId:int}")]
        public async Task<IActionResult> GetPostThreadComments(int postId, int threadId)
        {
            var thread = await this.postCommentService.GetById(threadId);

            var threadRepliesThatMightHaveDeletedParentComment = await this.postCommentService.GetPostThreadComments(
                   postId: postId,
                   threadId: threadId,
                   userId: User.GetUserId());

            threadRepliesThatMightHaveDeletedParentComment.Insert(0, thread);

            var threadReplies = new List<PostComment>();
            threadReplies.Add(threadRepliesThatMightHaveDeletedParentComment.First());
            if (threadRepliesThatMightHaveDeletedParentComment.Count == 0)
            {
                return this.NotFound("No comments were found");
            }

            // TODO: can be much better written
            foreach (var threadReply in threadRepliesThatMightHaveDeletedParentComment)
            {
                if (!threadReply.OriginCommentId.HasValue)
                {
                    continue;
                }

                if (threadReply.InReplyToCommentId.HasValue)
                {
                    var parentComment = await this.postCommentService.GetById(threadReply.InReplyToCommentId.Value, true);
                    if (!parentComment.Deleted)
                    {
                        threadReplies.Add(threadReply);
                    }

                }
            }

            var model = await this.postModelFactory.PreparePostCommentTree(threadReplies);

            return this.Ok(model);
        }

        [HttpDelete]
        [Route("{postId:int}/comments/{commentId:int}")]
        [Authorize]
        public async Task<IActionResult> DeletePostComment(int commentId)
        {
            // try to get a comment with the specified id
            var comment = await this.postCommentService.GetById(commentId);
            if (comment == null)
            {
                return this.NotFound(nameof(comment));
            }

            await this.postCommentService.Delete(comment);

            return this.Ok();
        }

        [HttpGet]
        [Route("tags")]
        public async Task<IActionResult> GetPostTags([FromQuery] int count = 2)
        {
            var model = await this.postModelFactory.PreparePopularProductTagsModelAsync(count);

            return this.Ok(model);
        }

        [HttpPost]
        [Route("pin/{postId:int}")]
        public async Task<IActionResult> PostPin(int postId)
        {
            // get current pinned post if any
            var pinnedPost = await this.postService.GetPinnedPost(User.GetUserId());

            if (pinnedPost != null)
            {
                pinnedPost.Pinned = false;
                await this.postService.UpdatePostAsync(pinnedPost);
            }

            var post = await this.postService.GetPostByIdAsync(postId);

            if (post == null)
            {
                return this.NotFound();
            }

            post.Pinned = true;
            await this.postService.UpdatePostAsync(post);

            return this.Ok();
        }

        [HttpPost]
        [Route("unpin/{postId:int}")]
        public async Task<IActionResult> PostUnpin(int postId)
        {
            var post = await this.postService.GetPostByIdAsync(postId);

            if (post == null)
            {
                return this.NotFound();
            }

            post.Pinned = false;
            await this.postService.UpdatePostAsync(post);

            return this.Ok();
        }

        [HttpGet]
        [Route("pinned/{id:int}")]
        public async Task<IActionResult> GetPinnedPost(int id) // userId
        {
            var pinnedPost = await this.postService.GetPinnedPost(id);

            if (pinnedPost == null)
            {
                return this.Ok();
            }

            var model = await this.postModelFactory.PreparePostModelAsync(pinnedPost);

            return this.Ok(model);
        }

        protected virtual string[] ParsePostTags(string postTags)
        {
            var result = new List<string>();
            if (string.IsNullOrWhiteSpace(postTags))
            {
                return result.ToArray();
            }

            var values = postTags.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var val in values)
                if (!string.IsNullOrEmpty(val.Trim()))
                    result.Add(val.Trim());

            return result.ToArray();
        }

        private async Task<List<int>> BuildBlockerAccountIds(int postId, Customer currentLoggedUser)
        {
            var blockerAccountIds = new List<int>() { User.GetUserId() };

            if (currentLoggedUser != null)
            {
                blockerAccountIds.Add(currentLoggedUser.Id);
            }

            // if (isVideoOwned)

            var postOwnerAccount = await this.postService.LoadAccountIdFromVideo(postId);
            blockerAccountIds.Add(postOwnerAccount.Id);

            return blockerAccountIds;
        }
    }
}
