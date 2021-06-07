namespace Chessbook.Web.Api
{
    using System;
    using System.IO;
    using Serilog;
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Nop.Services.Configuration;
    using Autofac.Extensions.DependencyInjection;
    using System.Threading.Tasks;

    public class Program
    {
        public static readonly string Namespace = typeof(Program).Namespace;
        public static readonly string AppName = Namespace[(Namespace.LastIndexOf('.', Namespace.LastIndexOf('.') - 1) + 1)..];

        public static async Task Main(string[] args)
        {
            // initialize the host
            using var host = Host.CreateDefaultBuilder(args)
                .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webBuilder => webBuilder
                    .ConfigureAppConfiguration(config =>
                    {
                        config
                            .AddJsonFile(NopConfigurationDefaults.AppSettingsFilePath, true, true)
                            .AddEnvironmentVariables();
                    })
                    .UseStartup<Startup>())
                .Build();

            // start the program, a task will be completed when the host starts
            await host.StartAsync();

            // a task will be completed when shutdown is triggered
            await host.WaitForShutdownAsync();
        }



        //public static int Main(string[] args)
        //{
        //    var configuration = GetConfiguration();

        //    Log.Logger = CreateSerilogLogger(configuration);

        //    try
        //    {
        //        Log.Information("Configuring web host ({ApplicationContext})...", AppName);
        //        var host = BuildWebHost(configuration, args);

        //        Log.Information("Applying migrations ({ApplicationContext})...", AppName);

        //        Log.Information("Starting web host ({ApplicationContext})...", AppName);
        //        host.Run();

        //        return 0;
        //    }
        //    catch (Exception ex)
        //    {
        //        Log.Fatal(ex, "Program terminated unexpectedly ({ApplicationContext})!", AppName);
        //        return 1;
        //    }
        //    finally
        //    {
        //        Log.CloseAndFlush();
        //    }
        //}

        //private static IWebHost BuildWebHost(IConfiguration configuration, string[] args) =>
        //     WebHost.CreateDefaultBuilder(args)
        //         .CaptureStartupErrors(false)
        //         .ConfigureAppConfiguration(x => x.AddConfiguration(configuration))
        //         .UseStartup<Startup>()
        //         .UseContentRoot(Directory.GetCurrentDirectory())
        //         .UseSerilog()
        //         .Build();

        //private static Serilog.ILogger CreateSerilogLogger(IConfiguration configuration)
        //{
        //    var seqServerUrl = configuration["Serilog:SeqServerUrl"];
        //    var logstashUrl = configuration["Serilog:LogstashgUrl"];
        //    return new LoggerConfiguration()
        //        .MinimumLevel.Verbose()
        //        .Enrich.WithProperty("ApplicationContext", AppName)
        //        .Enrich.FromLogContext()
        //        .WriteTo.Console()
        //        .WriteTo.Seq(string.IsNullOrWhiteSpace(seqServerUrl) ? "http://seq" : seqServerUrl)
        //        .WriteTo.Http(string.IsNullOrWhiteSpace(logstashUrl) ? "http://localhost:8080" : logstashUrl)
        //        .ReadFrom.Configuration(configuration)
        //        .CreateLogger();
        //}

        //private static IConfiguration GetConfiguration()
        //{
        //    var builder = new ConfigurationBuilder()
        //        .SetBasePath(Directory.GetCurrentDirectory())
        //        .AddJsonFile(NopConfigurationDefaults.AppSettingsFilePath, true, true)          // .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        //        .AddEnvironmentVariables();

        //    return builder.Build();
        //}
    }
}
