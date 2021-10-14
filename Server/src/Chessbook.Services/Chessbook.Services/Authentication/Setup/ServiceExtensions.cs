using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace Chessbook.Web.Api.Setup
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services, string origin = null)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        //builder.AllowAnyMethod()
                        //    .AllowAnyHeader()
                        //    .AllowCredentials();

                        //if (string.IsNullOrEmpty(origin))
                        //{
                        //    builder.AllowAnyOrigin();
                        //}
                        //else
                        //{
                        //   // builder.WithOrigins(origin);
                        //}

                        builder
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .SetIsOriginAllowed((host) => true)
                       .AllowCredentials();

                    });
            });
        }

        public static void UseCentralRoutePrefix(this MvcOptions opts, IRouteTemplateProvider routeAttribute)
        {
            opts.Conventions.Insert(0, new CentralizedPrefixConvention(routeAttribute));
        }
    }
}
