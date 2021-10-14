using System.Threading.Tasks;

using Chessbook.Core.Domain.Security;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Security.Caching
{
    /// <summary>
    /// Represents a permission record cache event consumer
    /// </summary>
    public partial class PermissionRecordCacheEventConsumer : CacheEventConsumer<PermissionRecord>
    {
        /// <summary>
        /// Clear cache data
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected override async Task ClearCacheAsync(PermissionRecord entity)
        {
            await RemoveByPrefixAsync(NopSecurityDefaults.PermissionAllowedPrefix, entity.SystemName);
        }
    }
}
