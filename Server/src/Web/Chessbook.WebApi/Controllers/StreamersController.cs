using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Common.Extensions;
using Chessbook.Core.JsonConverters;
using Chessbook.Services.Data;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.APIs;
using Chessbook.Services.APIs;

namespace Chessbook.Web.Api.Controllers
{
    [Route("streamers")]
    public class StreamersController : BaseApiController
    {
        private const string TWITCH_CLIEND_ID = "mtkcd657i2m7r9tljz4o5vevhic3it";                   // I am so fucking dumb, omg... 15.04.2021
        private const string TWITCH_CLIENT_SECRET = "rc7a5j15k6bteusibx73dr7yizg986";

        private readonly IStreamersService streamersService;
        private readonly ITwitchService twitchService;

        public StreamersController(IStreamersService streamersService, ITwitchService twitchService)
        {
            this.streamersService = streamersService;
            this.twitchService = twitchService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAccessToken([FromQuery] string cursor)
        {
            var accessTokenDTO = await this.twitchService.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");

            var url = "https://api.twitch.tv/helix/streams?game_id=743&first=50";

            if (cursor != null)
            {
                url = url.AddParameterToQuery("after", cursor);
            }

            var streamsDTO = await this.twitchService.ExecuteRequest<GetStreamsResponseDTO>(url, accessTokenDTO.AccessToken);

            return this.Ok(streamsDTO);
        }

        [HttpGet]
        [Route("users")] 
        public async Task<IActionResult> GetChessbookUsersStream([FromQuery] string cursor)
        {
            var loginNames = await this.streamersService.GetAllLoginNames();

            if (loginNames == null)
            {
                return this.NoContent();
            }

            var url = $"https://api.twitch.tv/helix/streams?first=50";

            foreach (var loginName in loginNames)
            {
                url = url.AddParameterToQuery("user_login", loginName);
            }

            if (cursor != null)
            {
                url = url.AddParameterToQuery("after", cursor);
            }

            var accessTokenDTO = await this.twitchService.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");

            var streamsDTO = await this.twitchService.ExecuteRequest<GetChessbookUsersStreamDTO>(url, accessTokenDTO.AccessToken);

            streamsDTO.TwitchLoginName = await this.streamersService.GetByUserId(User.GetUserId());

            return this.Ok(streamsDTO);

        }

        [HttpGet]
        [Route("user/{userLogin:length(3, 16)}")]
        public async Task<IActionResult> GetStreamByUserLogin(string userLogin)
        {
            var accessTokenDTO = await this.twitchService.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");
            var streamsDTO = await this.twitchService.ExecuteRequest<GetStreamsResponseDTO>($"https://api.twitch.tv/helix/streams?user_login={userLogin}", accessTokenDTO.AccessToken);

            return this.Ok(streamsDTO);
        }

        [HttpPost]
        [Route("save/{userLogin:length(3, 16)}")]
        public async Task<IActionResult> SaveTwitchUserLogin(string userLogin)
        {
            var res = await this.streamersService.SaveUserLogin(userLogin, User.GetUserId());

            if (res == null)
            {
               var obj = new { message = "Username already exists" };
               return this.Ok(obj);
            }

            return this.Ok(new { message = "Username successfully added" });
        }

        [HttpPost]
        [Route("edit/{userLogin:length(3, 16)}")]
        public async Task<IActionResult> EditTwitchUserLogin(string userLogin, [FromBody] EditTwitchLoginNameInputModel input)
        {
            if (input.UserId != User.GetUserId())
            {
                return this.Unauthorized("Haha, you can't trick me! You can't edit someone else twitch username 🙄..");
            }

            var res = await this.streamersService.EditUserLogin(userLogin,input.UserId);

            return this.Ok(new { username = res });
        }

        [HttpPost]
        [Route("delete/{userLogin:length(3, 16)}")]
        public async Task<IActionResult> DeleteTwitchUserLogin(string userLogin, [FromBody] EditTwitchLoginNameInputModel input)
        {
            if (input.UserId != User.GetUserId())
            {
                return this.Unauthorized("Haha, you can't trick me! You can't delete someone else twitch username 🙄..");
            }

            var res = await this.streamersService.DeleteUserLogin(userLogin, input.UserId);

            return this.Ok(new { username = res });
        }
       
    }

}
