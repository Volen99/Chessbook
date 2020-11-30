namespace Sharebook.Identity.API.Controllers
{
    using System;
    using System.Globalization;
    using System.Linq;
    using System.Security.Claims;
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

    using Sharebook.Common;
    using Sharebook.Identity.API.Models.AccountViewModels;
    using Sharebook.Identity.API.Models.User;
    using Sharebook.Identity.API.Models.User.Birthdate;
    using Sharebook.Identity.API.Services;

    /// <summary>
    /// This sample controller implements a typical login/logout/provision workflow for local accounts.
    /// The login service encapsulates the interactions with the user data store. This data store is in-memory only and cannot be used for production!
    /// The interaction service provides a way for the UI to communicate with identityserver for validation and context retrieval
    /// </summary>
    public class AccountController : Controller
    {
        //private readonly InMemoryUserLoginService _loginService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ILoginService<ApplicationUser> loginService;
        private readonly IIdentityServerInteractionService interaction;
        private readonly IClientStore clientStore;
        private readonly IConfiguration configuration;

        public AccountController(
            //InMemoryUserLoginService loginService,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILoginService<ApplicationUser> loginService,
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.loginService = loginService;
            this.interaction = interaction;
            this.clientStore = clientStore;
            this.configuration = configuration;
        }

        /// <summary>
        /// Show login page
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            var context = await this.interaction.GetAuthorizationContextAsync(returnUrl);
            if (context?.IdP != null)
            {
                throw new NotImplementedException("External login is not implemented!");
            }

            var vm = await BuildLoginViewModelAsync(returnUrl, context);

            ViewData["ReturnUrl"] = returnUrl;
            return View(vm);
        }

        /// <summary>
        /// Handle postback from username/password login
        /// </summary>
        [HttpPost]
        // [ValidateAntiForgeryToken]
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

        private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl, AuthorizationRequest context)
        {
            var allowLocal = true;
            if (context?.Client.ClientId != null) // TODO: BUUUUUUG!! 🐛
            {
                var client = await this.clientStore.FindEnabledClientByIdAsync(context?.Client.ClientId); // TODO: BUUUUUUG!! 🐛
                if (client != null)
                {
                    allowLocal = client.EnableLocalLogin;
                }
            }

            var externalProviders = await this.signInManager.GetExternalAuthenticationSchemesAsync();

            return new LoginViewModel
            {
                ReturnUrl = returnUrl,
                Email = context?.LoginHint,
                ExternalProviders = externalProviders,
            };
        }

        private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginViewModel model)
        {
            var context = await this.interaction.GetAuthorizationContextAsync(model.ReturnUrl);
            var vm = await BuildLoginViewModelAsync(model.ReturnUrl, context);
            vm.Email = model.Email;
            vm.RememberMe = model.RememberMe;
            return vm;
        }

        /// <summary>
        /// Show logout page
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            if (User.Identity.IsAuthenticated == false)
            {
                // if the user is not authenticated, then just show logged out page
                return await Logout(new LogoutViewModel { LogoutId = logoutId });
            }

            //Test for Xamarin. 
            var context = await this.interaction.GetLogoutContextAsync(logoutId);
            if (context?.ShowSignoutPrompt == false)
            {
                //it's safe to automatically sign-out
                return await Logout(new LogoutViewModel { LogoutId = logoutId });
            }

            // show the logout prompt. this prevents attacks where the user
            // is automatically signed out by another malicious web page.
            var vm = new LogoutViewModel
            {
                LogoutId = logoutId
            };
            return View(vm);
        }

        /// <summary>
        /// Handle logout page postback
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(LogoutViewModel model)
        {
            var idp = this.User?.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;

            if (idp != null && idp != IdentityServerConstants.LocalIdentityProvider)
            {
                if (model.LogoutId == null)
                {
                    // if there's no current logout context, we need to create one
                    // this captures necessary info from the current logged in user
                    // before we signout and redirect away to the external IdP for signout
                    model.LogoutId = await this.interaction.CreateLogoutContextAsync();
                }

                string url = "/Account/Logout?logoutId=" + model.LogoutId;

                try
                {

                    // hack: try/catch to handle social providers that throw
                    await HttpContext.SignOutAsync(idp, new AuthenticationProperties
                    {
                        RedirectUri = url
                    });
                }
                catch (Exception ex)
                {
                    //_logger.LogError(ex, "LOGOUT ERROR: {ExceptionMessage}", ex.Message);
                    Console.WriteLine("LOGOUT ERROR: {ExceptionMessage}", ex.Message);
                }
            }

            // delete authentication cookie
            await HttpContext.SignOutAsync();

            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            // set this so UI rendering sees an anonymous user
            HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity());

            // get context information (client name, post logout redirect URI and iframe for federated signout)
            var logout = await this.interaction.GetLogoutContextAsync(model.LogoutId);

            return Redirect(logout?.PostLogoutRedirectUri);
        }

        public async Task<IActionResult> DeviceLogOut(string redirectUrl)
        {
            // delete authentication cookie
            await HttpContext.SignOutAsync();

            // set this so UI rendering sees an anonymous user
            HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity());

            return Redirect(redirectUrl);
        }

        // GET: /Account/Register
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register(string returnUrl = null)
        {
            var registerViewModel = new RegisterViewModel();

            ViewData["ReturnUrl"] = returnUrl;
            return View(registerViewModel);
        }

        
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                { 
                    Name = model.User.Name,
                    UserName = model.User.Name,
                    ScreenName = model.User.Name,
                    Email = model.Email,
                    Gender = model.Gender,
                    CanMediaTag = true,
                    CreatedOn = DateTime.UtcNow,
                    DefaultProfileImage = true,
                    DefaultProfile = true,
                    Description = model.User.Description,
                    Month = model.Birthdate.Month,
                    Day = model.Birthdate.Day,
                    Year = model.Birthdate.Year,
                    Visibility = model.Birthdate.Visibility.ToString(),
                    VisibilityYear = model.Birthdate.VisibilityYear.ToString(),
                };

                var birthday = DateTime.ParseExact($"{model.Birthdate.Month}/{model.Birthdate.Day}/{model.Birthdate.Year} 00:00", "M/d/yyyy hh:mm", CultureInfo.InvariantCulture);
                var age = Calculator.Age(birthday);
                if (age.HasValue)
                {
                    user.Age = (int)age;
                }

                var result = await this.userManager.CreateAsync(user, model.Password);
                if (result.Errors.Count() > 0)
                {
                    AddErrors(result);
                    // If we got this far, something failed, redisplay form
                    return View(model);
                }
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
                    return View(model);
            }

            return RedirectToAction("index", "home");
        }

        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            var redirectUri = this.Url
                .Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });

            var properties = this.signInManager
                .ConfigureExternalAuthenticationProperties(provider, redirectUri);

            return Challenge(properties, provider);
        }

        public async Task<IActionResult> ExternalLoginCallback(string returnUrl)
        {
            var info = await this.signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction("Login");

            }

            var result = await this.signInManager
                .ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);

            if (result.Succeeded)
            {
                return Redirect(returnUrl);
            }

            var username = info.Principal.FindFirst(ClaimTypes.Name.Replace(" ", "_")).Value;

            var email = info.Principal.FindFirst(ClaimTypes.Email.Replace(" ", "_")).Value;

            return View("ExternalRegister", new ExternalRegisterViewModel
            {
                UserName = username,
                Email = email,
                ReturnUrl = returnUrl
            });
        }

        public async Task<IActionResult> ExternalRegister(ExternalRegisterViewModel model)
        {
            var info = await this.signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction("Login");
            }

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                Name = "ExternalRegisterNameMagicString",
            };

            var result = await this.userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return View(model);
            }

            result = await this.userManager.AddLoginAsync(user, info);

            if (!result.Succeeded)
            {
                return View(model);
            }

            await this.signInManager.SignInAsync(user, false);

            return Redirect(model.ReturnUrl);
        }

        [HttpGet]
        public IActionResult Redirecting()
        {
            return View();
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
