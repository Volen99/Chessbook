namespace WorldFeed.Identity.Services.Identity
{
    using System.Threading.Tasks;
    using WorldFeed.Services;
    using Data.Models;
    using Models.Identity;
    using WorldFeed.Common.Models;

    public interface IIdentityService
    {
        Task<Result<User>> Register(UserLoginRequestModel userInput);

        Task<Result<User>> Login(UserLoginRequestModel userInput);

        Task<Result> ChangePassword(string userId, ChangePasswordInputModel changePasswordInput);
    }
}
