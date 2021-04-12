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
    using Chessbook.Web.Models.Outputs.Posts;
    using Chessbook.Data.Models.Polls;
    using Chessbook.Web.Models.Polls;
    using Chessbook.Web.Models.Outputs.Polls;
    using Chessbook.Web.Models;

    [Route("posts")]
    public class PostsController : BaseApiController
    {
        private const int ITEM_PER_PAGE = 3;

        private IPostsService postService;
        private IPollService pollService;
        private IUserService userService;

        private readonly IMediaService mediaService;


        public PostsController(IPostsService postService, IPollService pollService, IUserService userService, IMediaService mediaService)
        {
            this.postService = postService;
            this.userService = userService;
            this.mediaService = mediaService;
            this.pollService = pollService;
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

            var postDTOs = await this.postService.GetHomeTimeline<PostDTO>(User.GetUserId(), query.Count, skip);

            var userDTO = await this.userService.GetById(User.GetUserId());
            foreach (var postDTO in postDTOs)
            {
                postDTO.User = userDTO;

                if (postDTO.MediasIds != null)
                {
                    var ids = postDTO.MediasIds?.Split(", ").Select(x => int.Parse(x)).ToArray();
                    postDTO.Entities.Medias = await this.GetMedias(ids);
                }
                //else if (postDTO.PollId != 0)
                //{
                //    var poll = await this.pollService.GetPollByIdAsync<PollDTO>(postDTO.PollId);
                //    var pollOptions = await this.pollService.GetPollAnswerByPollAsync<PollOptionDTO>(poll.Id);

                //    poll.Options = pollOptions;

                //    postDTO.Entities.Poll = poll;
                //}
            }

            return this.Ok(new
            {
                data = postDTOs,
                total = postDTOs.Count(),
            });
        }

        [HttpPost]
        public async Task<IActionResult> PostPublish([FromQuery] QueryPostParams query, [FromBody] PollCreateBody pollBody)
        {
            if (!query.HasPoll)
            {
                var mediaIds = string.Join(", ", query.MediaIds);
                var post = await this.postService.CreateAsync(query, User.GetUserId(), mediaIds);
            }
            else
            {
                var pollId = await this.pollService.InsertPollAsync(pollBody, query.Status, false);

                var options = await this.pollService.InsertPollAnswerAsync(pollId, pollBody.Options);

                var post = await this.postService.CreateAsync(query, User.GetUserId(), null, pollId);
            }



            return this.Ok(query);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = this.postService.GetById<PostDTO>(id);

            var userDTO = await this.userService.GetById(User.GetUserId());
            post.User = userDTO;

            if (post.MediasIds != null)
            {
                var ids = post.MediasIds?.Split(", ").Select(x => int.Parse(x)).ToArray();
                post.Entities.Medias = await this.GetMedias(ids);

                var mediaSizes = await this.mediaService.GetMediaSize<MediaEntitySizeDTO>((int)post.Entities.Medias[0].Id);

                foreach (var size in mediaSizes)
                {
                    if (!post.Entities.Medias[0].Sizes.ContainsKey(size.Variant)) // nostalgia 💚
                    {
                        post.Entities.Medias[0].Sizes.Add(size.Variant, size);
                    }
                }
            }
            else if (post.PollId != 0)
            {
                var poll = await this.pollService.GetPollByIdAsync<PollDTO>(post.PollId);
                var pollOptions = await this.pollService.GetPollAnswerByPollAsync<PollOptionDTO>(poll.Id);

                poll.Options = pollOptions;

                post.Entities.Poll = poll;
            }

            return this.Ok(post);
        }

        [HttpGet]
        [Route("likers/{id}")]
        public async Task<IActionResult> Likers(int id)
        {
            var users = await this.postService.GetLikers<UserDTO>(id);

            return this.Ok(users);
        }

        private async Task<List<MediaEntityDTO>> GetMedias(int[] mediasIds)
        {
            var mediaEntities = new List<MediaEntityDTO>();
            for (int i = 0; i < mediasIds.Length; i++)
            {
                var mediaCurrent = await this.mediaService.GetMediaById<MediaEntityDTO>(mediasIds[i]);
                mediaEntities.Add(mediaCurrent);
            }

            return mediaEntities;
        }
    }
}
