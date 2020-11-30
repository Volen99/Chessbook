namespace Sharebook.Identity.API
{
    using System;
    using System.Reflection;
    using Autofac;
    using Autofac.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Http;
    using IdentityServer4.Services;

    using Sharebook.Identity.API.Services;
    using Sharebook.Identity.API.Devspaces;
    using Sharebook.Common.Infrastructure;
    using Sharebook.Identity.API.Models.User;
    using Sharebook.Identity.API.Data;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            RegisterAppInsights(services);

            services.AddWebService<ApplicationDbContext>(this.Configuration);

            var defaultConnectionString = this.Configuration.GetDefaultConnectionString();
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configures the Identity cookie.
            services.ConfigureApplicationCookie(config =>
            {
                config.Cookie.Name = "Sharebook.IdentityCookie";
                config.LoginPath = "/Account/Login";
                config.LogoutPath = "/Account/Logout";
            });

            services.AddAuthentication()
                .AddFacebook(config =>
                {
                    config.AppId = "302283381007627";
                    config.AppSecret = "0ac7d83f351c6f1d9f25c887b6d58d78";
                });

            // Adds IdentityServer http://docs.identityserver.io/en/latest/reference/ef.html
            services.AddIdentityServer(x =>
            {
                x.IssuerUri = "null";
                x.Authentication.CookieLifetime = TimeSpan.FromHours(2);
            })
            .AddDevspacesIfNeeded(this.Configuration.GetValue("EnableDevspaces", false))
            .AddDeveloperSigningCredential()                                // .AddSigningCredential(Certificate.Get())
            .AddAspNetIdentity<ApplicationUser>()                                      // http://docs.identityserver.io/en/latest/reference/aspnet_identity.html
            .AddConfigurationStore(options =>                               // this adds the config data from DB (clients, resources, CORS)
            {
                options.ConfigureDbContext = builder => builder.UseSqlServer(defaultConnectionString,
                    sqlServerOptionsAction: sqlOptions =>
                    {
                        sqlOptions.MigrationsAssembly(migrationsAssembly);
                        // Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                    });
            })
            .AddOperationalStore(options =>                                 // this adds the operational data from DB (codes, tokens, consents)
            {
                options.ConfigureDbContext = builder => builder.UseSqlServer(defaultConnectionString,
                    sqlServerOptionsAction: sqlOptions =>
                    {
                        sqlOptions.MigrationsAssembly(migrationsAssembly);
                        // Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                    });

                //// this enables automatic token cleanup. This is optional
                // options.EnableTokenCleanup = true;
                // options.TokenCleanupInterval = 3600; // The token cleanup interval (in seconds). The default is 3600s
            })
            .Services.AddTransient<IProfileService, ProfileService>();

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddControllers().AddNewtonsoftJson();
            services.AddControllersWithViews();
            services.AddRazorPages();

            services.AddTransient<ILoginService<ApplicationUser>, EFLoginService>();
            services.AddTransient<IRedirectService, RedirectService>();


            var container = new ContainerBuilder();
            container.Populate(services);

            return new AutofacServiceProvider(container.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // The Configure method is used to specify how the app responds to HTTP requests. 
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            var pathBase = this.Configuration["PATH_BASE"];
            if (!string.IsNullOrEmpty(pathBase))
            {
                loggerFactory.CreateLogger<Startup>().LogDebug("Using PATH BASE '{pathBase}'", pathBase);
                app.UsePathBase(pathBase);
            }

            app.UseStaticFiles();

            // Make work identity server redirections in Edge and lastest versions of browers. WARN: Not valid in a production environment.
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("Content-Security-Policy", "script-src 'unsafe-inline'");
                await next();
            });

            // https://github.com/IdentityServer/IdentityServer4/issues/1372
            app.UseCors(builder =>
               builder.WithOrigins("http://localhost:4200"  /* et. al. */)
                   .AllowAnyHeader() // allow 'Authentication' 
                   .AllowAnyMethod() // allow GET, SET, OPTIONS
               );

            app.UseForwardedHeaders();
            app.UseIdentityServer();   // Adds IdentityServer. We use Identity server as a middleware here.

            // Fix a problem with chrome. Chrome enabled a new feature "Cookies without SameSite must be secure", 
            // the coockies shold be expided from https, but in eShop, the internal comunicacion in aks and docker compose is !!!http!!!.
            // To avoid this problem, the policy of cookies shold be in Lax mode.
            app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax }); // AspNetCore.Http.SameSite hmm
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                // a stackoverflow dude: MapControllers is used to map any attributes that may exist on the controllers, like, [Route], [HttpGet], etc
                endpoints.MapControllers();

                endpoints.MapDefaultControllerRoute();
            });

            // app.UseWebService(env).Initialize();
        }

        private void RegisterAppInsights(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry(this.Configuration);
            services.AddApplicationInsightsKubernetesEnricher();
        }
    }
}
