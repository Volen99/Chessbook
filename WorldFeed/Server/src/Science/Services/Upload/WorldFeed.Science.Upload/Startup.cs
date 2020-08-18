namespace WorldFeed.Science.Upload
{
    using System;
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
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Common.Data;
    using WorldFeed.Common.Services.Mapping;
    using WorldFeed.Science.API.Data;
    using WorldFeed.Science.API.Models;
    using WorldFeed.Science.API.Repositories;
    using WorldFeed.Infrastructure;
    using WorldFeed.Science.Upload.Services.Files;
    using WorldFeed.Science.Upload.Infrastructure;
    using System.Collections.Generic;
    using WorldFeed.Science.Upload.Infrastructure.Filters;
    using Autofac;
    using WorldFeed.Science.Upload.Infrastructure.AutofacModules;
    using Autofac.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using WorldFeed.Science.Upload.Infrastructure.Middlewares;
    using Microsoft.Extensions.Diagnostics.HealthChecks;
    using WorldFeed.Science.Upload.Services;
    using EventBusRabbitMQ;
    using RabbitMQ.Client;
    using Microsoft.AspNetCore.Mvc;
    using WorldFeed.BuildingBlocks.EventBus.Abstractions;
    using WorldFeed.BuildingBlocks.EventBus;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.AspNetCore.Authentication.JwtBearer;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public virtual IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddGrpc(options =>
                {
                    options.EnableDetailedErrors = true;
                })
                .Services
                .AddCustomMvc()
                .AddHealthChecks(Configuration)
                .AddCustomDbContext(Configuration)
                .AddCustomSwagger(Configuration)
                .AddCustomIntegrations(Configuration)
                .AddCustomConfiguration(Configuration)
                .AddEventBus(Configuration)
                .AddCustomAuthentication(Configuration);

            //configure autofac
            var container = new ContainerBuilder();
            container.Populate(services);

            container.RegisterModule(new ApplicationModule(Configuration["ConnectionString"]));

            return new AutofacServiceProvider(container.Build());
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            //loggerFactory.AddAzureWebAppDiagnostics();
            //loggerFactory.AddApplicationInsights(app.ApplicationServices, LogLevel.Trace);

            var pathBase = Configuration["PATH_BASE"];
            if (!string.IsNullOrEmpty(pathBase))
            {
                loggerFactory.CreateLogger<Startup>().LogDebug("Using PATH BASE '{pathBase}'", pathBase);
                app.UsePathBase(pathBase);
            }

            app.UseSwagger()
               .UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint($"{ (!string.IsNullOrEmpty(pathBase) ? pathBase : string.Empty) }/swagger/v1/swagger.json", "Ordering.API V1");
                   c.OAuthClientId("orderingswaggerui");
                   c.OAuthAppName("Ordering Swagger UI");
               });

            app.UseRouting();
            app.UseCors("CorsPolicy");
            ConfigureAuth(app);

            app.UseEndpoints(endpoints =>
            {
                // endpoints.MapGrpcService<OrderingService>();
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllers();
                //endpoints.MapGet("/_proto/", async ctx =>
                //{
                //    ctx.Response.ContentType = "text/plain";
                //    using var fs = new FileStream(Path.Combine(env.ContentRootPath, "Proto", "basket.proto"), FileMode.Open, FileAccess.Read);
                //    using var sr = new StreamReader(fs);
                //    while (!sr.EndOfStream)
                //    {
                //        var line = await sr.ReadLineAsync();
                //        if (line != "/* >>" || line != "<< */")
                //        {
                //            await ctx.Response.WriteAsync(line);
                //        }
                //    }
                //});
                endpoints.MapHealthChecks("/hc", new HealthCheckOptions()
                {
                    Predicate = _ => true,
                    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                });
                endpoints.MapHealthChecks("/liveness", new HealthCheckOptions
                {
                    Predicate = r => r.Name.Contains("self")
                });
            });

            ConfigureEventBus(app);
        }


        private void ConfigureEventBus(IApplicationBuilder app)
        {
            // var eventBus = app.ApplicationServices.GetRequiredService<BuildingBlocks.EventBus.Abstractions.IEventBus>();

            //eventBus.Subscribe<UserCheckoutAcceptedIntegrationEvent, IIntegrationEventHandler<UserCheckoutAcceptedIntegrationEvent>>();
            //eventBus.Subscribe<GracePeriodConfirmedIntegrationEvent, IIntegrationEventHandler<GracePeriodConfirmedIntegrationEvent>>();
            //eventBus.Subscribe<OrderStockConfirmedIntegrationEvent, IIntegrationEventHandler<OrderStockConfirmedIntegrationEvent>>();
            //eventBus.Subscribe<OrderStockRejectedIntegrationEvent, IIntegrationEventHandler<OrderStockRejectedIntegrationEvent>>();
            //eventBus.Subscribe<OrderPaymentFailedIntegrationEvent, IIntegrationEventHandler<OrderPaymentFailedIntegrationEvent>>();
            //eventBus.Subscribe<OrderPaymentSucceededIntegrationEvent, IIntegrationEventHandler<OrderPaymentSucceededIntegrationEvent>>();
        }

        protected virtual void ConfigureAuth(IApplicationBuilder app)
        {
            if (Configuration.GetValue<bool>("UseLoadTest"))
            {
                app.UseMiddleware<ByPassAuthMiddleware>();
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

        public static IServiceCollection AddHealthChecks(this IServiceCollection services, IConfiguration configuration)
        {
            var hcBuilder = services.AddHealthChecks();

            hcBuilder.AddCheck("self", () => HealthCheckResult.Healthy());

            hcBuilder
                .AddSqlServer(
                    configuration["ConnectionString"],
                    name: "OrderingDB-check",
                    tags: new string[] { "orderingdb" });

            hcBuilder
                .AddRabbitMQ(
                    $"amqp://{configuration["EventBusConnection"]}",
                    name: "science.upload-rabbitmqbus-check",
                    tags: new string[] { "rabbitmqbus" });

            return services;
        }

        public static IServiceCollection AddCustomDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEntityFrameworkSqlServer()
                   .AddDbContext<ScienceUploadDbContext>(options =>
                   {
                       options.UseSqlServer(configuration["ConnectionString"],
                           sqlServerOptionsAction: sqlOptions =>
                           {
                               sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
                               sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                           });
                   },
                       ServiceLifetime.Scoped  //Showing explicitly that the DbContext is shared across the HTTP request scope (graph of objects started in the HTTP request)
                   );

            //services.AddDbContext<IntegrationEventLogContext>(options =>
            //{
            //    options.UseSqlServer(configuration["ConnectionString"],
            //                         sqlServerOptionsAction: sqlOptions =>
            //                         {
            //                             sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
            //                             //Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
            //                             sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
            //                         });
            //});

            return services;
        }

        public static IServiceCollection AddCustomSwagger(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSwaggerGen(options =>
                   {
                       options.DescribeAllEnumsAsStrings();       // https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/1269
                       options.SwaggerDoc("v1", new OpenApiInfo
                       {
                           Title = "WorldFeed - Science HTTP API",
                           Version = "v1",
                           Description = "The Science Microservice HTTP API"
                       });
                       options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                       {
                           Type = SecuritySchemeType.OAuth2,
                           Flows = new OpenApiOAuthFlows()
                           {
                               AuthorizationCode = new OpenApiOAuthFlow()
                               {
                                   AuthorizationUrl = new Uri($"{configuration.GetValue<string>("IdentityUrlExternal")}/connect/authorize"),
                                   TokenUrl = new Uri($"{configuration.GetValue<string>("IdentityUrlExternal")}/connect/token"),

                                   Scopes = new Dictionary<string, string>()
                                   {
                                       { "webshoppingagg", "Shopping Aggregator for Web Clients" }
                                   }
                               }
                           }
                       });

                       options.OperationFilter<AuthorizeCheckOperationFilter>();
                   });

            return services;
        }

        public static IServiceCollection AddCustomIntegrations(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IIdentityService, IdentityService>();
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

        public static IServiceCollection AddCustomConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions();
            // services.Configure<OrderingSettings>(configuration);
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Instance = context.HttpContext.Request.Path,
                        Status = StatusCodes.Status400BadRequest,
                        Detail = "Please refer to the errors property for additional details."
                    };

                    return new BadRequestObjectResult(problemDetails)
                    {
                        ContentTypes = { "application/problem+json", "application/problem+xml" }
                    };
                };
            });

            return services;
        }

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

        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            // prevent from mapping "sub" claim to nameidentifier.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("sub");

            var identityUrl = configuration.GetValue<string>("IdentityUrl");

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.Audience = "science.upload";
            });

            return services;
        }

        //public Startup(IConfiguration configuration)
        //    => this.Configuration = configuration;

        //public IConfiguration Configuration { get; }

        //public void ConfigureServices(IServiceCollection services)
        //{
        //    //services
        //    //   .AddCors()
        //    //  //.AddTokenAuthentication(this.Configuration, JwtConfiguration.BearerEvents)
        //    //  .AddWebService<ScienceDbContext>(this.Configuration)
        //    //  .AddMessaging(this.Configuration, typeof(MediaCreatedConsumer), typeof(PostCreatedConsumer), typeof(TextCreatedConsumer), typeof(PostUploadedConsumer))
        //    //  .AddSignalR();

        //    services.Configure<FormOptions>(options =>
        //    {
        //        options.ValueLengthLimit = int.MaxValue;
        //        options.MultipartBoundaryLengthLimit = int.MaxValue;
        //        options.MemoryBufferThreshold = int.MaxValue;
        //    });


        //    services.AddEntityFrameworkSqlServer()
        //           .AddDbContext<ScienceUploadDbContext>(options =>
        //           {
        //               options.UseSqlServer(this.Configuration["ConnectionString"],
        //                   sqlServerOptionsAction: sqlOptions =>
        //                   {
        //                       sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
        //                       sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
        //                   });
        //           },
        //               ServiceLifetime.Scoped  //Showing explicitly that the DbContext is shared across the HTTP request scope (graph of objects started in the HTTP request)
        //           );

        //    // Data repositories
        //    services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
        //    services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
        //    services.AddScoped<IDbQueryRunner, DbQueryRunner>();

        //    services.AddMvcCore().AddApiExplorer();


        //    // Add framework services.
        //    services.AddSwaggerGen(options =>
        //    {
        //        options.DescribeAllEnumsAsStrings();       // https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/1269
        //        options.SwaggerDoc("v1", new OpenApiInfo
        //        {
        //            Title = "WorldFeed - Science HTTP API",
        //            Version = "v1",
        //            Description = "The Science Microservice HTTP API"
        //        });
        //        options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
        //        {
        //            Type = SecuritySchemeType.OAuth2,
        //            Flows = new OpenApiOAuthFlows()
        //            {
        //                AuthorizationCode = new OpenApiOAuthFlow()
        //                {
        //                    AuthorizationUrl = new Uri($"{this.Configuration.GetValue<string>("IdentityUrlExternal")}/connect/authorize"),
        //                    TokenUrl = new Uri($"{this.Configuration.GetValue<string>("IdentityUrlExternal")}/connect/token"),

        //                    Scopes = new Dictionary<string, string>()
        //                    {
        //                        { "webshoppingagg", "Shopping Aggregator for Web Clients" }
        //                    }
        //                }
        //            }
        //        });

        //        options.OperationFilter<AuthorizeCheckOperationFilter>();
        //    });

        //}

        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        //{
        //    AutoMapperConfig.RegisterMappings(typeof(ErrorViewModel).GetTypeInfo().Assembly);

        //    // Usually, all the files in the wwwroot folder are servable for the client applications. We provide that by adding app.UseStaticFiles()
        //    // in the Startup class in the Configure method. Of course, our uploaded images will be stored in the Resources folder, and due to
        //    // that, we need to make it servable as well. To do that, let’s modify the Configure method in the Startup.cs class
        //    //
        //    app.UseStaticFiles();
        //    app.UseStaticFiles(new StaticFileOptions()
        //    {
        //        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
        //        RequestPath = new PathString("/Resources")
        //    });

        //    app
        //        .UseAuthentication()
        //        .UseAuthorization()
        //        .UseRouting()
        //        .UseCors(options => options
        //            .WithOrigins("http://localhost:4200")
        //            .AllowAnyHeader()
        //            .AllowAnyMethod()
        //            .AllowCredentials());

        //    app.UseSwagger()
        //    .UseSwaggerUI(c =>
        //    {
        //        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Science.Upload V1");
        //        c.OAuthClientId("science.uploadswaggerui");
        //        c.OAuthAppName("Science Upload Swagger UI");
        //    });

        //    app.UseEndpoints(endpoints =>
        //    {
        //        endpoints.MapDefaultControllerRoute();
        //        endpoints.MapControllers();
        //        endpoints.MapHealthChecks("/liveness", new HealthCheckOptions
        //        {
        //            Predicate = r => r.Name.Contains("self")
        //        });
        //        endpoints.MapHealthChecks("/hc", new HealthCheckOptions()
        //        {
        //            Predicate = _ => true,
        //            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        //        });
        //    });

        //    app.UseWebService(env).Initialize();
        //}
    }
}
