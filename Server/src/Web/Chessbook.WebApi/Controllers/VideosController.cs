using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Chessbook.Services.APIs;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.APIs;
using Chessbook.Services;
using Chessbook.Core;

namespace Chessbook.Web.Api.Controllers
{
    [Route("videos")]
    public class VideosController : BaseApiController
    {
        private readonly IYoutubeService youtubeService;
        private readonly IUserService userService;
        private readonly IWorkContext workContext;

        public VideosController(IYoutubeService youtubeService, IUserService userService, IWorkContext workContext)
        {
            this.youtubeService = youtubeService;
            this.userService = userService;
            this.workContext = workContext;
        }

        [Authorize]
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add([FromBody] AddYoutubeVideoInputModel input)
        {
            var res = await this.youtubeService.AddVideo(input.VideoId, input.Title, input.Description, User.GetUserId());

            if (res == null)
            {
                return this.BadRequest();
            }

            return this.Ok(res);
        }

        [HttpGet]
        [Route("get/{userId}")]
        public async Task<IActionResult> GetVideos(int userId)
        {
            var user =  await this.userService.GetCustomerByIdAsync(userId);

            if (user == null)
            {
                return this.NotFound();
            }

            var videos = await this.youtubeService.GetVideosByUserId(userId);

            return this.Ok(videos);
        }

        [Authorize]
        [HttpPost]
        [Route("edit/{id:int}")]
        public async Task<IActionResult> Edit(int id, [FromBody] EditYoutubeVideoInputModel input)
        {
            var userCurrent = await this.workContext.GetCurrentCustomerAsync();
            if (!await this.userService.IsRegisteredAsync(userCurrent)
                || userCurrent.Id != User.GetUserId() && !await this.userService.IsAdminAsync(userCurrent))
            {
                return this.Unauthorized();
            }

            // try to get a video with the specified id
            var video = await this.youtubeService.GetById(id);
            if (video == null)
            {
                return this.NotFound();
            }

            video.VideoId = input.VideoId;
            video.Title = input.Title;
            video.Description = input.Description;
            video.ThumbUrl = $"https://i.ytimg.com/vi/{input.VideoId}/mq1.jpg";
            video.UpdatedAt = DateTime.UtcNow;

            await this.youtubeService.Edit(video);

            return this.Ok(video);
        }

        [Authorize]
        [HttpPost]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userCurrent = await this.workContext.GetCurrentCustomerAsync();
            if (!await this.userService.IsRegisteredAsync(userCurrent)
                || (userCurrent.Id != User.GetUserId() && !await this.userService.IsAdminAsync(userCurrent)) )
            {
                return this.Unauthorized();
            }

            // try to get a video with the specified id
            var video = await this.youtubeService.GetById(id);
            if (video == null)
            {
                return this.NotFound();
            }

            await this.youtubeService.Delete(video);

            return this.Ok();
        }

    }
}
