namespace Sharebook.Post.Application.Common.Interfaces
{
    using System.Threading.Tasks;

    using Sharebook.Upload.Application.Common.Models;

    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}
