namespace Chessbook.Web.Api.Setup
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;

    using Chessbook.Data.Models;

    public static class IdentityConfig
    {
        public static void Configure(IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequiredLength = 4;
                options.User.RequireUniqueEmail = true;
            });

            services.AddTransient<IPasswordHasher<Customer>, PasswordHasher<Customer>>();
            services.AddTransient<ILookupNormalizer, UpperInvariantLookupNormalizer>();
            services.AddTransient<IdentityErrorDescriber>();

            //services.AddTransient<IRoleStore<Role>, RoleStore<Role>>();
            //services.AddTransient<IUserStore<User>, UserStore<User, Role, UserRole, UserClaim>>();
            // services.AddTransient<UserManager<Customer>, ApplicationUserManager>();

            var identityBuilder = new IdentityBuilder(typeof(Customer), typeof(Customer), services);
            identityBuilder.AddDefaultTokenProviders();
        }
    }
}
