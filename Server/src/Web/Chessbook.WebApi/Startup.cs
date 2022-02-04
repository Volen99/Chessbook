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
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using Newtonsoft.Json.Serialization;
    using AutoMapperConfiguration = AutoMapper.Configuration;

    using Ordering.SignalrHub;
    using Chessbook.Web.Api.Setup;
    using Chessbook.Web.Framework.Infrastructure.Extensions;
    using Chessbook.Common.Feedback;
    using Chessbook.Services;
    using Chessbook.Services.Options;
    using Chessbook.Common;
    using Microsoft.AspNetCore.Cors.Infrastructure;

    public class Startup
    {
        private readonly IWebHostEnvironment env;
        private bool isEmbedded;

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            this.env = webHostEnvironment;
            this.LoadFrontendConfiguration();

            // Prevent Newtonsoft JSON from mangling dates https://github.com/JamesNK/Newtonsoft.Json/issues/862
            JsonConvert.DefaultSettings = () => JsonSettings.GlobalJsonSettings;
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

        //protected void ConfigureMapping(AutoMapperConfiguration.MapperConfigurationExpression config)
        //{
        //    AutoMapperConfigAdmin.Configure(config);
        //}

        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureApplicationServices(Configuration, env);

            // Using Options pattern to configure services
            services.Configure<FeedbackFormSettings>(Configuration.GetSection("FeedbackFormSettings"));
            services.Configure<FrontendOptions>(Configuration.GetSection("FrontendOptions"));

            this.ConfigureCors(services);

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
        public void Configure(IApplicationBuilder app) // IDataBaseInitializer dataBaseInitializer
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

            if (this.env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();

                // Don't perform https redirection in the app because it messes up the health checks
                // app.UseHttpsRedirection();
            }

            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseResponseCompression();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotificationsHub>("/notificationhub");
                endpoints.MapControllers();
            });

            // Catch - all middleware for Single Page App
            app.Use(async (context, next) =>
            {
                // Yield to attempt a search in the static files
                await next();

                // If it didn't find a hit serve the SPA index file (except for /api routes)
                if (!context.Response.HasStarted && context.Response.StatusCode == 404 && !context.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase))
                {
                    var frontendConfigService = app.ApplicationServices.GetService<IFrontendConfigService>();
                    string indexContent = frontendConfigService.GetConfiguredIndexContent(this.env.WebRootPath);
                    if (!string.IsNullOrEmpty(indexContent))
                    {
                        context.Response.StatusCode = 200;
                        context.Response.ContentType = "text/html";
                        await context.Response.WriteAsync(indexContent);
                    }
                }
            });

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

           
        }

        private void LoadFrontendConfiguration()
        {
            try
            {
                var frontendSection = Configuration.GetSection("FrontendOptions");
                this.isEmbedded = frontendSection.GetValue<bool>("IsEmbedded");
            }
            catch
            {
                this.isEmbedded = false;
            }
        }

        private void ConfigureCors(IServiceCollection services)
        {
            var policy = Configuration.GetSection("CorsPolicy").Get<CorsPolicy>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy);
            });
        }

        /**
          * Adds the required SignalR acess token.
          */
        //private void AddSignalRAccessToken(Microsoft.AspNetCore.Authentication.JwtBearer.MessageReceivedContext context)
        //{
        //    // Sending the access token in the query string is required due to
        //    // a limitation in Browser APIs. We restrict it to only calls to the
        //    // SignalR hub in this code.
        //    // See https://docs.microsoft.com/aspnet/core/signalr/security#access-token-logging
        //    // for more information about security considerations when using
        //    // the query string to transmit the access token.
        //    var accessToken = context.Request.Query["access_token"];

        //    // If the request is for our hub...
        //    var path = context.HttpContext.Request.Path;
        //    if (!string.IsNullOrEmpty(accessToken) &&
        //        path.StartsWithSegments(RealtimeHub.HubEndpoint, System.StringComparison.OrdinalIgnoreCase))
        //    {
        //        // Read the token out of the query string
        //        context.Token = accessToken;
        //    }
        //}
    }
}
