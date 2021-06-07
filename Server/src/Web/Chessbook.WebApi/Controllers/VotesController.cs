namespace Chessbook.Web.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Data.Models.Post;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Web.Api.Areas.Admin.Models.Post;
    using Chessbook.Web.Api.Factories;
    using Chessbook.Services.Data.Services;
    using Nop.Core;
    using Chessbook.Services.Localization;

    [Route("vote")]
    public class VotesController : BaseApiController
    {
        private readonly IPostsService postServce;
        private readonly IPostModelFactory postModelFactory;
        private readonly IUserService _customerService;
        private readonly IWorkContext _workContext;
        private readonly ILocaleStringResourceService localeStringResourceService;

        public VotesController(IPostsService postServce, IPostModelFactory postModelFactory, IUserService customerService, IWorkContext workContext,
            ILocaleStringResourceService localeStringResourceService)
        {
            this.postServce = postServce;
            this.postModelFactory = postModelFactory;
            this._customerService = customerService;
            this._workContext = workContext;
            this.localeStringResourceService = localeStringResourceService;
        }

        [HttpPost] // TODO: fix in client!!
        public virtual async Task<IActionResult> PostVote([FromQuery] QueryVoteParams query)
        {

            var forumPost = await this.postServce.GetPostByIdAsync(query.Id);
            if (forumPost == null)
            {
                this.BadRequest(); // https://stackoverflow.com/questions/22762697/return-empty-json-on-null-in-webapi/32804589#32804589 🤔
            }

            if (!await _customerService.IsRegisteredAsync(await _workContext.GetCurrentCustomerAsync()))
                return this.Ok(new
                {
                    Error = await this.localeStringResourceService.GetResourceAsync("Forum.Votes.Login"),
                    VoteCount = forumPost.FavoriteCount
                });

            //// own post
            //if ((await _workContext.GetCurrentCustomerAsync()).Id == forumPost.UserId)
            //    return this.Ok(new
            //    {
            //        Error = await this.localeStringResourceService.GetResourceAsync("Forum.Votes.OwnPost"),
            //        VoteCount = forumPost.FavoriteCount
            //    });

            var forumPostVote = await this.postServce.GetPostVoteAsync(query.Id, await _workContext.GetCurrentCustomerAsync());
            if (forumPostVote != null)
            {
                if ((forumPostVote.IsUp && query.IsUp) || (!forumPostVote.IsUp && !query.IsUp))
                    return this.Ok(new
                    {
                        Error = await this.localeStringResourceService.GetResourceAsync("Forum.Votes.AlreadyVoted"),
                        VoteCount = forumPost.FavoriteCount
                    });

                await this.postServce.DeletePostVoteAsync(forumPostVote);
                return this.Ok(new { VoteCount = forumPost.FavoriteCount });
            }

            await this.postServce.InsertPostVoteAsync(new PostVote
            {
                UserId = (await _workContext.GetCurrentCustomerAsync()).Id,
                PostId = query.Id,
                IsUp = query.IsUp,
                CreatedOnUtc = DateTime.UtcNow
            });

            return this.Ok(new { VoteCount = forumPost.FavoriteCount, IsUp = query.IsUp });
        }
    }
}
