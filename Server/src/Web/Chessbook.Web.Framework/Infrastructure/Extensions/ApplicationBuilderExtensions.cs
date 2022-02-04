using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.Reflection;
using System.Runtime.ExceptionServices;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;
using WebMarkupMin.AspNetCore5;

using Chessbook.Common;
using Chessbook.Data;
using Chessbook.Core;
using Chessbook.Core.Caching;
using Chessbook.Core.Configuration;
using Chessbook.Core.Domain.Common;
using Chessbook.Core.Infrastructure;
using Chessbook.Data.Migrations;
using Chessbook.Services.Common;
using Chessbook.Services.Installation;
using Chessbook.Services.Logging;
using Chessbook.Services.Security;

namespace Chessbook.Web.Framework.Infrastructure.Extensions
{
    public partial record InstallModel : INopConnectionStringInfo
    {
        public InstallModel()
        {
            AvailableLanguages = new List<SelectListItem>();
            AvailableDataProviders = new List<SelectListItem>();
            AvailableCountries = new List<SelectListItem>();
        }

        [DataType(DataType.EmailAddress)]
        public string AdminEmail { get; set; }
        [DataType(DataType.Password)]
        public string AdminPassword { get; set; }
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        public bool UseCustomCollation { get; set; }

        public string Collation { get; set; }

        public bool CreateDatabaseIfNotExists { get; set; }
        public bool DisableSampleDataOption { get; set; }
        public bool InstallSampleData { get; set; }
        public bool ConnectionStringRaw { get; set; }

        public bool InstallRegionalResources { get; set; }

        public string DatabaseName { get; set; }
        public string ServerName { get; set; }

        public bool IntegratedSecurity { get; set; }

        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string ConnectionString { get; set; }

        public List<SelectListItem> AvailableLanguages { get; set; }

        public List<SelectListItem> AvailableCountries { get; set; }

        public DataProviderType DataProvider { get; set; }

        public string Country { get; set; }

        public List<SelectListItem> AvailableDataProviders { get; set; }
        public IDictionary<string, string> RawDataSettings => new Dictionary<string, string>();

        public string RestartUrl { get; set; }
    }

    /// <summary>
    /// Represents extensions of IApplicationBuilder
    /// </summary>
    public static class ApplicationBuilderExtensions
    {
        /// <summary>
        /// Configure the application HTTP request pipeline
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void ConfigureRequestPipeline(this IApplicationBuilder application)
        {
            EngineContext.Current.ConfigureRequestPipeline(application);
        }

