namespace Sharebook.Web.Api.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Sharebook.Data.Models.Post.Entities;
    using Sharebook.Services.Data.Services;
    using Sharebook.Services.Data.Services.Entities;
    using Sharebook.Web.Api.Identity;
    using Sharebook.Web.Models.Inputs;
    using Sharebook.Web.Models.Inputs.Posts;
    using Sharebook.Web.Models.Outputs.Posts;

    [Route("posts")]
    public class PostsController : BaseApiController
    {
        private const int ITEM_PER_PAGE = 3;

        private IPostsService postService;
        private IUserService userService;

        private readonly IMediaService mediaService;


        public PostsController(IPostsService postService, IUserService userService, IMediaService mediaService)
        {
            this.postService = postService;
            this.userService = userService;
            this.mediaService = mediaService;
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

            var postDTOs = this.postService.GetHomeTimeline<PostDTO>(User.GetUserId(), query.Count, skip);
            
            var userDTO = await this.userService.GetById(User.GetUserId());
            foreach (var postDTO in postDTOs)
            {
                postDTO.User = userDTO;

                var ids = postDTO.MediasIds?.Split(", ").Select(x => int.Parse(x)).ToArray();
                postDTO.Entities.Medias = this.GetMedias(ids);
            }

            return this.Ok(new
            {
                data = postDTOs,
                total = postDTOs.Count(),
            });
        }

        [HttpPost]
        public async Task<IActionResult> PostPublish([FromQuery] QueryPostParams query)
        {
            var mediaIds = string.Join(", ", query.MediaIds);
            var post = await this.postService.CreateAsync(query.Status, mediaIds, User.GetUserId());

            return this.Ok(query);
        }

        private List<MediaEntity> GetMedias(int[] mediasIds)
        {
            var mediaEntities = new List<MediaEntity>();
            for (int i = 0; i < mediasIds.Length; i++)
            {
                mediaEntities.Add(this.mediaService.GetMediaById(mediasIds[i]));
            }

            return mediaEntities;
        }
    }
}
