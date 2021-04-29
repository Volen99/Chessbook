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
    using Chessbook.Web.Api.Factories;

    [Route("posts")]
    public class PostsController : BaseApiController
    {
        private const int ITEM_PER_PAGE = 3;

        private IPostsService postService;
        private IPollService pollService;
        private IUserService userService;


        private readonly IMediaService mediaService;
        private readonly IPictureService pictureService;
        private readonly IUserModelFactory userModelFactory;


        public PostsController(IPostsService postService, IPollService pollService, IUserService userService, IMediaService mediaService,
            IPictureService pictureService, IUserModelFactory userModelFactory)
        {
            this.postService = postService;
            this.userService = userService;
            this.mediaService = mediaService;
            this.pollService = pollService;
            this.pictureService = pictureService;
            this.userModelFactory = userModelFactory;
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

            for (int i = 0; i < postDTOs.Count; i++)
            {
                var postDTO = postDTOs[i];

                if (postDTO.Reshared)
                {
                    postDTO = postDTO.ResharedStatus = await this.postService.GetResharedOriginal<PostDTO>(postDTO.Id);
                }


                postDTO.Entities.Poll = postDTO.Poll;

                var picture = (await this.pictureService.GetPicturesByProductIdAsync(postDTO.Id)).FirstOrDefault();

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

                postDTO.Reshared = await this.postService.GetReshareStatus(postDTO.Id, User.GetUserId());
                postDTO.ReshareCount = await this.postService.GetReshareCount(postDTO.Id);
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

            var userDTO = await this.userService.GetById(query.UserId);
            foreach (var post in posts)
            {
                post.User = userDTO;
                post.Entities.Poll = post.Poll;

                post.User = await this.userModelFactory.PrepareCustomerModelAsync(post.User);

                var picture = (await this.pictureService.GetPicturesByProductIdAsync(post.Id)).FirstOrDefault();

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


        [HttpPost]
        [Route("reshare")]
        public async Task<IActionResult> PostReshare([FromQuery] QueryRetweetParams query)
        {
            var post = await this.postService.CreateRetweet(query.Id, User.GetUserId(), query.TrimUser);

            return this.Ok(post);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = this.postService.GetById<PostDTO>(id);

            var picture = (await this.pictureService.GetPicturesByProductIdAsync(post.Id, 1)).FirstOrDefault();

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

            for (int i = 0; i < users.Count(); i++)
            {
                users[i] = await this.userModelFactory.PrepareCustomerModelAsync(users[i]);
            }

            return this.Ok(users);
        }

        [HttpPost]
        [Route("Delete")]
        public  async Task<IActionResult> Delete([FromQuery] int id)
        {
            //if (!await _permissionService.AuthorizeAsync(StandardPermissionProvider.ManageProducts))
            //{
            //    return AccessDeniedView();
            //}

            //try to get a product with the specified id
            var product = await postService.GetByIdClean(id);
            if (product == null)
            {
                return this.BadRequest("List");
            }

            //// a vendor should have access only to his products
            //if (await _workContext.GetCurrentVendorAsync() != null && product.VendorId != (await _workContext.GetCurrentVendorAsync()).Id)
            //    return RedirectToAction("List");

            await this.postService.DeleteProductAsync(product);

            return this.Ok("List");
        }

        [HttpPost]
        [Route("unshare")]
        public async Task<IActionResult> PostUnshare([FromQuery] int id)
        {
            var product = await postService.GetByIdClean(id);
            if (product == null)
            {
                return this.BadRequest("List");
            }

            await this.postService.Unshare(product);

            return this.Ok();
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
