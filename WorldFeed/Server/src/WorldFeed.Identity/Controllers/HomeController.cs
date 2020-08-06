namespace WorldFeed.Identity.API.Controllers
{
    using System.Security.Claims;
    using System.Threading.Tasks;
    using IdentityServer4.Services;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    using WorldFeed.Identity.API.Models;
    using WorldFeed.Identity.API.Services;

    public class HomeController : Controller
    {
        private const string AuthSchemes = CookieAuthenticationDefaults.AuthenticationScheme + "," + JwtBearerDefaults.AuthenticationScheme;

        private readonly IIdentityServerInteractionService interaction;
        private readonly IOptionsSnapshot<AppSettings> settings;
        private readonly IRedirectService redirectSvc;


        public HomeController(IIdentityServerInteractionService interaction, IOptionsSnapshot<AppSettings> settings,IRedirectService redirectSvc)
        {
            this.interaction = interaction;
            this.settings = settings;
            this.redirectSvc = redirectSvc;
        }

       // just learning and testing..
       // [Authorize(AuthenticationSchemes = AuthSchemes)]
       // [Authorize(Policy = "Feeders")]                   // This action is accessible only by Identities with the "Feeders" Claim...
       //
        public IActionResult Index(string returnUrl)
        {
            return View();
        }

        public IActionResult ReturnToOriginalApplication(string returnUrl)
        {
            if (returnUrl != null)
                return Redirect(this.redirectSvc.ExtractRedirectUriFromReturnUrl(returnUrl));
            else
                return RedirectToAction("Index", "Home");
        }

        /// <summary>
        /// Shows the error page
        /// </summary>
        public async Task<IActionResult> Error(string errorId)
        {
            var vm = new ErrorViewModel();

            // retrieve error details from identityserver
            var message = await this.interaction.GetErrorContextAsync(errorId);
            if (message != null)
            {
                vm.Error = message;
            }

            return View("Error", vm);
        }
    }
}
