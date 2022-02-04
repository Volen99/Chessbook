using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

using Chessbook.Common;
using Chessbook.Data;
using Chessbook.Data.Models;
using Chessbook.Core;
using Chessbook.Core.Caching;
using Chessbook.Core.Configuration;
using Chessbook.Core.Events;
using Chessbook.Core.Infrastructure;
using Chessbook.Core.Infrastructure.DependencyManagement;
using Chessbook.Core.JsonConverters.Logic;
using Chessbook.Core.JsonConverters;
using Chessbook.Services.Common;
using Chessbook.Services.Configuration;
using Chessbook.Services.Events;
using Chessbook.Services.Helpers;
using Chessbook.Services.Logging;
using Chessbook.Services.Security;
using Chessbook.Services.Tasks;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Services.Installation;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services;
using Chessbook.Services.ExportImport;
using Chessbook.Services.Directory;
using Chessbook.Services.Stores;
using Chessbook.Services.Authentication;
using Chessbook.Services.Customers;
using Chessbook.Services.Localization;
using Chessbook.Services.Notifications;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Services.Abuses;
using Chessbook.Services.Relationships;
using Chessbook.Services.Entities;
using Chessbook.Services.Tournaments;
using Chessbook.Services.Data;
using Chessbook.Services.Blocklist;
using Chessbook.Services.Cards;
using Chessbook.Services.Chat;
using Chessbook.Services.Messages;
using Chessbook.Services.Media;
using Chessbook.Services.Gdpr;
using Chessbook.Services.APIs;
using Chessbook.Services.Feedback;
using Chessbook.Services.Donations;

