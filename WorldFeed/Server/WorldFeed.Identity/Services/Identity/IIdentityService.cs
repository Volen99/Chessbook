namespace WorldFeed.Identity.Services.Identity
{
    using System.Threading.Tasks;
    using WorldFeed.Services;
    using Data.Models;
    using Models.Identity;

    public interface IIdentityService
    {
        Task<Result<User>> Register(UserInputModel userInput);

        Task<Result<UserOutputModel>> Login(UserInputModel userInput);

        Task<Result> ChangePassword(string userId, ChangePasswordInputModel changePasswordInput);
    }
}
