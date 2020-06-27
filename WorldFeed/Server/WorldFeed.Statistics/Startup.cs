namespace WorldFeed.Statistics
{
    using Infrastructure;
    using WorldFeed.Services;
    using Data;
    using MassTransit;
    using Messages;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Services.CarAdViews;
    using Services.Statistics;

    public class Startup
    {
        public Startup(IConfiguration configuration)
            => this.Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
            => services
                .AddWebService<StatisticsDbContext>(this.Configuration)
                .AddTransient<IDataSeeder, StatisticsDataSeeder>()
                .AddTransient<IStatisticsService, StatisticsService>()
                .AddTransient<ICarAdViewService, CarAdViewService>()
                .AddMessaging(typeof(CarAdCreatedConsumer));

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            => app
                .UseWebService(env)
                .Initialize();
    }
}
