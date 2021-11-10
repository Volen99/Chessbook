using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using Chessbook.Core.JsonConverters;
using Chessbook.Web.Models.APIs;

namespace Chessbook.Services.APIs
{
    public class TwitchService : ITwitchService
    {
        private const string TWITCH_CLIEND_ID = "mtkcd657i2m7r9tljz4o5vevhic3it";
        private const string TWITCH_CLIENT_SECRET = "rc7a5j15k6bteusibx73dr7yizg986";

        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitchService(IJsonObjectConverter jsonObjectConverter)
        {
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public async Task<TDTO> ExecuteRequest<TDTO>(string url, string accessToken = null)
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

        public async Task<GetTwitchClipOrVideoData> GetTwitchClipImage(string slug)
        {
            var accessTokenDTO = await this.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");
            var clipDTO = await this.ExecuteRequest<GetTwitchClipOrVideoData>($"https://api.twitch.tv/helix/clips?id={slug}", accessTokenDTO.AccessToken);

            return clipDTO;
        }

        public async Task<GetTwitchClipOrVideoData> GetTwitchVideoImage(string id)
        {
            var accessTokenDTO = await this.ExecuteRequest<CreateTokenResponseDTO>($"https://id.twitch.tv/oauth2/token?client_id={TWITCH_CLIEND_ID}&client_secret={TWITCH_CLIENT_SECRET}&grant_type=client_credentials");
            var clipDTO = await this.ExecuteRequest<GetTwitchClipOrVideoData>($"https://api.twitch.tv/helix/videos?id={id}", accessTokenDTO.AccessToken);

            return clipDTO;
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
