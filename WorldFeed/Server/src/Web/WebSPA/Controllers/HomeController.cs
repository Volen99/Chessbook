// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860
namespace WorldFeed.WebSPA.Controllers
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using IdentityModel.Client;

    [EnableCors("MyPolicy")]
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment env;
        private readonly IOptionsSnapshot<AppSettings> settings;
        private readonly IHttpClientFactory httpClientFactory;

        public HomeController(IWebHostEnvironment env, IOptionsSnapshot<AppSettings> settings, IHttpClientFactory httpClientFactory)
        {
            this.env = env;
            this.settings = settings;
            this.httpClientFactory = httpClientFactory;
        }

        public IActionResult Configuration()
        {
          //  var container = TweetinviContainer.Container;

            return Json(this.settings.Value);
        }

        [Authorize]
        public async Task<IActionResult> RefreshTokens()
        {
            var serverClient = this.httpClientFactory.CreateClient();
            var discoveryDocument = await serverClient.GetDiscoveryDocumentAsync("https://localhost:5021");

            // Refresh token is not a JWT
            var refreshToken = await this.HttpContext.GetTokenAsync("refresh_token");

            var refreshTokenClient = this.httpClientFactory.CreateClient();

            var tokenResponse = await refreshTokenClient
                .RequestRefreshTokenAsync(new RefreshTokenRequest
                {
                    Address = discoveryDocument.TokenEndpoint,
                    RefreshToken = refreshToken,
                    ClientId = "js",
                    ClientSecret = "What did Apollo 11 discover during lost two minutes of SILENCE?"
                });

            var authInfo = await this.HttpContext.AuthenticateAsync("WebClientCookie");

            authInfo.Properties.UpdateTokenValue("access_token", tokenResponse.AccessToken);
            authInfo.Properties.UpdateTokenValue("id_token", tokenResponse.IdentityToken);
            authInfo.Properties.UpdateTokenValue("refresh_token", tokenResponse.RefreshToken);

            await this.HttpContext.SignInAsync("WebClientCookie", authInfo.Principal, authInfo.Properties);

            return Ok();
        }
    }
}
