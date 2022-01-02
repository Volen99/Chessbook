using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Core;
using Chessbook.Services.Entities;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Api.Factories;
using Chessbook.Services;

namespace Chessbook.Web.Api.Controllers
{
    public class RepostController : BaseApiController
    {
        private readonly IPostsService postService;
        private readonly IRepostService repostService;
        private readonly IPostModelFactory postModelFactory;
        private readonly IUserService userService;
        private readonly IWorkContext workContext;

        public RepostController(IPostsService postService, IRepostService repostService, IPostModelFactory postModelFactory, IUserService userService,
            IWorkContext workContext)
        {
            this.postService = postService;
            this.repostService = repostService;
            this.postModelFactory = postModelFactory;
            this.userService = userService;
            this.workContext = workContext;
        }

        [HttpPost]
        [Route("posts/{postId:int}/repost")]
        public async Task<IActionResult> Create(int postId)
        {
            var originalPost = await this.postService.GetPostByIdAsync(postId);
            if (originalPost == null)
            {
                return this.NotFound("Original post not found");
            }

            // try to see if this post has already been reposted by the same user
            var theRepostedPost = await this.postService.GetRepostStatus(postId, User.GetUserId());
            if (theRepostedPost != null)
            {
                return this.Ok("You have already reposted this post");
            }

            var repost = await this.repostService.Create(User.GetUserId(), originalPost);

            if (repost == null)
            {
                return this.BadRequest();
            }

            // notify

            var model = await this.postModelFactory.PreparePostModelAsync(repost);

            return this.Ok(model);
        }

        [HttpPost]
        [Route("posts/{postId:int}/unrepost")]
        public async Task<IActionResult> Destroy(int postId)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            // try to get a post with the specified id
            var originalPost = await this.postService.GetPostByIdAsync(postId);
            if (originalPost == null)
            {
                return this.NotFound();
            }

            var theRepostedPost = await this.postService.GetRepostStatus(originalPost.Id, User.GetUserId());

            await this.repostService.Destroy(theRepostedPost, originalPost);

            return this.Ok(theRepostedPost);
        }
    }
}
