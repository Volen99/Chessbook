namespace Chessbook.Web.Api.Identity
{
    using Microsoft.AspNetCore.Authorization;

    public static class BasePoliciesConfig
    {
        public static void RegisterPolicies(this AuthorizationOptions opt)
        {
            opt.AddPolicy("AdminOnly", policy => policy.RequireRole(Roles.Admin));
        }
    }
}
