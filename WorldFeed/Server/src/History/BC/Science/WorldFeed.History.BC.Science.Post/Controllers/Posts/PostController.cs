namespace WorldFeed.History.BC.Science.Post.Controllers.Posts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using WorldFeed.Common.Controllers;
    using WorldFeed.History.BC.Science.Post.Models.Posts;
    using WorldFeed.History.BC.Science.Post.Services.Posts;
    using WorldFeed.Web.Common;

    public class PostController : ApiController
    {
        private readonly IPostService postService;

        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        [Route(nameof(GetAll))]
        [HttpGet]
        public async Task<ApiResponse<IEnumerable<PostOutputModel>>> GetAll()   
        {
            if (this.ModelState.IsValid == false)
            {

            }

            //var posts = await this.postService.GetAll();

            return default;
        }
    }
}
