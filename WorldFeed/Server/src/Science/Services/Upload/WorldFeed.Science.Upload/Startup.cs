namespace WorldFeed.Science.Upload
{
    using System.Reflection;
    using System.IO;
    using HealthChecks.UI.Client;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Http.Features;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.OpenApi.Models;
    using Microsoft.AspNetCore.Diagnostics.HealthChecks;

    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Common.Data;
    using WorldFeed.Common.Services.Mapping;
    using WorldFeed.Science.API.Data;
    using WorldFeed.Science.API.Models;
    using WorldFeed.Science.API.Repositories;
    using WorldFeed.Infrastructure;
    using WorldFeed.Science.Upload.Services.Files;

    public class Startup
    {
        public Startup(IConfiguration configuration)
            => this.Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //services
            //   .AddCors()
            //  //.AddTokenAuthentication(this.Configuration, JwtConfiguration.BearerEvents)
            //  .AddWebService<ScienceDbContext>(this.Configuration)
            //  .AddMessaging(this.Configuration, typeof(MediaCreatedConsumer), typeof(PostCreatedConsumer), typeof(TextCreatedConsumer), typeof(PostUploadedConsumer))
            //  .AddSignalR();

            services.Configure<FormOptions>(options =>
            {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBoundaryLengthLimit = int.MaxValue;
                options.MemoryBufferThreshold = int.MaxValue;
            });

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IDbQueryRunner, DbQueryRunner>();

            services.AddIdentityCore<ApplicationUser>(IdentityOptionsProvider.GetIdentityOptions)
               .AddRoles<ApplicationRole>()
               .AddEntityFrameworkStores<ScienceUploadDbContext>();


            services
               .AddTransient<IMediaService, MediaService>();

            // Add framework services.
            services.AddSwaggerGen(options =>
            {
                options.DescribeAllEnumsAsStrings();       // https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/1269
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "WorldFeed - Science HTTP API",
                    Version = "v1",
                    Description = "The Science Microservice HTTP API. This is a Data-Driven/CRUD microservice sample"
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            AutoMapperConfig.RegisterMappings(typeof(ErrorViewModel).GetTypeInfo().Assembly); // Why does He help me?

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

            app.UseSwagger()
             .UseSwaggerUI(c =>
             {
                 c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
             });

            app
                .UseAuthentication()
                .UseAuthorization()
                .UseRouting()
                .UseCors(options => options
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());

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

            app.UseWebService(env).Initialize();
        }
    }
}
