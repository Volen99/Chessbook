namespace WorldFeed.Identity.API.Services
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Identity;

    using WorldFeed.Identity.Domain.AggregatesModel.UserAggregate;

    public class EFLoginService : ILoginService<User>
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;

        public EFLoginService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<User> FindByUsername(string user)
        {
            return await this.userManager.FindByEmailAsync(user);
        }

        public async Task<bool> ValidateCredentials(User user, string password)
        {
            return await this.userManager.CheckPasswordAsync(user, password);
        }

        public Task SignIn(User user)
        {
            return this.signInManager.SignInAsync(user, true);
        }

        public Task SignInAsync(User user, AuthenticationProperties properties, string authenticationMethod = null)
        {
            return this.signInManager.SignInAsync(user, properties, authenticationMethod);
        }
    }
}
