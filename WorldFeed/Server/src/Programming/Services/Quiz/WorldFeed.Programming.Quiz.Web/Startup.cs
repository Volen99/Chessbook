using System;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using WorldFeed.Programming.Quiz.Data;
using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Services.Mapping;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Data.Seeding;
using WorldFeed.Programming.Quiz.Web.ViewModels;
using WorldFeed.Programming.Quiz.Data.Repositories;
using WorldFeed.Programming.Quiz.Data.Common;
using WorldFeed.Programming.Quiz.Services.Data;
using WorldFeed.Programming.Quiz.Services.Messaging;
using WorldFeed.Programming.Quiz.Services;
using WorldFeed.Programming.Quiz.Services.Data.Timer;
using WorldFeed.Programming.Quiz.Services.Audios;
using WorldFeed.Programming.Quiz.Services.Data.Styles;

namespace WorldFeed.Programming.Quiz.Web
{
    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(this.configuration.GetConnectionString("QuizDb")));

            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromDays(3);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            services.AddResponseCaching();
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
            });

            services.AddDefaultIdentity<ApplicationUser>(IdentityOptionsProvider.GetIdentityOptions)
                .AddRoles<ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.Configure<CookiePolicyOptions>(
                options =>
                {
                    options.CheckConsentNeeded = context => true;
                    options.MinimumSameSitePolicy = SameSiteMode.None;
                });

            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute()); // He does it only with "POST" requests kk
            });

            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-CSRF-TOKEN";
            });

            services.AddHttpContextAccessor(); // So that we don't use 'this.HttpContext' for easier testing
            services.AddRazorPages(op => {
                //op.Conventions.AuthorizePage("/Manage");
            });

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;

            });

            services.AddSingleton(this.configuration);

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IDbQueryRunner, DbQueryRunner>();

            // Application services
            services.AddTransient<IEmailSender>(x => new SendGridEmailSender("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"));
            services.AddTransient<ISettingsService, SettingsService>();
            services.AddTransient<IVotesService<VoteQuestion>, VotesQuestionService>();
            services.AddTransient<IQuestionService, QuestionService>();
            services.AddTransient<IUserQuizTokensService, UserQuizTokensService>();
            services.AddTransient<ITimerService, TimerService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IAudioService, AudioService>();
            services.AddTransient<IUserPersonalStylesService, UserPersonalStylesService>();
            services.AddTransient<IQuestionVoteStylesService, QuestionVoteStylesService>();


            // services.AddSingleton<IAnonymousUser, AnonymousUser>();

            services.AddDbContext<ApplicationDbContext>();
            services.AddApplicationInsightsTelemetry();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            AutoMapperConfig.RegisterMappings(typeof(ErrorViewModel).GetTypeInfo().Assembly);

            // Seed data on application startup
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                // if (env.IsDevelopment())
                // {
                //     dbContext.Database.Migrate(); // Does automatically migrations a.k.a. Add-Migration Initial
                // }

                new ApplicationDbContextSeeder().SeedAsync(dbContext, serviceScope.ServiceProvider).GetAwaiter().GetResult();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            //app.UseWebSockets(new WebSocketOptions
            //{
            //    KeepAliveInterval = TimeSpan.FromSeconds(10000),
            //    ReceiveBufferSize = 4 * 1024,
            //    AllowedOrigins // get only
            //});

            app.UseResponseCompression();
            app.UseResponseCaching();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseCookiePolicy();

            app.UseRouting();

            app.UseAuthentication();        // attempts to authenticate the user before they're allowed access to secure resources
            app.UseAuthorization();         // authorizes a user to access secure resources

            app.UseSession();

            

            app.UseEndpoints(
                endpoints =>
                {
                    endpoints.MapControllerRoute(
                        "areaRoute",
                        "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapControllerRoute(
                        "default",
                        "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapRazorPages();
                });
        }
    }
}
