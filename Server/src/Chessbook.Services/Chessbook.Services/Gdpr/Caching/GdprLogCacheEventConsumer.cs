using Chessbook.Core.Domain.Gdpr;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Gdpr.Caching
{
    /// <summary>
    /// Represents a GDPR log cache event consumer
    /// </summary>
    public partial class GdprLogCacheEventConsumer : CacheEventConsumer<GdprLog>
    {
    }
}
