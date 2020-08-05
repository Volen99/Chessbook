namespace WorldFeed.Statistics
{
    using Infrastructure;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    using Services.Statistics;
    using Data;
    using WorldFeed.Services;
    using WorldFeed.Statistics.Messages;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Data.Repositories;
    using WorldFeed.Common.Models;
    using WorldFeed.Data;

    // The idea of this Statistics Microservice is to keep information where I want to show in some places
    public class Startup
    {
        public Startup(IConfiguration configuration)
            => this.Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IDbQueryRunner, DbQueryRunner>();

            services
                .AddWebService<StatisticsDbContext>(this.Configuration)
                .AddTransient<IDataSeeder, StatisticsDataSeeder>()
                .AddTransient<IStatisticsService, StatisticsService>()
                .AddMessaging(this.Configuration, typeof(UploadedMediaConsumer));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            => app
                .UseWebService(env)
                .Initialize();
    }
}
