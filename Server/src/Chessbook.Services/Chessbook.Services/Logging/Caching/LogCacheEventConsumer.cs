using Chessbook.Core.Domain.Logging;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Logging.Caching
{
    /// <summary>
    /// Represents a log cache event consumer
    /// </summary>
    public partial class LogCacheEventConsumer : CacheEventConsumer<Log>
    {
    }
}
