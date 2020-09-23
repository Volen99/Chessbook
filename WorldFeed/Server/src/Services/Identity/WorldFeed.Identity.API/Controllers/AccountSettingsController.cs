namespace WorldFeed.Identity.API.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Identity.API.Application.Parameters;
    using WorldFeed.Identity.API.Application.QueryExecutors;
    using WorldFeed.Identity.API.Application.Requesters;
    using WorldFeed.Identity.API.Application.Web;
    using WorldFeed.Identity.API.DTO;

    public interface IAccountSettingsController
    {
        Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IAccountSettingsDTO>> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UpdateProfileAsync(IUpdateProfileParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters, ITwitterRequest request);
    }

    public class AccountSettingsController : ControllerBase, IAccountSettingsController
    {
        private readonly IAccountSettingsQueryExecutor accountSettingsQueryExecutor;

        public AccountSettingsController(IAccountSettingsQueryExecutor accountSettingsQueryExecutor)
        {
            this.accountSettingsQueryExecutor = accountSettingsQueryExecutor;
        }

        public Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters, ITwitterRequest request)
        {
            var res = this.accountSettingsQueryExecutor.GetAccountSettingsAsync(parameters, request);

            var test = res.Result;

            return res;
        }

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
