namespace WorldFeed.Account.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;
    using WorldFeed.Common.Web;
    using WorldFeed.Controllers.AccountSettings;

    public class AccountSettingsController : ControllerBase, IAccountSettingsController
    {
        private readonly IAccountSettingsQueryExecutor accountSettingsQueryExecutor;

        public AccountSettingsController()
        {
            var client = new TwitterClient("", "");

            this.accountSettingsQueryExecutor = TweetinviContainer.Resolve<IAccountSettingsQueryExecutor>();
            client.AccountSettings.GetAccountSettingsAsync();
        }

        [Route("Account/Settings")]
        [HttpGet]
        public Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters, ITwitterRequest request)
        {
            return this.accountSettingsQueryExecutor.GetAccountSettingsAsync(parameters, request);
        }

        //public Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters, ITwitterRequest request)
        //{
        //    return this.accountSettingsQueryExecutor.GetAccountSettingsAsync(parameters, request);
        //}

        public Task<ITwitterResult<IAccountSettingsDTO>> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters, ITwitterRequest request)
        {
            return this.accountSettingsQueryExecutor.UpdateAccountSettingsAsync(parameters, request);
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
