namespace WorldFeed.AccountSettings.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    using WorldFeed.AccountSettings.IntegrationEvents.Events;
    using WorldFeed.AccountSettings.Services;
    using WorldFeed.BuildingBlocks.EventBus.Abstractions;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;
    using WorldFeed.Common.Web;

    public class AccountSettingsController : ControllerBase
    {
        private readonly IAccountSettingsQueryExecutor accountSettingsQueryExecutor;
        private readonly ITwitterClient client;
        private readonly ILogger<AccountSettingsController> logger;
        private readonly IEventBus eventBus;
        private readonly IIdentityService identityService;
        private readonly IAccountSettingsSerivce accountSettingsSerivce;

        public AccountSettingsController(IIdentityService identityService, ILogger<AccountSettingsController> logger, IAccountSettingsSerivce accountSettingsSerivce)
        {
            this.logger = logger;
            this.identityService = identityService;
            this.client = new TwitterClient("", "");
            this.accountSettingsSerivce = accountSettingsSerivce;
        }

        [HttpGet]
        [Route("Account/Settings")]
        public async Task<IAccountSettingsDTO> GetAccountSettingsAsync()
        {
            var userId = this.identityService.GetUserIdentity();

            var accountSettings = await this.accountSettingsSerivce.GetAccountSettingsAsync(userId);

            return accountSettings;
        }

        [HttpPost]
        [Route("Account/Settings")]
        public Task<IAccountSettingsDTO> UpdateAccountSettingsAsync(TwitterRequest request, [FromQuery] int? lang = null,
            [FromQuery] string? time_zone = null)
        {
            var userId = this.identityService.GetUserIdentity();

            var query = this.Request.Query.ToDictionary(x => x.Key, x => x.Value);

            var eventMessage = new UserAccountSettingsUpdatedIntegrationEvent(userId, time_zone, lang, null, null, null);

            try
            {
                this.eventBus.Publish(eventMessage);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "ERROR Publishing integration event: {IntegrationEventId} from {AppName}", eventMessage.Id, Program.AppName);

                throw;
            }

            return default;
        }

        public Task<ITwitterResult<IUserDTO>> UpdateProfileAsync(IUpdateProfileParameters parameters, ITwitterRequest request)
        {
            return this.accountSettingsQueryExecutor.UpdateProfileAsync(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO>> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters, ITwitterRequest request)
        {
            return this.accountSettingsQueryExecutor.UpdateProfileImageAsync(parameters, request);
        }

        public Task<ITwitterResult> UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters, ITwitterRequest request)
        {
            return this.accountSettingsQueryExecutor.UpdateProfileBannerAsync(parameters, request);
        }

        public Task<ITwitterResult> RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters, ITwitterRequest request)
        {
            return this.accountSettingsQueryExecutor.RemoveProfileBannerAsync(parameters, request);
        }
    }
}
