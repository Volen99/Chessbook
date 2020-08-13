namespace WorldFeed.Infrastructure
{
    using System;
    using System.Reflection;
    using System.Text;
    using Services.Identity;
    using AutoMapper;
    using GreenPipes;
    using Hangfire;
    using MassTransit;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Infrastructure;
    using WorldFeed.Common.Messages;
    using WorldFeed.Common.Models;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using System.Net.Security;
    using System.Threading.Tasks;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddWebService<TDbContext>(this IServiceCollection services, IConfiguration configuration)
            where TDbContext : DbContext
        {
            services
                .AddDatabase<TDbContext>(configuration)
                .AddApplicationSettings(configuration)  // TODO: change?!
                .AddTokenAuthentication(configuration)
                .AddHealth(configuration)
                .AddAutoMapperProfile(Assembly.GetCallingAssembly())
                .AddControllers();

            return services;
        }

        public static IServiceCollection AddDatabase<TDbContext>(this IServiceCollection services, IConfiguration configuration)
            where TDbContext : DbContext
            => services
                .AddScoped<DbContext, TDbContext>()
                .AddDbContext<TDbContext>(options => options
                    .UseSqlServer(configuration.GetConnectionString("DefaultConnection"), sqlOptions =>
                    {
                        sqlOptions.EnableRetryOnFailure
                        (
                            maxRetryCount: 10,
                            maxRetryDelay: TimeSpan.FromSeconds(30),
                            errorNumbersToAdd: null
                        );
                    }));

        public static IServiceCollection AddApplicationSettings(this IServiceCollection services, IConfiguration configuration)
            => services
                .Configure<AppSettings>(
                    configuration.GetSection(nameof(AppSettings)),
                    config => config.BindNonPublicProperties = true);

        public static IServiceCollection AddTokenAuthentication(this IServiceCollection services, IConfiguration configuration,
            JwtBearerEvents events = null)
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
                        ValidateAudience = false
                        // If you are wondering, why the above code disables audience validation, have a look:
                        // https://identityserver4.readthedocs.io/en/latest/topics/resources.html#refresources
                    };

                    if (events != null)
                    {
                        bearer.Events = events;
                    }
                });

            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            return services;
        }

        public static IServiceCollection AddAutoMapperProfile(this IServiceCollection services, Assembly assembly)
            => services
                .AddAutoMapper(
                    (_, config) => config
                        .AddProfile(new MappingProfile(assembly)),
                    Array.Empty<Assembly>());

        public static IServiceCollection AddHealth(this IServiceCollection services, IConfiguration configuration)
        {
            var healthChecks = services.AddHealthChecks();

            healthChecks.AddSqlServer(configuration.GetDefaultConnectionString());

            healthChecks.AddRabbitMQ(rabbitConnectionString: "amqp://rabbitmq:rabbitmq@rabbitmq/");

            return services;
        }

        public static IServiceCollection AddMessaging(this IServiceCollection services, IConfiguration configuration, params Type[] consumers)
        {
            services
                .AddMassTransit(mt =>
                {
                    consumers.ForEach(consumer => mt.AddConsumer(consumer)); // Every single consumer works though different queue // might bug foreach?

                    mt.AddBus(context => Bus.Factory.CreateUsingRabbitMq(rmq =>
                    {
                        rmq.Host("rabbitmq", host =>
                        {
                            host.Username("rabbitmq");
                            host.Password("rabbitmq");
                        });

                        rmq.UseHealthCheck(context);

                        consumers.ForEach(consumer => rmq.ReceiveEndpoint(consumer.FullName, endpoint => // plz note 'FullName' due to name collisions
                        {
                            endpoint.PrefetchCount = 6; // Number of CPUs is default
                            endpoint.UseMessageRetry(retry => retry.Interval(5, 100));

                            endpoint.ConfigureConsumer(context, consumer);
                        }));
                    }));
                })
                .AddMassTransitHostedService(); // Starts Message broker listening

            services
               .AddHangfire(config => config
                   .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                   .UseSimpleAssemblyNameTypeSerializer()
                   .UseRecommendedSerializerSettings()
                   .UseSqlServerStorage(configuration.GetDefaultConnectionString()));

            services.AddHangfireServer();

            services.AddHostedService<MessagesHostedService>();

            return services;
        }
    }
}
