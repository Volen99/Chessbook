namespace WorldFeed.Identity.Services.Identity
{
    using System.Threading.Tasks;
    using WorldFeed.Services;
    using Models.Identity;
    using WorldFeed.Common.Models;

    public interface IIdentityService
    {
        Task<Result<ApplicationUser>> Register(UserLoginRequestModel userInput);

        Task<Result<ApplicationUser>> Login(UserLoginRequestModel userInput);

        Task<Result> ChangePassword(string userId, ChangePasswordInputModel changePasswordInput);
    }
}