        public static async void StartEngine(this IApplicationBuilder application)
        {
            var engine = EngineContext.Current;

            // further actions are performed only when the database is installed
            if (DataSettingsManager.IsDatabaseInstalled())
            {
                DbIsOn(engine);
            }
            else
            {
                var model = new InstallModel
                {
                    AdminEmail = "volen1999@gmail.com",
                    AdminPassword = "111111",
                    InstallSampleData = false, // TODO: was false!
                    // InstallRegionalResources = _appSettings.InstallationConfig.InstallRegionalResources,
                    // DisableSampleDataOption = _appSettings.InstallationConfig.DisableSampleData,
                    CreateDatabaseIfNotExists = true,
                    ServerName = "Chessbook",
                    ConnectionStringRaw = true,
                    ConnectionString = /*"Data Source=tcp:chessbook.database.windows.net,1433;Initial Catalog=chessbook;User Id=chessbook@chessbook;Password=Lovechess40"*/ "Server=.\\SQLEXPRESS;Database=Chessbook;Integrated Security=true;MultipleActiveResultSets=true",
                    Country = "United States of America",
                    DataProvider = DataProviderType.SqlServer,
                };

                var _fileProvider = EngineContext.Current.Resolve<INopFileProvider>();

                try
                {
                    var dataProvider = DataProviderManager.GetDataProvider(model.DataProvider);

                    var connectionString = model.ConnectionStringRaw ? model.ConnectionString : dataProvider.BuildConnectionString(model);

                    if (string.IsNullOrEmpty(connectionString))
                        throw new Exception("ConnectionStringWrongFormat");

                    await DataSettingsManager.SaveSettingsAsync(new DataSettings
                    {
                        DataProvider = model.DataProvider,
                        ConnectionString = connectionString
                    }, _fileProvider);

                    await DataSettingsManager.LoadSettingsAsync(reloadSettings: true);

                    if (model.CreateDatabaseIfNotExists)
                    {
                        try
                        {
                            dataProvider.CreateDatabase(model.Collation);
                        }
                        catch (Exception ex)
                        {
                            throw new Exception(string.Format(("DatabaseCreationError"), ex.Message));
                        }
                    }
                    else
                    {
                        //check whether database exists
                        if (!await dataProvider.DatabaseExistsAsync())
                            throw new Exception("DatabaseNotExists");
                    }

                    dataProvider.InitializeDatabase();

                    var cultureInfo = new CultureInfo(CBCommonDefaults.DefaultLanguageCulture);
                    var regionInfo = new RegionInfo(CBCommonDefaults.DefaultLanguageCulture);

                    var languagePackInfo = (DownloadUrl: string.Empty, Progress: 0);
                    if (model.InstallRegionalResources)
                    {
                        //try to get CultureInfo and RegionInfo
                        try
                        {
                            cultureInfo = new CultureInfo(model.Country[3..]);
                            regionInfo = new RegionInfo(model.Country[3..]);
                        }
                        catch { }

                        //get URL to download language pack
                        if (cultureInfo.Name != CBCommonDefaults.DefaultLanguageCulture)
                        {
                            try
                            {
                                //var client = EngineContext.Current.Resolve<NopHttpClient>();
                                //var languageCode = _locService.GetCurrentLanguage().Code[0..2];
                                //var resultString = await client.InstallationCompletedAsync(model.AdminEmail, languageCode, cultureInfo.Name);
                                //var result = JsonConvert.DeserializeAnonymousType(resultString,
                                //    new { Message = string.Empty, LanguagePack = new { Culture = string.Empty, Progress = 0, DownloadLink = string.Empty } });
                                //if (result.LanguagePack.Progress > NopCommonDefaults.LanguagePackMinTranslationProgressToInstall)
                                //{
                                //    languagePackInfo.DownloadUrl = result.LanguagePack.DownloadLink;
                                //    languagePackInfo.Progress = result.LanguagePack.Progress;
                                //}

                            }
                            catch { }
                        }

                        //upload CLDR
                        //var uploadService = EngineContext.Current.Resolve<IUploadService>();
                        //uploadService.UploadLocalePattern(cultureInfo);
                    }

                    // now resolve installation service
                    var installationService = EngineContext.Current.Resolve<IInstallationService>();
                    await installationService.InstallRequiredDataAsync(model.AdminEmail, model.AdminPassword, languagePackInfo, regionInfo, cultureInfo);

                    if (model.InstallSampleData)
                        await installationService.InstallSampleDataAsync(model.AdminEmail);

                    //register default permissions
                    //var permissionProviders = EngineContext.Current.Resolve<ITypeFinder>().FindClassesOfType<IPermissionProvider>();
                    var permissionProviders = new List<Type> { typeof(StandardPermissionProvider) };
                    foreach (var providerType in permissionProviders)
                    {
                        var provider = (IPermissionProvider)Activator.CreateInstance(providerType);
                        await EngineContext.Current.Resolve<IPermissionService>().InstallPermissionsAsync(provider);
                    }

                    // further actions are performed only when the database is installed
                    //if (DataSettingsManager.IsDatabaseInstalled())
                    //{
                        DbIsOn(engine);
                    //}
                }
                catch (Exception exception)
                {
                    //reset cache
                    DataSettingsManager.ResetCache();

                    var staticCacheManager = EngineContext.Current.Resolve<IStaticCacheManager>();
                    await staticCacheManager.ClearAsync();

                    //clear provider settings if something got wrong
                    await DataSettingsManager.SaveSettingsAsync(new DataSettings(), _fileProvider);

                    // ModelState.AddModelError(string.Empty, string.Format(_locService.GetResource("SetupFailed"), exception.Message));
                }
            }
        }

        private static void DbIsOn(IEngine engine)
        {
            // initialize and start schedule tasks
            Services.Tasks.TaskManager.Instance.Initialize();
            Services.Tasks.TaskManager.Instance.Start();

            //log application start
            engine.Resolve<ILogger>().InformationAsync("Application started").Wait();

            //update nopCommerce core and db
            var migrationManager = engine.Resolve<IMigrationManager>();
            var assembly = Assembly.GetAssembly(typeof(ApplicationBuilderExtensions));
            migrationManager.ApplyUpMigrations(assembly, true);
            assembly = Assembly.GetAssembly(typeof(IMigrationManager));
            migrationManager.ApplyUpMigrations(assembly, true);

#if DEBUG
            //prevent save the update migrations into the DB during the developing process  
            var versions = EngineContext.Current.Resolve<IRepository<MigrationVersionInfo>>();
            versions.DeleteAsync(mvi => mvi.Description.StartsWith(string.Format(NopMigrationDefaults.UpdateMigrationDescriptionPrefix, NopVersion.FULL_VERSION)));
#endif
        }

