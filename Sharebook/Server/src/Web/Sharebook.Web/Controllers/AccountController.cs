namespace Sharebook.Identity.API.Controllers
{
    using System;
    using System.Globalization;
    using System.Linq;
    using System.Security.Claims;
    using System.Text.Encodings.Web;
    using System.Threading.Tasks;
    using IdentityModel;
    using IdentityServer4;
    using IdentityServer4.Models;
    using IdentityServer4.Services;
    using IdentityServer4.Stores;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Serilog;
    using Sharebook.Common;
    using Sharebook.Data.Models;
    using Sharebook.Services.Messaging;
    using Sharebook.Web.Controllers;
    using Sharebook.Web.Models.Users;


    /// <summary>
    /// This sample controller implements a typical login/logout/provision workflow for local accounts.
    /// The login service encapsulates the interactions with the user data store. This data store is in-memory only and cannot be used for production!
    /// The interaction service provides a way for the UI to communicate with identityserver for validation and context retrieval
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        //private readonly InMemoryUserLoginService _loginService;
        private readonly UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        /*private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ILoginService<ApplicationUser> loginService;
        private readonly IIdentityServerInteractionService interaction;
        private readonly IClientStore clientStore;
        private readonly IConfiguration configuration;*/

        private readonly IEmailSender emailSender;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.emailSender = emailSender;
            //this.signInManager = signInManager;
            //this.loginService = loginService;
            //this.interaction = interaction;
            //this.clientStore = clientStore;
            //this.configuration = configuration;
        }

        /// <summary>
        /// Show login page
        /// </summary>
        //[HttpGet]
        //public async Task<IActionResult> Login(string returnUrl)
        //{
        //    var context = await this.interaction.GetAuthorizationContextAsync(returnUrl);
        //    if (context?.IdP != null)
        //    {
        //        throw new NotImplementedException("External login is not implemented!");
        //    }

        //    var vm = await BuildLoginViewModelAsync(returnUrl, context);

        //    ViewData["ReturnUrl"] = returnUrl;
        //    return View(vm);
        //}

        /// <summary>
        /// Handle postback from username/password login
        /// </summary>
        //[HttpPost]
        //// [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.loginService.FindByUsername(model.Email);

                if (await this.loginService.ValidateCredentials(user, model.Password))
                {
                    var tokenLifetime = this.configuration.GetValue("TokenLifetimeMinutes", 120);

                    var props = new AuthenticationProperties
                    {
                        ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(tokenLifetime),
                        AllowRefresh = true,
                        RedirectUri = model.ReturnUrl
                    };

                    if (model.RememberMe)
                    {
                        var permanentTokenLifetime = this.configuration.GetValue("PermanentTokenLifetimeDays", 365);

                        props.ExpiresUtc = DateTimeOffset.UtcNow.AddDays(permanentTokenLifetime);
                        props.IsPersistent = true;
                    };

                    await this.loginService.SignInAsync(user, props);

                    //// make sure the returnUrl is still valid, and if yes - redirect back to authorize endpoint
                    //if (this.interaction.IsValidReturnUrl(model.ReturnUrl))
                    //{
                    //    return Redirect(model.ReturnUrl);
                    //}

                    //return Redirect("~/");

                    return Redirect(model.ReturnUrl);

                }

                ModelState.AddModelError("", "Invalid username or password.");
            }

            // something went wrong, show form with error
            var vm = await BuildLoginViewModelAsync(model);

            ViewData["ReturnUrl"] = model.ReturnUrl;

            return View(vm);
        }

        //private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl, AuthorizationRequest context)
        //{
        //    var allowLocal = true;
        //    if (context?.Client.ClientId != null) // TODO: BUUUUUUG!! 🐛
        //    {
        //        var client = await this.clientStore.FindEnabledClientByIdAsync(context?.Client.ClientId); // TODO: BUUUUUUG!! 🐛
        //        if (client != null)
        //        {
        //            allowLocal = client.EnableLocalLogin;
        //        }
        //    }

        //    var externalProviders = await this.signInManager.GetExternalAuthenticationSchemesAsync();

        //    return new LoginViewModel
        //    {
        //        ReturnUrl = returnUrl,
        //        Email = context?.LoginHint,
        //        ExternalProviders = externalProviders,
        //    };
        //}

        //private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginViewModel model)
        //{
        //    var context = await this.interaction.GetAuthorizationContextAsync(model.ReturnUrl);
        //    var vm = await BuildLoginViewModelAsync(model.ReturnUrl, context);
        //    vm.Email = model.Email;
        //    vm.RememberMe = model.RememberMe;
        //    return vm;
        //}

        ///// <summary>
        ///// Show logout page
        ///// </summary>
        //[HttpGet]
        //public async Task<IActionResult> Logout(string logoutId)
        //{
        //    if (User.Identity.IsAuthenticated == false)
        //    {
        //        // if the user is not authenticated, then just show logged out page
        //        return await Logout(new LogoutViewModel { LogoutId = logoutId });
        //    }

        //    //Test for Xamarin. 
        //    var context = await this.interaction.GetLogoutContextAsync(logoutId);
        //    if (context?.ShowSignoutPrompt == false)
        //    {
        //        //it's safe to automatically sign-out
        //        return await Logout(new LogoutViewModel { LogoutId = logoutId });
        //    }

        //    // show the logout prompt. this prevents attacks where the user
        //    // is automatically signed out by another malicious web page.
        //    var vm = new LogoutViewModel
        //    {
        //        LogoutId = logoutId
        //    };
        //    return View(vm);
        //}

        ///// <summary>
        ///// Handle logout page postback
        ///// </summary>
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Logout(LogoutViewModel model)
        //{
        //    var idp = this.User?.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;

        //    if (idp != null && idp != IdentityServerConstants.LocalIdentityProvider)
        //    {
        //        if (model.LogoutId == null)
        //        {
        //            // if there's no current logout context, we need to create one
        //            // this captures necessary info from the current logged in user
        //            // before we signout and redirect away to the external IdP for signout
        //            model.LogoutId = await this.interaction.CreateLogoutContextAsync();
        //        }

        //        string url = "/Account/Logout?logoutId=" + model.LogoutId;

        //        try
        //        {

        //            // hack: try/catch to handle social providers that throw
        //            await HttpContext.SignOutAsync(idp, new AuthenticationProperties
        //            {
        //                RedirectUri = url
        //            });
        //        }
        //        catch (Exception ex)
        //        {
        //            //_logger.LogError(ex, "LOGOUT ERROR: {ExceptionMessage}", ex.Message);
        //            Console.WriteLine("LOGOUT ERROR: {ExceptionMessage}", ex.Message);
        //        }
        //    }

        //    // delete authentication cookie
        //    await HttpContext.SignOutAsync();

        //    await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

        //    // set this so UI rendering sees an anonymous user
        //    HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity());

        //    // get context information (client name, post logout redirect URI and iframe for federated signout)
        //    var logout = await this.interaction.GetLogoutContextAsync(model.LogoutId);

        //    return Redirect(logout?.PostLogoutRedirectUri);
        //}

        //public async Task<IActionResult> DeviceLogOut(string redirectUrl)
        //{
        //    // delete authentication cookie
        //    await HttpContext.SignOutAsync();

        //    // set this so UI rendering sees an anonymous user
        //    HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity());

        //    return Redirect(redirectUrl);
        //}

        //// GET: /Account/Register
        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult Register(string returnUrl = null)
        //{
        //    var registerViewModel = new RegisterViewModel();

        //    ViewData["ReturnUrl"] = returnUrl;
        //    return View(registerViewModel);
        //}


        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterInputModel model, string returnUrl = null)
        {
            // ViewData["ReturnUrl"] = returnUrl;

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    Name = model.DisplayName,
                    UserName = model.DisplayName,
                    ScreenName = model.DisplayName,
                    Email = model.Email,
                    CanMediaTag = true,
                    CreatedOn = DateTime.UtcNow,
                    DefaultProfileImage = true,
                    DefaultProfile = true,
                    Description = "Description",
                    Month = model.Birthdate.Month,
                    Day = model.Birthdate.Day,
                    Year = model.Birthdate.Year,
                    Visibility = "Self",
                    VisibilityYear = "Self",
                };

                var birthday = DateTime.ParseExact($"{model.Birthdate.Month}/{model.Birthdate.Day}/{model.Birthdate.Year} 00:00", "M/d/yyyy hh:mm", CultureInfo.InvariantCulture);
                var age = Calculator.Age(birthday);
                if (age.HasValue)
                {
                    user.Age = (int)age;
                }

                var result = await this.userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var code = await this.userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { userId = user.Id, code = code },
                        protocol: Request.Scheme);

                    await this.emailSender.SendEmailAsync(user.Name, user.Email, GlobalConstants.SystemName, "Confirm your email",
                         $"Plz confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    await this.signInManager.SignInAsync(user, isPersistent: false);
                    return this.Ok(returnUrl);
                }

                AddErrors(result);
                // If we got this far, something failed, redisplay form
                return this.BadRequest(model);
            }

            if (returnUrl != null)
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    return Redirect(returnUrl);
                }
                else
                    if (ModelState.IsValid)
                    return RedirectToAction("login", "account", new { returnUrl = returnUrl });
                else
                    return this.Ok(model); // View(model);
            }

            return this.Ok();                   // return RedirectToAction("index", "home");
        }

        [HttpGet]
        public IActionResult Redirecting()
        {
            return this.Ok();      // return View();
        }

        [HttpGet]
        public async Task<ApplicationUser> GetUser(string sub)
        {
            var user = await this.userManager.FindByIdAsync(sub);

            if (user == null)
            {
                throw new ArgumentNullException();
            }

            return user;
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
    }
}
