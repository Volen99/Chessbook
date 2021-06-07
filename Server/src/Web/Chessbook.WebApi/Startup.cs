namespace Chessbook.Web.Api
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.Hosting;
    using Newtonsoft.Json.Converters;
    using Newtonsoft.Json.Serialization;

    using Chessbook.Data;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Api.Setup;
    using Chessbook.Web.Models;
    using System.IO;
    using System.Reflection;
    using AutoMapperConfiguration = AutoMapper.Configuration;
    using Chessbook.Web.Api.Factories;
    using Nop.Web.Framework.Infrastructure.Extensions;
    using Ordering.SignalrHub;

    public class Startup
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
        }

        protected IConfiguration Configuration { get; }

        protected void ConfigureDependencies(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            DependenciesConfig.ConfigureDependencies(services, connectionString);
        }

        protected void ConfigureIdentity(IServiceCollection services)
        {
            IdentityConfig.Configure(services);
        }

        protected void ConfigureMapping(AutoMapperConfiguration.MapperConfigurationExpression config)
        {
            AutoMapperConfigAdmin.Configure(config);
        }

        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureApplicationServices(Configuration, _webHostEnvironment);

            ConfigureIdentity(services);
            services.ConfigureAuth(Configuration);
            ConfigureDependencies(services);
            // RegisterMapping();

            services.ConfigureSwagger();

            services.ConfigureCors();

            services.AddAuthorization(opt => opt.RegisterPolicies());

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });

            services
                .AddControllers(opt =>
                {
                    opt.UseCentralRoutePrefix(new RouteAttribute("api"));
                })
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.Converters.Add(new StringEnumConverter { NamingStrategy = new CamelCaseNamingStrategy() });
                    options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                });
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env) // IDataBaseInitializer dataBaseInitializer
        {
            app.ConfigureRequestPipeline();
            app.StartEngine();

            // AutoMapperConfig.RegisterMappings(typeof(SettingsDTO).GetTypeInfo().Assembly);

            //if (dataBaseInitializer != null)
            //{
            //    dataBaseInitializer.Initialize();
            //}
            //else
            //{
            //    // TODO: add logging
            //}

            if (!env.IsDevelopment())
            {
                app.UseHsts();
            }

            app.UseRouting();

           /*app.UseCors("CorsPolicy"); was here!!!! */

            app.UseHttpsRedirection();

            //  app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.ContentRootPath, "wwwroot/images")),
                RequestPath = "/images"
            });


            app.UseCors("CorsPolicy");

            app.UseMiddleware<ErrorHandlingMiddleware>();

            // app.UseConfiguredSwagger();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotificationsHub>("/notificationhub");
                endpoints.MapControllers();
            });
        }

        private void RegisterMapping()
        {
            var config = new AutoMapperConfiguration.MapperConfigurationExpression();
            AutoMapperConfigAdmin.Configure(config);
            ConfigureMapping(config);
            // AutoMapper.Mapper.Initialize(config);
        }
    }
}
