using Chessbook.Core.Domain.Logging;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Logging.Caching
{
    /// <summary>
    /// Represents an activity log cache event consumer
    /// </summary>
    public partial class ActivityLogCacheEventConsumer : CacheEventConsumer<ActivityLog>
    {
    }
}