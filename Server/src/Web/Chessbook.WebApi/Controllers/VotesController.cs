namespace Chessbook.Web.Api.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Web.Api.Lib;

    [Route("vote")]
    public class VotesController : BaseApiController
    {
        private readonly IPostsService postServce;

        public VotesController(IPostsService postServce)
        {
            this.postServce = postServce;
        }

        [HttpPut]
        [Route("{id:int}")]
        public virtual async Task<IActionResult> RatePost(int id, [FromBody] PostRateBody body)
        {
            var res = await this.postServce.InsertPostVoteAsync(id, User.GetUserId(), body.Rating);

            if (res != null)
            {
                Notifier.Instance.NotifyOfNewPostLike(res);
            }

            return this.NoContent();
        }
    }
}
