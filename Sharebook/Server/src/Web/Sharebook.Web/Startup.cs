namespace Sharebook.Web
{
    using System.Reflection;

    using Sharebook.Data;
    using Sharebook.Data.Common;
    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models;
    using Sharebook.Data.Repositories;
    using Sharebook.Data.Seeding;
    using Sharebook.Services.Data;
    using Sharebook.Services.Mapping;
    using Sharebook.Services.Messaging;
    using Sharebook.Web.ViewModels;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Sharebook.Web.Api;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.AspNetCore.Identity;
    using System;
    using Sharebook.Common.Infrastructure;
    using Sharebook.Services.Data.Users;

    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(this.configuration.GetConnectionString("DefaultConnection")));

            var defaultConnectionString = this.configuration.GetDefaultConnectionString();
            var migrationsAssembly = typeof(ApplicationDbContext).GetTypeInfo().Assembly.GetName().Name;

            AddTokenAuthentication(services, this.configuration);

            services.AddIdentity<ApplicationUser, IdentityRole>(IdentityOptionsProvider.GetIdentityOptions)
                .AddRoles<ApplicationRole>().AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configures the Identity cookie.
            services.ConfigureApplicationCookie(config =>
            {
                config.Cookie.Name = "Sharebook.IdentityCookie";
                config.LoginPath = "/Account/Login";
                config.LogoutPath = "/Account/Logout";
            });

            services.Configure<CookiePolicyOptions>(
                options =>
                    {
                        options.CheckConsentNeeded = context => true;
                        options.MinimumSameSitePolicy = SameSiteMode.None;
                    });



            services.AddIdentityServer(x =>
            {
                x.IssuerUri = "null";
                x.Authentication.CookieLifetime = TimeSpan.FromHours(2);
            })
            .AddDeveloperSigningCredential()                                // .AddSigningCredential(Certificate.Get())
            .AddAspNetIdentity<ApplicationUser>()                           // http://docs.identityserver.io/en/latest/reference/aspnet_identity.html
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
            });
            // .Services.AddTransient<IProfileService, ProfileService>();

            //services.AddControllersWithViews(
            //    options =>
            //        {
            //            options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
            //        }).AddRazorRuntimeCompilation();
            //services.AddRazorPages();
            //services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddSingleton(this.configuration);

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IDbQueryRunner, DbQueryRunner>();

            // Application services
            services.AddTransient<IEmailSender, NullMessageSender>();
            services.AddTransient<ISettingsService, SettingsService>();

            services.AddTransient<ILoginService<ApplicationUser>, EFLoginService>();


        }

        public static IServiceCollection AddTokenAuthentication(IServiceCollection services, IConfiguration configuration, JwtBearerEvents events = null)
        {
            // If the token is send through the query, like in SignalR, for example.
            // config.Events = new JwtBearerEvents
            // {
            //     OnMessageReceived = context =>
            //     {
            //         if (context.Request.Query.ContainsKey("access_token"))
            //         {
            //             context.Token = context.Request.Query["access_token"];
            //         }

            //         return Task.CompletedTask;
            //     }
            // };


            var secret = configuration.GetSection(nameof(AppSettings)).GetValue<string>(nameof(AppSettings.Secret));

            var secretBytes = Encoding.ASCII.GetBytes(secret);

            // Only one JWT bearer authentication is registered with the default authentication scheme JwtBearerDefaults.AuthenticationScheme
            // Additional authentication has to be registered with a unique authentication scheme
            services
                .AddAuthentication(authentication =>
                {
                    authentication.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    authentication.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(bearer =>
                {
                    bearer.RequireHttpsMetadata = false; // This should be disabled only in development environments
                    bearer.SaveToken = true;
                    bearer.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(secretBytes),
                        ValidateIssuer = false,
                        ValidateAudience = false,

                        // If you are wondering, why the above code disables audience validation, have a look:
                        // https://identityserver4.readthedocs.io/en/latest/topics/resources.html#refresources
                    };

                    if (events != null)
                    {
                        bearer.Events = events;
                    }
                });

            services.AddHttpContextAccessor();
            services.AddAuthentication();
            services.AddAuthorization();
            services.AddControllers();

            return services;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            AutoMapperConfig.RegisterMappings(typeof(ErrorViewModel).GetTypeInfo().Assembly);

            // Seed data on application startup
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();
                new ApplicationDbContextSeeder().SeedAsync(dbContext, serviceScope.ServiceProvider).GetAwaiter().GetResult();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            // https://github.com/IdentityServer/IdentityServer4/issues/1372
            app.UseCors(builder =>
               builder.WithOrigins("http://localhost:4200"  /* et. al. */)
                   .AllowAnyHeader() // allow 'Authentication' 
                   .AllowAnyMethod() // allow GET, SET, OPTIONS
               );

            app.UseForwardedHeaders();
            app.UseIdentityServer();   // Adds IdentityServer. We use Identity server as a middleware here.

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                // a stackoverflow dude: MapControllers is used to map any attributes that may exist on the controllers, like, [Route], [HttpGet], etc
                endpoints.MapControllers();

                endpoints.MapDefaultControllerRoute();
            });

            // app.UseEndpoints(
            //    endpoints =>
            //        {
            //            endpoints.MapControllerRoute("areaRoute", "{area:exists}/{controller=Home}/{action=Index}/{id?}");
            //            endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            //            endpoints.MapRazorPages();
            //        });
        }
    }
}
