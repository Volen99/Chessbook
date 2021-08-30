using System.Threading.Tasks;

using Nop.Services.Catalog;
using Chessbook.Core.Domain.Posts;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Entities.Caching
{
    public class PostTagCacheEventConsumer : CacheEventConsumer<PostTag>
    {
        /// <summary>
        /// Clear cache data
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected override async Task ClearCacheAsync(PostTag entity)
        {
            await RemoveAsync(NopCatalogDefaults.ProductTagsByProductCacheKey, entity.PostId);
        }
    }
}
