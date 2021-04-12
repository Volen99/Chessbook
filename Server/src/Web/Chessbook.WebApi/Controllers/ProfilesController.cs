using Chessbook.Services.Data.Services;
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
        public ProfilesController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile([FromQuery] string screen_name)
        {
            var userDTO = await this.userService.GetByScreenName(screen_name);

            return this.Ok(userDTO);
        }
    }
}
