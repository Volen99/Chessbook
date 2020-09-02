namespace WorldFeed.AccountSettings.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.IO;
    using System.Threading.Tasks;

    using WorldFeed.AccountSettings.Services;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;
    using WorldFeed.Common.Web;

    public class AccountSettingsController : ControllerBase
    {
        private readonly IAccountSettingsQueryExecutor accountSettingsQueryExecutor;
        private readonly ITwitterClient client;

        public AccountSettingsController()
        {
            this.client = new TwitterClient("", "");
        }

        [HttpGet]
        [Route("Account/Settings")]
        public async Task<IAccountSettingsDTO> GetAccountSettingsAsync()
        {
            var result = await this.client.AccountSettings.GetAccountSettingsAsync();

            return result.AccountSettingsDTO;
        }

        [HttpPost]
        [Route("Account/Settings")]
        public Task<IAccountSettingsDTO> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters, ITwitterRequest request)
        {
            var query = this.Request.Query;
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
