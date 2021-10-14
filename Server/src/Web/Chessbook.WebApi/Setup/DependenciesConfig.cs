using Microsoft.Extensions.DependencyInjection;

namespace Chessbook.Web.Api.Setup
{
    public class DependenciesConfig
    {
        public static void ConfigureDependencies(IServiceCollection services, string connectionString)
        {
            services.AddHttpContextAccessor();
            services.AddSingleton<JwtManager>();
        }
    }
}
