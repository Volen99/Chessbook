namespace WorldFeed.Identity.Infrastructure
{
    using Data;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;
    using WorldFeed.Common.Models;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddUserStorage(
            this IServiceCollection services)
        {
            services
                .AddIdentity<ApplicationUser, IdentityRole>(options =>
                    {
                        options.Password.RequiredLength = 6;
                        options.Password.RequireDigit = false;
                        options.Password.RequireLowercase = false;
                        options.Password.RequireNonAlphanumeric = false;
                        options.Password.RequireUppercase = false;
                    })
                    .AddEntityFrameworkStores<IdentityDbContext>();

            return services;
        }
    }
}
