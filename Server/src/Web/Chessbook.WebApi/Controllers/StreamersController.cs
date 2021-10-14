using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Common.Extensions;
using Chessbook.Core.JsonConverters;
using Chessbook.Services.Data;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.APIs;

namespace Chessbook.Web.Api.Controllers
{
    [Route("streamers")]
    public class StreamersController : BaseApiController
    {
        private const string TWITCH_CLIEND_ID = "mtkcd657i2m7r9tljz4o5vevhic3it";                   // I am so fucking dumb, omg... 15.04.2021
        private const string TWITCH_CLIENT_SECRET = "rc7a5j15k6bteusibx73dr7yizg986";

        private readonly IJsonObjectConverter jsonObjectConverter;
        private readonly IStreamersService streamersService;

        public StreamersController(IJsonObjectConverter jsonObjectConverter, IStreamersService streamersService)
        {
            this.jsonObjectConverter = jsonObjectConverter;
            this.streamersService = streamersService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAccessToken([FromQuery] string cursor)
        {
            var accessTokenDTO = await this.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");

            var url = "https://api.twitch.tv/helix/streams?game_id=743&first=50";

            if (cursor != null)
            {
                url = url.AddParameterToQuery("after", cursor);
            }

            var streamsDTO = await this.ExecuteRequest<GetStreamsResponseDTO>(url, accessTokenDTO.AccessToken);

            

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

            var accessTokenDTO = await this.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");
            var streamsDTO = await this.ExecuteRequest<GetChessbookUsersStreamDTO>(url, accessTokenDTO.AccessToken);

            streamsDTO.TwitchLoginName = await this.streamersService.GetByUserId(User.GetUserId());

            return this.Ok(streamsDTO);

        }

        [HttpGet]
        [Route("user/{userLogin:length(3, 16)}")]
        public async Task<IActionResult> GetStreamByUserLogin(string userLogin)
        {
            var accessTokenDTO = await this.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");
            var streamsDTO = await this.ExecuteRequest<GetStreamsResponseDTO>($"https://api.twitch.tv/helix/streams?user_login={userLogin}", accessTokenDTO.AccessToken);

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

        private async Task<TDTO> ExecuteRequest<TDTO>(string url, string accessToken = null)
        {
            var httpClient = new HttpClient();
            var method = HttpMethod.Get;

            httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
            httpClient.DefaultRequestHeaders.Add("Client-ID", TWITCH_CLIEND_ID);

            if (accessToken == null)
            {
                httpClient = new HttpClient();
                method = HttpMethod.Post;
            }

            var httpResponseMessage = await httpClient.SendAsync(new HttpRequestMessage(method, url));

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                Console.WriteLine(httpResponseMessage.ReasonPhrase);
                return default(TDTO);
            }

            var json = "";

            var stream = httpResponseMessage.Content.ReadAsStreamAsync().Result;
            if (stream != null)
            {
                json = Encoding.UTF8.GetString(StreamToBinary(stream));
            }

            var dto = this.jsonObjectConverter.Deserialize<TDTO>(json, null);

            return dto;
        }

        private static byte[] StreamToBinary(Stream stream)
        {
            if (stream == null)
            {
                return null;
            }

            byte[] binary;

            using (var tempMemStream = new MemoryStream())
            {
                byte[] buffer = new byte[128];

                while (true)
                {
                    int read = stream.Read(buffer, 0, buffer.Length);

                    if (read <= 0)
                    {
                        binary = tempMemStream.ToArray();
                        break;
                    }

                    tempMemStream.Write(buffer, 0, read);
                }
            }

            return binary;
        }
    }

}
