namespace WorldFeed.Upload.Application.Common.Interfaces
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Application.Common.Models;

    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}
