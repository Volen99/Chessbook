


//using Microsoft.Extensions.DependencyInjection;
//using Chessbook.Data.Models;
//using Chessbook.DIContainerCore;
//using Chessbook.Services.Data.Services;
//using Chessbook.Web.Api.Identity;
//using Chessbook.Services.Authentication;

//namespace Chessbook.Web.Api.Setup
//{
//    public class DependenciesConfig
//    {
//        public static void ConfigureDependencies(IServiceCollection services, string connectionString)
//        {
//            services.AddHttpContextAccessor();

//            // services.AddScoped<ICurrentContextProvider, CurrentContextProvider>();

//            services.AddSingleton<JwtManager>();

//            ContainerExtension.Initialize(services, connectionString);

//            // services.AddTransient<IAuthenticationService, AuthenticationService<Customer>>();
//            services.AddTransient<IRoleService, RoleService<Customer, Role>>();
//        }
//    }
//}
