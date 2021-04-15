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
    using Chessbook.Services.Data.Services.Media;
    using Chessbook.Common;

    [Route("posts")]
    public class PostsController : BaseApiController
    {
        private const int ITEM_PER_PAGE = 3;

        private IPostsService postService;
        private IPollService pollService;
        private IUserService userService;


        private readonly IMediaService mediaService;
        private readonly IPictureService pictureService;


        public PostsController(IPostsService postService, IPollService pollService, IUserService userService, IMediaService mediaService,
            IPictureService pictureService)
        {
            this.postService = postService;
            this.userService = userService;
            this.mediaService = mediaService;
            this.pollService = pollService;
            this.pictureService = pictureService;
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

            foreach (var postDTO in postDTOs)
            {
                postDTO.Entities.Poll = postDTO.Poll;

                var picture = (await this.pictureService.GetPicturesByPostIdAsync(postDTO.Id)).FirstOrDefault();

                var pictureSize = 480;

                string displayUrl;
                string expandUrl;

                (expandUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture);
                (displayUrl, _) = await this.pictureService.GetPictureUrlAsync(picture, pictureSize);

                var pictureModel = new MediaEntityDTO
                {
                    Id = picture.Id,
                    IdStr = picture.Id.ToString(),
                    DisplayURL = ChessbookConstants.SiteHttps + displayUrl,
                    ExpandedURL = ChessbookConstants.SiteHttps + expandUrl,
                    MediaURL = picture.VirtualPath,
                };

                if (picture != null)
                {
                    postDTO.Entities.Medias.Add(pictureModel);
                }

                var profilePictureUrl = await this.pictureService.GetPictureUrlAsync(postDTO.User.ProfilePictureId, 73);

                // TODO: check for null

                postDTO.User.ProfileImageUrlHttps = ChessbookConstants.SiteHttps + profilePictureUrl;
            }

            return this.Ok(new
            {
                data = postDTOs,
                total = postDTOs.Count(),
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

            var posts = await this.postService.GetUserProfileTimeline<PostDTO>(query.UserId, query.Count, skip);

            var userDTO = await this.userService.GetById(User.GetUserId());
            foreach (var post in posts)
            {
                post.User = userDTO;
                post.Entities.Poll = post.Poll;

                var picture = (await this.pictureService.GetPicturesByPostIdAsync(post.Id)).FirstOrDefault();

                var pictureSize = 480;

                string displayUrl;
                string expandUrl;

                (expandUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture);
                (displayUrl, _) = await this.pictureService.GetPictureUrlAsync(picture, pictureSize);

                var pictureModel = new MediaEntityDTO
                {
                    Id = picture.Id,
                    IdStr = picture.Id.ToString(),
                    DisplayURL = ChessbookConstants.SiteHttps + displayUrl,
                    ExpandedURL = ChessbookConstants.SiteHttps + expandUrl,
                    MediaURL = picture.VirtualPath,
                };

                if (picture != null)
                {
                    post.Entities.Medias.Add(pictureModel);
                }
            }

            return this.Ok(new
            {
                data = posts,
                total = posts.Count(),
            });
        }

        [HttpPost]
        public async Task<IActionResult> PostPublish([FromQuery] QueryPostParams query, [FromBody] PollCreateBody pollBody)
        {
            if (!query.HasPoll)
            {
                var post = await this.postService.CreateAsync(query, User.GetUserId(), query.MediaIds);
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

            var picture = (await this.pictureService.GetPicturesByPostIdAsync(post.Id)).FirstOrDefault();

            var pictureSize = 480;

            string displayUrl;
            string expandUrl;

            (expandUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture);
            (displayUrl, _) = await this.pictureService.GetPictureUrlAsync(picture, pictureSize);

            var pictureModel = new MediaEntityDTO
            {
                Id = picture.Id,
                IdStr = picture.Id.ToString(),
                DisplayURL = ChessbookConstants.SiteHttps + displayUrl,
                ExpandedURL = ChessbookConstants.SiteHttps + expandUrl,
                MediaURL = picture.VirtualPath,
            };

            if (picture != null)
            {
                post.Entities.Medias.Add(pictureModel);
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
