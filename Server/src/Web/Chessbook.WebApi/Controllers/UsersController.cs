namespace Chessbook.Web.Api.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Chessbook.Data.Common.Filters;
    using Chessbook.Services.Data.Services;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Api.Interfaces;
    using Chessbook.Web.Models;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    [Route("users")]
    public class UsersController : BaseApiController
    {
        protected readonly IUserService userService;
        protected readonly JwtManager jwtManager;
        protected readonly IAuthenticationService authService;
        protected readonly IPostsService postsService;

        public UsersController(IUserService userService, JwtManager jwtManager, IAuthenticationService authService, IPostsService postsService)
        {
            this.userService = userService;
            this.jwtManager = jwtManager;
            this.authService = authService;
            this.postsService = postsService;
        }

        [HttpGet]
        [Route("")]
        // [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetDataForGrid([FromQuery] UsersGridFilter filter)
        {
            filter = filter ?? new UsersGridFilter();
            var users = await userService.GetDataForGrid(filter);
            return Ok(users);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllUsers(int pageNumber = 1, int pageSize = 3)
        {
            var filter = new UsersGridFilter
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
            };

            var users = await this.userService.GetAllUsers(filter);

            // Thanks https://stackoverflow.com/questions/7397207/json-net-error-self-referencing-loop-detected-for-type ♥
            var res = JsonConvert.SerializeObject(users, Formatting.Indented,
               new JsonSerializerSettings
               {
                   PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                   ContractResolver = new CamelCasePropertyNamesContractResolver(),

               });

            return this.Ok(res);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await userService.GetById(id);
            return Ok(user);
        }

        [HttpGet]
        [Route("current")]
        public async Task<IActionResult> GetCurrent()
        {
            var currentUserId = User.GetUserId();
            if (currentUserId > 0)
            {
                var user = await userService.GetById(currentUserId);
                return Ok(user);
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Create(UserDTO userDto)
        {
            if (userDto.Id != 0)
            {
                return BadRequest();
            }

            var result = await userService.Edit(userDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Edit(int id, UserDTO userDto)
        {
            if (id != userDto.Id)
                return BadRequest();

            var result = await userService.Edit(userDto);
            return Ok(result);
        }

        [HttpPut]
        [Route("current")]
        public async Task<IActionResult> EditCurrent(UserDTO userDto)
        {
            var currentUserId = User.GetUserId();
            if (currentUserId != userDto.Id)
            {
                return BadRequest();
            }
            await userService.Edit(userDto);

            var newToken = await authService.GenerateToken(currentUserId);

            return Ok(newToken);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await userService.Delete(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("{userId:int}/photo")]
        [AllowAnonymous]
        public async Task<IActionResult> UserPhoto(int userId, string token)
        {
            var user = jwtManager.GetPrincipal(token);
            if (user == null || !user.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var photoContent = await userService.GetUserPhoto(userId);

            if (photoContent == null)
            {
                return NoContent();
            }

            return File(photoContent, contentType: "image/png");
        }

        [HttpGet]
        [Route("me/posts/{postId:int}/rating")]
        [Authorize]
        public async Task<IActionResult> GetUserPostRating(int postId)
        {
            var currentUserId = User.GetUserId();
            var postRateDTO = await this.postsService.LoadUserPostRate(currentUserId, postId);

            return this.Ok(postRateDTO);
        }
    }
}
