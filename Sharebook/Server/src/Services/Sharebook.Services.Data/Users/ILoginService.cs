namespace Sharebook.Services.Data.Users
{
    using Microsoft.AspNetCore.Authentication;
    using System.Threading.Tasks;

    public interface ILoginService<T>
    {
        Task<bool> ValidateCredentials(T user, string password);

        Task<T> FindByUsername(string user);

        Task SignIn(T user);

        Task SignInAsync(T user, AuthenticationProperties properties, string authenticationMethod = null);
    }
}
