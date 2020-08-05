namespace WorldFeed.History.BC.Science.Post.Controllers.Comments
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using WorldFeed.Common.Controllers;
    using WorldFeed.History.API.Models.Comments;
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
    