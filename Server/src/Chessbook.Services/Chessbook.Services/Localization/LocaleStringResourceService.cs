using Chessbook.Data;
using System.Linq;
using System.Linq.Expressions;
using Nop.Core;
using Nop.Core.Caching;
using Nop.Core.Domain.Localization;
using Nop.Services.Configuration;
using Nop.Services.Localization;
using Nop.Services.Logging;
using System;
using System.Threading.Tasks;

namespace Chessbook.Services.Localization
{
    public class LocaleStringResourceService : ILocaleStringResourceService
    {
        #region Fields

        private readonly ILogger _logger;
        private readonly IRepository<LocaleStringResource> _lsrRepository;
        private readonly ISettingService _settingService;
        private readonly IStaticCacheManager _staticCacheManager;
        private readonly IWorkContext _workContext;

        #endregion

        public LocaleStringResourceService(ILogger logger,
            IRepository<LocaleStringResource> lsrRepository,
            ISettingService settingService,
            IStaticCacheManager staticCacheManager,
            IWorkContext workContext)
        {
            _logger = logger;
            _lsrRepository = lsrRepository;
            _settingService = settingService;
            _staticCacheManager = staticCacheManager;
            _workContext = workContext;
        }

        /// <summary>
        /// Gets a resource string based on the specified ResourceKey property.
        /// </summary>
        /// <param name="resourceKey">A string representing a ResourceKey.</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains a string representing the requested resource string.
        /// </returns>
        public virtual async Task<string> GetResourceAsync(string resourceKey)
        {
            return await GetResourceAsync(resourceKey, 1);
        }

        /// <summary>
        /// Gets a resource string based on the specified ResourceKey property.
        /// </summary>
        /// <param name="resourceKey">A string representing a ResourceKey.</param>
        /// <param name="languageId">Language identifier</param>
        /// <param name="logIfNotFound">A value indicating whether to log error if locale string resource is not found</param>
        /// <param name="defaultValue">Default value</param>
        /// <param name="returnEmptyIfNotFound">A value indicating whether an empty string will be returned if a resource is not found and default value is set to empty string</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains a string representing the requested resource string.
        /// </returns>
        public virtual async Task<string> GetResourceAsync(string resourceKey, int languageId, bool logIfNotFound = true, string defaultValue = "", bool returnEmptyIfNotFound = false)
        {
            var result = string.Empty;
            if (resourceKey == null)
            {
                resourceKey = string.Empty;
            }

            resourceKey = resourceKey.Trim().ToLowerInvariant();
            //if (_localizationSettings.LoadAllLocaleRecordsOnStartup)
            //{
            //    // load all records (we know they are cached)
            //    var resources = await GetAllResourceValuesAsync(languageId, !resourceKey.StartsWith(NopLocalizationDefaults.AdminLocaleStringResourcesPrefix, StringComparison.InvariantCultureIgnoreCase));
            //    if (resources.ContainsKey(resourceKey))
            //    {
            //        result = resources[resourceKey].Value;
            //    }
            //}
            //else
            //{
                // gradual loading
                var key = _staticCacheManager.PrepareKeyForDefaultCache(NopLocalizationDefaults.LocaleStringResourcesByNameCacheKey
                    , languageId, resourceKey);

                var query = from l in _lsrRepository.Table
                            where l.ResourceName == resourceKey
                                  && l.LanguageId == languageId
                            select l.ResourceValue;

                var lsr = await _staticCacheManager.GetAsync(key, async () => await query.FirstOrDefaultAsyncExt());

            if (lsr != null)
            {
                result = lsr;
            }
            //}

            if (!string.IsNullOrEmpty(result))
                return result;

            if (logIfNotFound)
                await _logger.WarningAsync($"Resource string ({resourceKey}) is not found. Language ID = {languageId}");

            if (!string.IsNullOrEmpty(defaultValue))
            {
                result = defaultValue;
            }
            else
            {
                if (!returnEmptyIfNotFound)
                    result = resourceKey;
            }

            return result;
        }

    }
}
