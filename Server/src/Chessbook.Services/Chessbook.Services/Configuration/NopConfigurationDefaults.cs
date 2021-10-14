using Chessbook.Core.Caching;
using Chessbook.Core.Domain.Configuration;

namespace Chessbook.Services.Configuration
{
    /// <summary>
    /// Represents default values related to configuration services
    /// </summary>
    public static partial class NopConfigurationDefaults
    {
        #region Caching defaults

        /// <summary>
        /// Gets a key for caching
        /// </summary>
        public static CacheKey SettingsAllAsDictionaryCacheKey => new CacheKey("Nop.setting.all.dictionary.", NopEntityCacheDefaults<Setting>.Prefix);

        #endregion

        /// <summary>
        /// Gets the path to file that contains app settings
        /// </summary>
        public static string AppSettingsFilePath => "App_Data/appsettings.json";
    }
}
