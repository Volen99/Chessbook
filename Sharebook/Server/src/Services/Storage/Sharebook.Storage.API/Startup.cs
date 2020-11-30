namespace Sharebook.Storage
{
    using System;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Diagnostics.HealthChecks;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Mvc;
    using Autofac;
    using RabbitMQ.Client;
    using EventBusRabbitMQ;

    using Sharebook.BuildingBlocks.EventBus.Abstractions;
    using Sharebook.BuildingBlocks.EventBus;
    using Microsoft.OpenApi.Models;
    using System.IdentityModel.Tokens.Jwt;
    using Sharebook.Storage.API.Data;
    using Microsoft.EntityFrameworkCore;
    using System.Reflection;
    using Sharebook.Common.Infrastructure;
    using Microsoft.Extensions.DependencyInjection.Extensions;
    using Microsoft.AspNetCore.Mvc.Infrastructure;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddWebService<ScienceDbContext>(this.Configuration)
                .AddCustomMvc();
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            var pathBase = Configuration["PATH_BASE"];
            if (!string.IsNullOrEmpty(pathBase))
            {
                loggerFactory.CreateLogger<Startup>().LogDebug("Using PATH BASE '{pathBase}'", pathBase);
                app.UsePathBase(pathBase);
            }

            app.UseRouting();
            app.UseCors("CorsPolicy");
            ConfigureAuth(app);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllers();
            });

            ConfigureEventBus(app);
        }


        private void ConfigureEventBus(IApplicationBuilder app)
        {
            // var eventBus = app.ApplicationServices.GetRequiredService<BuildingBlocks.EventBus.Abstractions.IEventBus>();

            // eventBus.Subscribe<UserCheckoutAcceptedIntegrationEvent, IIntegrationEventHandler<UserCheckoutAcceptedIntegrationEvent>>();
            // eventBus.Subscribe<GracePeriodConfirmedIntegrationEvent, IIntegrationEventHandler<GracePeriodConfirmedIntegrationEvent>>();
            // eventBus.Subscribe<OrderStockConfirmedIntegrationEvent, IIntegrationEventHandler<OrderStockConfirmedIntegrationEvent>>();
            // eventBus.Subscribe<OrderStockRejectedIntegrationEvent, IIntegrationEventHandler<OrderStockRejectedIntegrationEvent>>();
            // eventBus.Subscribe<OrderPaymentFailedIntegrationEvent, IIntegrationEventHandler<OrderPaymentFailedIntegrationEvent>>();
            // eventBus.Subscribe<OrderPaymentSucceededIntegrationEvent, IIntegrationEventHandler<OrderPaymentSucceededIntegrationEvent>>();
        }

        protected virtual void ConfigureAuth(IApplicationBuilder app)
        {
            if (Configuration.GetValue<bool>("UseLoadTest"))
            {
                //app.UseMiddleware<ByPassAuthMiddleware>();
            }

            app.UseAuthentication();
            app.UseAuthorization();
        }
    }

    static class CustomExtensionsMethods
    {
        public static IServiceCollection AddCustomMvc(this IServiceCollection services)
        {
            // Add framework services.
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .SetIsOriginAllowed((host) => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            return services;
        }
        //public static IServiceCollection AddCustomDbContext(this IServiceCollection services/*, IConfiguration configuration*/)
        //{
        //    services.AddEntityFrameworkSqlServer()
        //           .AddDbContext<ScienceDbContext>(options =>
        //           {
        //               options.UseSqlServer("Server=.\\SQLEXPRESS;Database=StorageDatabase;Integrated Security=true",
        //                   sqlServerOptionsAction: sqlOptions =>
        //                   {
        //                       sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
        //                       sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
        //                   });
        //           },
        //               ServiceLifetime.Scoped  //Showing explicitly that the DbContext is shared across the HTTP request scope (graph of objects started in the HTTP request)
        //           );

        //    //services.AddDbContext<IntegrationEventLogContext>(options =>
        //    //{
        //    //    options.UseSqlServer(configuration["ConnectionString"],
        //    //                         sqlServerOptionsAction: sqlOptions =>
        //    //                         {
        //    //                             sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
        //    //                             //Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
        //    //                             sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
        //    //                         });
        //    //});

        //    return services;
        //}

        //public static IServiceCollection AddCustomSwagger(this IServiceCollection services, IConfiguration configuration)
        //{
        //    services.AddSwaggerGen(options =>
        //           {
        //               options.DescribeAllEnumsAsStrings();       // https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/1269
        //               options.SwaggerDoc("v1", new OpenApiInfo
        //               {
        //                   Title = "Sharebook - Science HTTP API",
        //                   Version = "v1",
        //                   Description = "The Science Microservice HTTP API"
        //               });
        //               //options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
        //               //{
        //               //    Type = SecuritySchemeType.OAuth2,
        //               //    Flows = new OpenApiOAuthFlows()
        //               //    {
        //               //        AuthorizationCode = new OpenApiOAuthFlow()
        //               //        {
        //               //            AuthorizationUrl = new Uri($"{configuration.GetValue<string>("IdentityUrlExternal")}/connect/authorize"),
        //               //            TokenUrl = new Uri($"{configuration.GetValue<string>("IdentityUrlExternal")}/connect/token"),

        //               //            Scopes = new Dictionary<string, string>()
        //               //            {
        //               //                { "webshoppingagg", "Shopping Aggregator for Web Clients" }
        //               //            }
        //               //        }
        //               //    }
        //               //});

        //               //options.OperationFilter<AuthorizeCheckOperationFilter>();
        //           });

        //    return services;
        //}

        public static IServiceCollection AddCustomIntegrations(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddTransient<IIdentityService, IdentityService>();
            //services.AddTransient<Func<DbConnection, IIntegrationEventLogService>>(
            //    sp => (DbConnection c) => new IntegrationEventLogService(c));

            //services.AddTransient<IOrderingIntegrationEventService, OrderingIntegrationEventService>();


            services.AddSingleton<IRabbitMQPersistentConnection>(sp =>
            {
                var logger = sp.GetRequiredService<ILogger<DefaultRabbitMQPersistentConnection>>();


                var factory = new ConnectionFactory()
                {
                    HostName = configuration["EventBusConnection"],
                    DispatchConsumersAsync = true
                };

                if (!string.IsNullOrEmpty(configuration["EventBusUserName"]))
                {
                    factory.UserName = configuration["EventBusUserName"];
                }

                if (!string.IsNullOrEmpty(configuration["EventBusPassword"]))
                {
                    factory.Password = configuration["EventBusPassword"];
                }

                var retryCount = 5;
                if (!string.IsNullOrEmpty(configuration["EventBusRetryCount"]))
                {
                    retryCount = int.Parse(configuration["EventBusRetryCount"]);
                }

                return new DefaultRabbitMQPersistentConnection(factory, logger, retryCount);
            });


            return services;
        }

        //public static IServiceCollection AddCustomConfiguration(this IServiceCollection services, IConfiguration configuration)
        //{
        //    services.AddOptions();
        //    services.Configure<UploadSettings>(configuration);
        //    services.Configure<ApiBehaviorOptions>(options =>     // Options used to configure behavior for types annotated with ApiControllerAttribute
        //    {
        //        options.InvalidModelStateResponseFactory = context =>
        //        {
        //            var problemDetails = new ValidationProblemDetails(context.ModelState)
        //            {
        //                Instance = context.HttpContext.Request.Path,
        //                Status = StatusCodes.Status400BadRequest,
        //                Detail = "Please refer to the errors property for additional details.",
        //            };

        //            return new BadRequestObjectResult(problemDetails)
        //            {
        //                ContentTypes = { "application/problem+json", "application/problem+xml" }
        //            };
        //        };
        //    });

        //    return services;
        //}

        public static IServiceCollection AddEventBus(this IServiceCollection services, IConfiguration configuration)
        {
            var subscriptionClientName = configuration["SubscriptionClientName"];

            services.AddSingleton<IEventBus, EventBusRabbitMQ>(sp =>
            {
                var rabbitMQPersistentConnection = sp.GetRequiredService<IRabbitMQPersistentConnection>();
                var iLifetimeScope = sp.GetRequiredService<ILifetimeScope>();
                var logger = sp.GetRequiredService<ILogger<EventBusRabbitMQ>>();
                var eventBusSubcriptionsManager = sp.GetRequiredService<IEventBusSubscriptionsManager>();

                var retryCount = 5;
                if (!string.IsNullOrEmpty(configuration["EventBusRetryCount"]))
                {
                    retryCount = int.Parse(configuration["EventBusRetryCount"]);
                }

                return new EventBusRabbitMQ(rabbitMQPersistentConnection, logger, iLifetimeScope, eventBusSubcriptionsManager, subscriptionClientName, retryCount);
            });


            services.AddSingleton<IEventBusSubscriptionsManager, InMemoryEventBusSubscriptionsManager>();

            return services;
        }
    }
}
