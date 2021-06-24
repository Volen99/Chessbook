using Chessbook.Data.Models.Post;
using Chessbook.Services.Caching;
using Nop.Services.Catalog;
using System.Threading.Tasks;

namespace Nop.Services.Forums.Caching
{
    /// <summary>
    /// Represents a forum post cache event consumer
    /// </summary>
    public partial class PostCacheEventConsumer : CacheEventConsumer<Post>
    {
        /// <summary>
        /// Clear cache data
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <param name="entityEventType">Entity event type</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected override async Task ClearCacheAsync(Post entity, EntityEventType entityEventType)
        {
            await RemoveAsync(NopCatalogDefaults.ProductsHomepageCacheKey);
            if (entityEventType == EntityEventType.Delete)
            {
                await RemoveByPrefixAsync(NopCatalogDefaults.FilterableSpecificationAttributeOptionsPrefix);
            }

            await base.ClearCacheAsync(entity, entityEventType);
        }
    }
}
