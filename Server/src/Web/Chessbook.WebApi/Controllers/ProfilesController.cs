using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services.Data.Services;
using Chessbook.Web.Api.Factories;

namespace Chessbook.Web.Api.Controllers
{
    [Route("profiles")]
    public class ProfilesController : BaseApiController
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        public ProfilesController(IUserService userService, IUserModelFactory userModelFactory)
        {
            this.userService = userService;
            this.userModelFactory = userModelFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile([FromQuery] string screen_name)
        {
            //var userDTO = await this.userService.GetCustomerByUsernameAsync(screen_name);

            //userDTO = await this.userModelFactory.PrepareCustomerModelAsync(userDTO);

            //return this.Ok(userDTO);

            return this.Ok();
        }
    }
}
