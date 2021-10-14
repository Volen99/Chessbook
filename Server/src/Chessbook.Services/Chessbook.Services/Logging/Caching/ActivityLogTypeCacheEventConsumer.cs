using System.Threading.Tasks;

using Chessbook.Core.Domain.Logging;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Logging.Caching
{
    /// <summary>
    /// Represents a activity log type cache event consumer
    /// </summary>
    public partial class ActivityLogTypeCacheEventConsumer : CacheEventConsumer<ActivityLogType>
    {
    }
}
