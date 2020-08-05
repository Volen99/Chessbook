namespace WorldFeed.History.BC.Science.Post.Controllers.Comments
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using WorldFeed.Common.Controllers;
    using WorldFeed.History.BC.Science.Post.Models.Comments;
    using WorldFeed.Web.Common;

    public class CommentController : ApiController
    {
        [HttpPost]
        public async Task<ApiResponse<CreateCommentOutputModel>> Create(CreateCommentRequestModel request)
        {
            return default;
        }
    }
}
    