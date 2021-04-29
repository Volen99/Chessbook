using Chessbook.Data.Models.Media;
using Chessbook.Services.Data.Services;
using Chessbook.Services.Data.Services.Media;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Controllers
{
    [Route("profiles")]
    public class ProfilesController : BaseApiController
    {
        private readonly IUserService userService;
        private readonly IPictureService pictureService;
        public ProfilesController(IUserService userService, IPictureService pictureService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile([FromQuery] string screen_name)
        {
            var userDTO = await this.userService.GetByScreenName(screen_name);

            var avatarPictureId = userDTO.ProfilePictureId; // await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.AvatarPictureIdAttribute);
            var profilePictureUrl = await this.pictureService.GetPictureUrlAsync(avatarPictureId, 400, true, defaultPictureType: PictureType.Avatar);

            userDTO.ProfileImageUrlHttps = profilePictureUrl;

            return this.Ok(userDTO);
        }
    }
}
