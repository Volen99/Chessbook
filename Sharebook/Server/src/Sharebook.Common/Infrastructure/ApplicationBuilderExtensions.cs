namespace Sharebook.Common.Infrastructure
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    using Sharebook.Services;

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseWebService(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app
                .UseHttpsRedirection()
                .UseRouting()
                .UseCors(options => options
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod())
                .UseAuthentication() // adds the authentication middleware to the pipeline so authentication will be performed automatically on every call into the host
                .UseAuthorization()  // adds the authorization middleware to make sure, our API endpoint cannot be accessed by anonymous clients
                .UseEndpoints(endpoints =>
                {
                    //endpoints.MapHealthChecks("/health", new HealthCheckOptions
                    //{
                    //    Predicate = _ => true,
                    //    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                    //});

                    //endpoints.MapHealthChecks("/liveness", new HealthCheckOptions // from eShop
                    //{
                    //    Predicate = r => r.Name.Contains("self")
                    //});

                    endpoints.MapControllers();
                });

            return app;
        }

        public static IApplicationBuilder Initialize(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var serviceProvider = serviceScope.ServiceProvider;

            var db = serviceProvider.GetRequiredService<DbContext>();

            db.Database.Migrate();

            var seeders = serviceProvider.GetServices<IDataSeeder>();

            foreach (var seeder in seeders)
            {
                seeder.SeedData();
            }

            return app;
        }
    }
}
