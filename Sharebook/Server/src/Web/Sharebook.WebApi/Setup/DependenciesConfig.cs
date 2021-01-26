


using Microsoft.Extensions.DependencyInjection;
using Sharebook.Data.Models;
using Sharebook.DIContainerCore;
using Sharebook.Services.Data.Services;
using Sharebook.Web.Api.Identity;
using Sharebook.Web.Api.Interfaces;

namespace Sharebook.Web.Api.Setup
{
    public class DependenciesConfig
    {
        public static void ConfigureDependencies(IServiceCollection services, string connectionString)
        {
            services.AddHttpContextAccessor();

            services.AddScoped<ICurrentContextProvider, CurrentContextProvider>();

            services.AddSingleton<JwtManager>();

            ContainerExtension.Initialize(services, connectionString);

            services.AddTransient<IAuthenticationService, AuthenticationService<User>>();
            services.AddTransient<IRoleService, RoleService<User, Role>>();
        }
    }
}
