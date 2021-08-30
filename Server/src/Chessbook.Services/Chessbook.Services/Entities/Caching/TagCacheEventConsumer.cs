using System.Threading.Tasks;

using Nop.Core.Caching;
using Chessbook.Core.Domain.Posts;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Entities.Caching
{
    public class TagCacheEventConsumer : CacheEventConsumer<Tag>
    {
        /// <summary>
        /// Clear cache by entity event type
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <param name="entityEventType">Entity event type</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected override async Task ClearCacheAsync(Tag entity, EntityEventType entityEventType)
        {
            await RemoveByPrefixAsync(NopEntityCacheDefaults<Tag>.Prefix);
        }
    }
}
