using Microsoft.Extensions.DependencyInjection;

using Chessbook.Web.Api.Factories;
using Chessbook.Core.Configuration;
using Chessbook.Core.Infrastructure;
using Chessbook.Core.Infrastructure.DependencyManagement;
using Chessbook.Web.Factories;
using Chessbook.Web.Framework.Factories;

namespace Chessbook.Web.Infrastructure
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
            // common factories
            services.AddScoped<IAclSupportedModelFactory, AclSupportedModelFactory>();
            services.AddScoped<IStoreMappingSupportedModelFactory, StoreMappingSupportedModelFactory>();

            // admin factories
            // ...

            // factories
            services.AddScoped<IUserModelFactory, UserModelFactory>();
            services.AddScoped<IPollModelFactory, PollModelFactory>();
            services.AddScoped<IPostModelFactory, PostModelFactory>();
            services.AddScoped<IRelationshipModelFactory, RelationshipModelFactory>();
            services.AddScoped<IUserNotificationModelFactory, UserNotificationModelFactory>();
            services.AddScoped<IUserNotificationSettingModelFactory, UserNotificationSettingModelFactory>();
            services.AddScoped<IAbuseModelFactory, AbuseModelFactory>();
            services.AddScoped<IPreviewCardFactory, PreviewCardFactory>();
            services.AddScoped<IUserBlocklistFactory, UserBlocklistFactory>();
            services.AddScoped<IPrivateMessagesModelFactory, PrivateMessagesModelFactory>();
            services.AddScoped<ICommonModelFactory, CommonModelFactory>();
        }

        /// <summary>
        /// Gets order of this dependency registrar implementation
        /// </summary>
        public int Order => 2;
    }
}
