namespace WorldFeed.AccountSettings.Controllers
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;
    using WorldFeed.Common.Web;

    public interface IAccountSettingsController
    {
        Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IAccountSettingsDTO>> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UpdateProfileAsync(IUpdateProfileParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters, ITwitterRequest request);
    }
}
