﻿using System.Threading.Tasks;

﻿using Chessbook.Core.Caching;
using Chessbook.Core.Domain.Directory;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Directory.Caching
{
    /// <summary>
    /// Represents a state province cache event consumer
    /// </summary>
    public partial class StateProvinceCacheEventConsumer : CacheEventConsumer<StateProvince>
    {
        /// <summary>
        /// Clear cache by entity event type
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <param name="entityEventType">Entity event type</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected override async Task ClearCacheAsync(StateProvince entity, EntityEventType entityEventType)
        {
            await RemoveByPrefixAsync(NopEntityCacheDefaults<StateProvince>.Prefix);
        }
    }
}
