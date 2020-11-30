namespace Sharebook.Storage.API.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Sharebook.Services.Identity;


    public class UsersController : ControllerBase
    {
        private ICurrentUserService currentUserService;

        public UsersController(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }

        [Route("users/show")]
        public async Task<IActionResult> Show([FromQuery] QueryInput query)
        {
            var test = this.User.Identity;
            var userCurrent = this.currentUserService.UserId;
            return this.Ok("id " + userCurrent);
        }
    }

    public class QueryInput
    {
        public string ScreenName { get; set; }

        public int Id { get; set; }
    }
}