namespace Chessbook.Web.Framework.Infrastructure
{
    /// <summary>
    /// Dependency registrar
    /// </summary>
    public class DependencyRegistrar : IDependencyRegistrar
    {
        /// <summary>
        /// Register services and interfaces
        /// </summary>
        /// <param name="services">Collection of service descriptors</param>
        /// <param name="typeFinder">Type finder</param>
        /// <param name="appSettings">App settings</param>
        public virtual void Register(IServiceCollection services, ITypeFinder typeFinder, AppSettings appSettings)
        {
            // file provider
            services.AddScoped<INopFileProvider, NopFileProvider>();

            // web helper
            services.AddScoped<IWebHelper, WebHelper>();

            // user agent helper
            services.AddScoped<IUserAgentHelper, UserAgentHelper>();

            // data layer
            services.AddTransient<IDataProviderManager, DataProviderManager>();
            services.AddTransient(serviceProvider => serviceProvider.GetRequiredService<IDataProviderManager>().DataProvider);

            // repositories
            services.AddScoped(typeof(IRepository<>), typeof(EntityRepository<>));

            // plugins
            //.. 

            // static cache manager
            if (appSettings.DistributedCacheConfig.Enabled)
            {
                services.AddScoped<ILocker, DistributedCacheManager>();
                services.AddScoped<IStaticCacheManager, DistributedCacheManager>();
            }
            else
            {
                services.AddSingleton<ILocker, MemoryCacheManager>();
                services.AddSingleton<IStaticCacheManager, MemoryCacheManager>();
            }

            // work context
            services.AddScoped<IWorkContext, WebWorkContext>();

            // store context
            services.AddScoped<IStoreContext, WebStoreContext>();

            // services
            services.AddScoped<IGenericAttributeService, GenericAttributeService>();
            services.AddScoped<ICustomerAttributeFormatter, CustomerAttributeFormatter>();
            services.AddScoped<ICustomerAttributeParser, CustomerAttributeParser>();
            services.AddScoped<ICustomerAttributeService, CustomerAttributeService>();
            services.AddScoped<IUserService, UserService<Customer>>();
            services.AddScoped<ICustomerRegistrationService, CustomerRegistrationService>();
            services.AddScoped<IPermissionService, PermissionService>();
            services.AddScoped<IAclService, AclService>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<IStoreService, StoreService>();
            services.AddScoped<IStoreMappingService, StoreMappingService>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddScoped<IDownloadService, DownloadService>();
            services.AddScoped<IMessageTemplateService, MessageTemplateService>();
            services.AddScoped<IQueuedEmailService, QueuedEmailService>();
            services.AddScoped<IEmailAccountService, EmailAccountService>();
            services.AddScoped<IWorkflowMessageService, WorkflowMessageService>();
            services.AddScoped<IMessageTokenProvider, MessageTokenProvider>();
            services.AddScoped<ITokenizer, Tokenizer>();
            services.AddScoped<ISmtpBuilder, SmtpBuilder>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddScoped<IEncryptionService, EncryptionService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ILogger, DefaultLogger>();
            services.AddScoped<ICustomerActivityService, CustomerActivityService>();
            services.AddScoped<IGdprService, GdprService>();
            services.AddScoped<IPollService, PollService>();
            services.AddScoped<IDateTimeHelper, DateTimeHelper>();
            services.AddScoped<IScheduleTaskService, ScheduleTaskService>();
            services.AddScoped<IExportManager, ExportManager>();
            services.AddScoped<IImportManager, ImportManager>();
            services.AddScoped<IPostsService, PostsService>();
            services.AddScoped<IUserNotificationService, UserNotificationService>();
            services.AddScoped<INotificationHubService, NotificationHubService>();
            services.AddScoped<INotificationsSettingsService, NotificationsSettingsService>();
            services.AddScoped<IAbuseService, AbuseService>();
            services.AddScoped<IFollowService, FollowService>();
            services.AddScoped<IPostCommentService, PostCommentService>();
            services.AddScoped<IPostTagService, PostTagService>();
            services.AddScoped<ITournamentService, TournamentService>();
            services.AddScoped<IStreamersService, StreamersService>();
            services.AddScoped<IRelationshipService, RelationshipService>();
            services.AddScoped<IJsonObjectConverter, JsonObjectConverter>();
            services.AddScoped<IJsonConvertWrapper, JsonConvertWrapper>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IBlocklistService, BlocklistService>();
            services.AddScoped<IPreviewCardService, PreviewCardService>();
            services.AddScoped<IRepostService, RepostService>();
            services.AddSingleton<IEventPublisher, EventPublisher>();
            services.AddScoped<ISettingService, SettingService>();
            services.AddScoped<ISettingsService, SettingsService>();
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<ITwitchService, TwitchService>();
            services.AddScoped<IUserFeedbackService, UserFeedbackService>();
            services.AddScoped<IYoutubeService, YoutubeService>();
            services.AddScoped<IDonatorService, DonatorService>();
            services.AddScoped<IFrontendConfigService, FrontendConfigService>();

            // plugin managers
            // ..

            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            // register all settings
            var settings = typeFinder.FindClassesOfType(typeof(ISettings), false).ToList();
            foreach (var setting in settings)
            {
                services.AddScoped(setting, serviceProvider =>
                {
                    var storeId = DataSettingsManager.IsDatabaseInstalled()
                        ? serviceProvider.GetRequiredService<IStoreContext>().GetCurrentStore()?.Id ?? 0
                        : 0;

                    return serviceProvider.GetRequiredService<ISettingService>().LoadSettingAsync(setting, storeId).Result;
                });
            }

            // picture service
            if (false) // appSettings.AzureBlobConfig.Enabled
            {
                // services.AddScoped<IPictureService, AzurePictureService>();
            }
            else
            {
                services.AddScoped<IPictureService, PictureService>();
            }

            //// roxy file manager service
            //services.AddTransient<DatabaseRoxyFilemanService>();
            //services.AddTransient<FileRoxyFilemanService>();

            //services.AddScoped<IRoxyFilemanService>(serviceProvider =>
            //{
            //    return serviceProvider.GetRequiredService<IPictureService>().IsStoreInDbAsync().Result
            //        ? serviceProvider.GetRequiredService<DatabaseRoxyFilemanService>()
            //        : serviceProvider.GetRequiredService<FileRoxyFilemanService>();
            //});

            //installation service
            if (!DataSettingsManager.IsDatabaseInstalled())
            {
                services.AddScoped<IInstallationService, InstallationService>();
            }

            //// slug route transformer
            //if (DataSettingsManager.IsDatabaseInstalled())
            //{
            //    services.AddScoped<SlugRouteTransformer>();
            //}

            // event consumers
            var consumers = typeFinder.FindClassesOfType(typeof(IConsumer<>)).ToList();
            foreach (var consumer in consumers)
                foreach (var findInterface in consumer.FindInterfaces((type, criteria) =>
                {
                    var isMatch = type.IsGenericType && ((Type)criteria).IsAssignableFrom(type.GetGenericTypeDefinition());
                    return isMatch;
                }, typeof(IConsumer<>)))
                    services.AddScoped(findInterface, consumer);
        }

        /// <summary>
        /// Gets order of this dependency registrar implementation
        /// </summary>
        public int Order => 0;
    }
}
