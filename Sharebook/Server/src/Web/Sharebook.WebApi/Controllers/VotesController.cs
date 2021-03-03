namespace Sharebook.Web.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Sharebook.Data.Models.Post;
    using Sharebook.Data.Models.Post.Enums;
    using Sharebook.Services.Data.Services.Entities;
    using Sharebook.Web.Api.Identity;
    using Sharebook.Web.Models.Inputs;
    using Sharebook.Web.Models.Outputs.Posts;

    [Route("vote")]
    public class VotesController : BaseApiController
    {
        private readonly IPostsService postServce;

        public VotesController(IPostsService postServce)
        {
            this.postServce = postServce;
        }

        [HttpPut]
        public async Task<IActionResult> PostVote([FromQuery] QueryVoteParams query)
        {
            var post = this.postServce.GetById<PostDTO>(query.Id);
            if (post == null)
            {
                return this.BadRequest();
            }


            if (User?.GetUserId() == null)
            {
                return this.BadRequest();
            }
               

            var postVote = await this.postServce.GetPostVoteAsync(query.Id, User.GetUserId());
            if (postVote != null)
            {
                if (query.RateType == PostRateType.None)
                {
                    var dto = await this.postServce.RemoveVote(postVote);

                    return this.Ok(dto);
                }
                   

                var postDTO = await this.postServce.ChangeVote(query.RateType, postVote);

                return this.Ok(postDTO);
            }

            var res = await this.postServce.InsertPostVoteAsync(query.Id, User.GetUserId(), query.RateType);

            return this.Ok(res);
        }
    }
}
