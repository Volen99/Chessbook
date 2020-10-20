namespace WorldFeed.History.API
{
    using System.IO;
    using System.Reflection;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Http.Features;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.FileProviders;

    using Infrastructure;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Common.Data;
    using WorldFeed.Common.Services.Mapping;
    using WorldFeed.History.BC.Science.Post.Models;
    using WorldFeed.History.API.Services.Files;
    using WorldFeed.History.API.Services.Text;
    using WorldFeed.History.API.Services.Posts;
    using WorldFeed.History.API.Data;
    using WorldFeed.History.API.Repositories;

    public class Startup
    {
        public Startup(IConfiguration configuration)
            => this.Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<FormOptions>(options =>
            {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBoundaryLengthLimit = int.MaxValue;
                options.MemoryBufferThreshold = int.MaxValue;
            });

            var tweetInviContainerNew = new Injectinvi.TweetinviContainer();

             new Injectinvi.TweetinviContainer(tweetInviContainerNew);

            if (!TweetinviContainer.Container.IsInitialized)
            {
                TweetinviContainer.Container.Initialize();
            }

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IDbQueryRunner, DbQueryRunner>();

            //services.AddIdentityCore<ApplicationUser>(IdentityOptionsProvider.GetIdentityOptions)
            //   .AddRoles<ApplicationRole>()
            //   .AddEntityFrameworkStores<PostDbContext>();

            services
               .AddWebService<PostDbContext>(this.Configuration)
               .AddTransient<IMediaService, MediaService>()
               .AddTransient<ITextService, TextService>()
               .AddTransient<IPostService, PostService>()
               .AddMessaging(this.Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            AutoMapperConfig.RegisterMappings(typeof(ErrorViewModel).GetTypeInfo().Assembly);

            // Usually, all the files in the wwwroot folder are servable for the client applications. We provide that by adding app.UseStaticFiles()
            // in the Startup class in the Configure method. Of course, our uploaded images will be stored in the Resources folder, and due to
            // that, we need to make it servable as well. To do that, let’s modify the Configure method in the Startup.cs class
            //
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });

            app.UseWebService(env).Initialize();
        }
    }
}