        /// <summary>
        /// Add exception handling
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseNopExceptionHandler(this IApplicationBuilder application)
        {
            var appSettings = EngineContext.Current.Resolve<AppSettings>();
            var webHostEnvironment = EngineContext.Current.Resolve<IWebHostEnvironment>();
            if (webHostEnvironment.IsDevelopment())
            {
                // get detailed exceptions for developing and testing purposes
                // application.UseDeveloperExceptionPage();
            }
            else
            {
                //or use special exception handler
                application.UseExceptionHandler("/Error/Error");
            }

            //log errors
            application.UseExceptionHandler(handler =>
            {
                handler.Run(async context =>
                {
                    var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
                    if (exception == null)
                        return;

                    try
                    {
                        //check whether database is installed
                        if (await DataSettingsManager.IsDatabaseInstalledAsync())
                        {
                            //get current customer
                            var currentCustomer = await EngineContext.Current.Resolve<IWorkContext>().GetCurrentCustomerAsync();

                            //log error
                            await EngineContext.Current.Resolve<ILogger>().ErrorAsync(exception.Message, exception, currentCustomer);
                        }
                    }
                    finally
                    {
                        //rethrow the exception to show the error page
                        ExceptionDispatchInfo.Throw(exception);
                    }
                });
            });
        }

        /// <summary>
        /// Adds a special handler that checks for responses with the 404 status code that do not have a body
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UsePageNotFound(this IApplicationBuilder application)
        {
            application.UseStatusCodePages(async context =>
            {
                //handle 404 Not Found
                if (context.HttpContext.Response.StatusCode == StatusCodes.Status404NotFound)
                {
                    var webHelper = EngineContext.Current.Resolve<IWebHelper>();
                    if (!webHelper.IsStaticResource())
                    {
                        //get original path and query
                        var originalPath = context.HttpContext.Request.Path;
                        var originalQueryString = context.HttpContext.Request.QueryString;

                        if (await DataSettingsManager.IsDatabaseInstalledAsync())
                        {
                            var commonSettings = EngineContext.Current.Resolve<CommonSettings>();

                            if (commonSettings.Log404Errors)
                            {
                                var logger = EngineContext.Current.Resolve<ILogger>();
                                var workContext = EngineContext.Current.Resolve<IWorkContext>();

                                await logger.ErrorAsync($"Error 404. The requested page ({originalPath}) was not found",
                                    customer: await workContext.GetCurrentCustomerAsync());
                            }
                        }

                        try
                        {
                            //get new path
                            var pageNotFoundPath = "/page-not-found";
                            //re-execute request with new path
                            context.HttpContext.Response.Redirect(context.HttpContext.Request.PathBase + pageNotFoundPath);
                        }
                        finally
                        {
                            //return original path to request
                            context.HttpContext.Request.QueryString = originalQueryString;
                            context.HttpContext.Request.Path = originalPath;
                        }
                    }
                }
            });
        }

        /// <summary>
        /// Adds a special handler that checks for responses with the 400 status code (bad request)
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseBadRequestResult(this IApplicationBuilder application)
        {
            application.UseStatusCodePages(async context =>
            {
                //handle 404 (Bad request)
                if (context.HttpContext.Response.StatusCode == StatusCodes.Status400BadRequest)
                {
                    var logger = EngineContext.Current.Resolve<ILogger>();
                    var workContext = EngineContext.Current.Resolve<IWorkContext>();
                    await logger.ErrorAsync("Error 400. Bad request", null, customer: await workContext.GetCurrentCustomerAsync());
                }
            });
        }

        /// <summary>
        /// Configure middleware for dynamically compressing HTTP responses
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseNopResponseCompression(this IApplicationBuilder application)
        {
            //if (!DataSettingsManager.IsDatabaseInstalled())
            //    return;

            // whether to use compression (gzip by default)
            if (/*EngineContext.Current.Resolve<CommonSettings>().UseResponseCompression*/true)
                application.UseResponseCompression();
        }

        /// <summary>
        /// Configure static file serving
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseNopStaticFiles(this IApplicationBuilder application)
        {
            var fileProvider = EngineContext.Current.Resolve<INopFileProvider>();
            var appSettings = EngineContext.Current.Resolve<AppSettings>();

            void staticFileResponse(StaticFileResponseContext context)
            {
                if (!string.IsNullOrEmpty(appSettings.CommonConfig.StaticFilesCacheControl))
                    context.Context.Response.Headers.Append(HeaderNames.CacheControl, appSettings.CommonConfig.StaticFilesCacheControl);
            }

            //common static files
            application.UseStaticFiles(new StaticFileOptions { OnPrepareResponse = staticFileResponse });

            //themes static files
            application.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(fileProvider.MapPath(@"Themes")),
                RequestPath = new PathString("/Themes"),
                OnPrepareResponse = staticFileResponse
            });

