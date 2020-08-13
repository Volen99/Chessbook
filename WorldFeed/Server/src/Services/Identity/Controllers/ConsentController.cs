namespace WorldFeed.Identity.API.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using IdentityServer4.Models;
    using IdentityServer4.Services;
    using IdentityServer4.Stores;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using WorldFeed.Identity.API.Models.AccountViewModels;

    /// <summary>
    /// This controller implements the consent logic
    /// </summary>
    public class ConsentController : Controller
    {
        private readonly ILogger<ConsentController> _logger;
        private readonly IClientStore clientStore;
        private readonly IResourceStore resourceStore;
        private readonly IIdentityServerInteractionService interaction;

        
        public ConsentController(
            ILogger<ConsentController> logger,
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IResourceStore resourceStore)
        {
            _logger = logger;
            this.interaction = interaction;
            this.clientStore = clientStore;
            this.resourceStore = resourceStore;
        }

        /// <summary>
        /// Shows the consent screen
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Index(string returnUrl)
        {
            ConsentViewModel vm = await BuildViewModelAsync(returnUrl);
            ViewData["ReturnUrl"] = returnUrl;
            if (vm != null)
            {
                return View("Index", vm);
            }

            return View("Error");
        }

        /// <summary>
        /// Handles the consent screen postback
        /// </summary>
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(ConsentInputModel model)
        {
            // parse the return URL back to an AuthorizeRequest object
            var request = await this.interaction.GetAuthorizationContextAsync(model.ReturnUrl);
            ConsentResponse response = null;

            // user clicked 'no' - send back the standard 'access_denied' response
            if (model.Button == "no")
            {
                // response = ConsentResponse.Denied;
                response = new ConsentResponse { Error = AuthorizationError.AccessDenied }; // TODO: BUG!!!
            }
            // user clicked 'yes' - validate the data
            else if (model.Button == "yes" && model != null)
            {
                // if the user consented to some scope, build the response model
                if (model.ScopesConsented != null && model.ScopesConsented.Any())
                {
                    response = new ConsentResponse
                    {
                        RememberConsent = model.RememberConsent,
                        ScopesValuesConsented = model.ScopesConsented // ScopesValuesConsented was ScopesConsented
                    };
                }
                else
                {
                    ModelState.AddModelError("", "You must pick at least one permission.");
                }
            }
            else
            {
                ModelState.AddModelError("", "Invalid Selection");
            }

            if (response != null)
            {
                // communicate outcome of consent back to identityserver
                await this.interaction.GrantConsentAsync(request, response);

                // redirect back to authorization endpoint
                return Redirect(model.ReturnUrl);
            }

            var vm = await BuildViewModelAsync(model.ReturnUrl, model);
            if (vm != null)
            {
                return View("Index", vm);
            }

            return View("Error");
        }

        async Task<ConsentViewModel> BuildViewModelAsync(string returnUrl, ConsentInputModel model = null)
        {
            // https://identityserver4.readthedocs.io/en/latest/reference/interactionservice.html#authorizationrequest
            AuthorizationRequest request = await this.interaction.GetAuthorizationContextAsync(returnUrl);
            if (request != null)
            {
                var client = await this.clientStore.FindEnabledClientByIdAsync(request.Client.ClientId); // TODO: THIS IS BUGGY!!!
                if (client != null)
                {
                    var enabledResources = (await this.resourceStore.GetAllEnabledResourcesAsync()).ApiScopes.Select(x => x.Name); // no way...
                    var resources = await this.resourceStore.FindEnabledResourcesByScopeAsync(enabledResources);
                    if (resources != null && (resources.IdentityResources.Any() || resources.ApiResources.Any()))
                    {
                        return new ConsentViewModel(model, returnUrl, request, client, resources);
                    }
                    else
                    {
                        _logger.LogError("No scopes matching: {0}", enabledResources.Aggregate((x, y) => x + ", " + y)); // request.ScopesRequested.
                    }
                }
                else
                {
                    _logger.LogError("Invalid client id: {0}", request.Client.ClientId); // TODO: THIS IS BUGGY!!!
                }
            }
            else
            {
                _logger.LogError("No consent request matching request: {0}", returnUrl);
            }

            return null;
        }
    }
}
