using Microsoft.AspNetCore.Identity;

namespace WorldFeed.Programming.Quiz.Data
{
    public static class IdentityOptionsProvider
    {
        public static void GetIdentityOptions(IdentityOptions options)
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequiredLength = 6;
            options.Lockout.MaxFailedAccessAttempts = 6;

            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Lockout.AllowedForNewUsers = false;
        }
    }
}
