namespace Chessbook.Web.Api
{
    using System;
    using System.IO;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.Hosting;
    using Microsoft.AspNetCore.ResponseCompression;
    using Microsoft.Net.Http.Headers;
    using Newtonsoft.Json.Converters;
    using Newtonsoft.Json.Serialization;
    using AutoMapperConfiguration = AutoMapper.Configuration;

    using Ordering.SignalrHub;
    using Chessbook.Web.Api.Setup;
    using Chessbook.Web.Framework.Infrastructure.Extensions;
    using Chessbook.Common.Feedback;

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

            services.AddResponseCompression(options =>
            {
                options.Providers.Add<BrotliCompressionProvider>();
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = true;
                options.MimeTypes = new[]
                {
                    // Default
                    "text/plain",
                    "text/css",
                    "application/javascript",
                    "text/html",
                    "application/xml",
                    "text/xml",
                    "application/json",
                    "text/json",

                    // Custom
                    "image/svg+xml",
                    "application/font-woff2",
                };
            });

            ConfigureIdentity(services);
            services.ConfigureAuth(Configuration);
            ConfigureDependencies(services);

            services.ConfigureCors();

            services.AddAuthorization(); // opt => opt.RegisterPolicies()

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


            // Using Options pattern to configure services
            services.Configure<FeedbackFormSettings>(Configuration.GetSection("FeedbackFormSettings"));
        }

        /// <summary>
        /// Configure the application HTTP request pipeline
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public void Configure(IApplicationBuilder app, IHostEnvironment env) // IDataBaseInitializer dataBaseInitializer
        {
            app.ConfigureRequestPipeline();
            app.StartEngine();

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

            // app.UseCors();

           /*app.UseCors("CorsPolicy"); was here!!!! */

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseResponseCompression();

            app.UseStaticFiles(new StaticFileOptions()
            {
                RequestPath = "/images",
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "wwwroot/images")),
            });

            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    // Check if the file is hashed, e.g. [filename].[20 chars hash].js
                    if (ctx.File.Name.Length > 24 && ctx.File.Name[^24] == '.' && ctx.File.Name.EndsWith(".js", StringComparison.InvariantCulture))
                    {
                        const int durationInSeconds = 60 * 60 * 24 * 14;  // 14 days
                        ctx.Context.Response.Headers[HeaderNames.CacheControl] = "public, immutable, max-age=" + durationInSeconds;
                    }
                    else if (ctx.File.Name.EndsWith(".svg", StringComparison.InvariantCulture) || ctx.File.Name.EndsWith(".png", StringComparison.InvariantCulture))
                    {
                        const int durationInSeconds = 60 * 60;  // 1 hour
                        ctx.Context.Response.Headers[HeaderNames.CacheControl] = "public,max-age=" + durationInSeconds;
                    }
                },
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotificationsHub>("/notificationhub");
                endpoints.MapControllers();
            });
        }
    }
}
