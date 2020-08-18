namespace WorldFeed.WebSPA
{
    using System;
    using System.IO;
    using StackExchange.Redis;
    using Microsoft.AspNetCore.Antiforgery;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Diagnostics.HealthChecks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Diagnostics.HealthChecks;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using HealthChecks.UI.Client;

    using global::WebSPA.Infrastructure;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Authentication;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
         

        public IConfiguration Configuration { get; }

        public Startup()
        {
            var localPath = new Uri(Configuration["ASPNETCORE_URLS"])?.LocalPath ?? "/";
            Configuration["BaseUrl"] = localPath;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
               .AddAuthentication(config =>
               {
                   config.DefaultScheme = "WebClientCookie";    // the local cookie we set up to store the tokens

                   // What scheme to use for authorization.
                   config.DefaultChallengeScheme = "oidc";
               })
               .AddCookie("WebClientCookie")
               .AddOpenIdConnect("oidc", config =>
               {
                   config.Authority = "https://localhost:5001";          // Gets or sets the Authority to use when making OpenIdConnect calls

                   config.ClientId = "js";
                   config.ClientSecret = "What did Apollo 11 discover during lost two minutes of SILENCE?";

                    // Stores the tokens in the cookie after retrieval.
                    config.SaveTokens = true;

                   config.ResponseType = "code";

                   //// Smaller ID token, two trips to Identity Server.
                   config.GetClaimsFromUserInfoEndpoint = true;

                   //// Maps the user information to claims. You can also delete claims.
                   //config.ClaimActions.MapUniqueJsonKey("car", "WorldFeed.Car");

                   //// Adds custom claim scope. You can also remove the default scopes (note that "openid" is required).
                   //config.Scope.Add("worldfeed");

                   //// Allows refresh tokens
                   //config.Scope.Add("offline_access");
               });

            RegisterAppInsights(services);

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddHealthChecks()
                .AddCheck("self", () => HealthCheckResult.Healthy())
                .AddUrlGroup(new Uri(Configuration["IdentityUrlHC"]), name: "identityapi-check", tags: new string[] { "identityapi" });

            services.Configure<AppSettings>(Configuration);

            if (Configuration.GetValue<string>("IsClusterEnv") == bool.TrueString)
            {
                services.AddDataProtection(opts =>
                {
                    opts.ApplicationDiscriminator = "worldfeed.webspa";
                })
                .PersistKeysToRedis(ConnectionMultiplexer.Connect(Configuration["DPConnectionString"]), "DataProtection-Keys");
            }

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                });

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, IAntiforgery antiforgery)
        {
            loggerFactory.AddApplicationInsights(app.ApplicationServices, LogLevel.Trace);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            // Configure XSRF middleware, This pattern is for SPA style applications where XSRF token is added on Index page 
            // load and passed back token on every subsequent async request            
             app.Use(async (context, next) =>
             {
                 if (string.Equals(context.Request.Path.Value, "/", StringComparison.OrdinalIgnoreCase))
                 {
                     var tokens = antiforgery.GetAndStoreTokens(context);
                     context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false });
                 }
                 await next.Invoke();
             });

            // Seed Data
            WebContextSeed.Seed(app, env, loggerFactory);

            var pathBase = Configuration["PATH_BASE"];

            if (!string.IsNullOrEmpty(pathBase))
            {
                loggerFactory.CreateLogger<Startup>().LogDebug("Using PATH BASE '{pathBase}'", pathBase);
                app.UsePathBase(pathBase);
            }

            app.Use(async (context, next) =>
            {
                await next();

                // If there's no available file and the request doesn't contain an extension, we're probably trying to access a page.
                // Rewrite request to use app root
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value) && !context.Request.Path.Value.StartsWith("/api"))
                {
                    context.Request.Path = "/index.html";
                    context.Response.StatusCode = 200; // Make sure we update the status code, otherwise it returns 404
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/liveness", new HealthCheckOptions
                {
                    Predicate = r => r.Name.Contains("self")
                });
                endpoints.MapHealthChecks("/hc", new HealthCheckOptions()
                {
                    Predicate = _ => true,
                    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                });
            });
        }

        private void RegisterAppInsights(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry(Configuration);
            services.AddApplicationInsightsKubernetesEnricher();
        }
    }
}