            //plugins static files
            var staticFileOptions = new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(fileProvider.MapPath(@"Plugins")),
                RequestPath = new PathString("/Plugins"),
                OnPrepareResponse = staticFileResponse
            };

            //exclude files in blacklist
            if (!string.IsNullOrEmpty(appSettings.CommonConfig.PluginStaticFileExtensionsBlacklist))
            {
                var fileExtensionContentTypeProvider = new FileExtensionContentTypeProvider();

                foreach (var ext in appSettings.CommonConfig.PluginStaticFileExtensionsBlacklist
                    .Split(';', ',')
                    .Select(e => e.Trim().ToLower())
                    .Select(e => $"{(e.StartsWith(".") ? string.Empty : ".")}{e}")
                    .Where(fileExtensionContentTypeProvider.Mappings.ContainsKey))
                {
                    fileExtensionContentTypeProvider.Mappings.Remove(ext);
                }

                staticFileOptions.ContentTypeProvider = fileExtensionContentTypeProvider;
            }

            application.UseStaticFiles(staticFileOptions);

            //add support for backups
            var provider = new FileExtensionContentTypeProvider
            {
                Mappings = { [".bak"] = MimeTypes.ApplicationOctetStream }
            };

            application.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(fileProvider.GetAbsolutePath(CBCommonDefaults.DbBackupsPath)),
                RequestPath = new PathString("/db_backups"),
                ContentTypeProvider = provider
            });

            //add support for webmanifest files
            provider.Mappings[".webmanifest"] = MimeTypes.ApplicationManifestJson;

            application.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(fileProvider.GetAbsolutePath("icons")),
                RequestPath = "/icons",
                ContentTypeProvider = provider
            });

            if (DataSettingsManager.IsDatabaseInstalled())
            {
                //application.UseStaticFiles(new StaticFileOptions
                //{
                //    FileProvider = new RoxyFilemanProvider(fileProvider.GetAbsolutePath(NopRoxyFilemanDefaults.DefaultRootDirectory.TrimStart('/').Split('/'))),
                //    RequestPath = new PathString(NopRoxyFilemanDefaults.DefaultRootDirectory),
                //    OnPrepareResponse = staticFileResponse
                //});
            }
        }

        /// <summary>
        /// Configure middleware checking whether requested page is keep alive page
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseKeepAlive(this IApplicationBuilder application)
        {
            // application.UseMiddleware<KeepAliveMiddleware>();
        }

        /// <summary>
        /// Configure middleware checking whether database is installed
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseInstallUrl(this IApplicationBuilder application)
        {
            application.UseMiddleware<InstallUrlMiddleware>();
        }

        /// <summary>
        /// Adds the authentication middleware, which enables authentication capabilities.
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseNopAuthentication(this IApplicationBuilder application)
        {
            //check whether database is installed
            if (!DataSettingsManager.IsDatabaseInstalled())
                return;

            // application.UseMiddleware<AuthenticationMiddleware>();
        }

        /// <summary>
        /// Configure the request localization feature
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseNopRequestLocalization(this IApplicationBuilder application)
        {
            application.UseRequestLocalization(async options =>
            {
                if (!await DataSettingsManager.IsDatabaseInstalledAsync())
                    return;

                ////prepare supported cultures
                //var cultures = (await EngineContext.Current.Resolve<ILanguageService>().GetAllLanguagesAsync())
                //    .OrderBy(language => language.DisplayOrder)
                //    .Select(language => new CultureInfo(language.LanguageCulture)).ToList();
                //options.SupportedCultures = cultures;
                //options.DefaultRequestCulture = new RequestCulture(cultures.FirstOrDefault());

                //options.AddInitialRequestCultureProvider(new NopRequestCultureProvider(options));
            });
        }

        /// <summary>
        /// Configure Endpoints routing
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseNopEndpoints(this IApplicationBuilder application)
        {
            //Execute the endpoint selected by the routing middleware
            //application.UseEndpoints(endpoints =>
            //{
            //    //register all routes
            //    EngineContext.Current.Resolve<IRoutePublisher>().RegisterRoutes(endpoints);
            //});


            // by mi 
            application.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        /// <summary>
        /// Configure WebMarkupMin
        /// </summary>
        /// <param name="application">Builder for configuring an application's request pipeline</param>
        public static void UseNopWebMarkupMin(this IApplicationBuilder application)
        {
            //check whether database is installed
            if (!DataSettingsManager.IsDatabaseInstalled())
                return;

            application.UseWebMarkupMin();
        }
    }
}
