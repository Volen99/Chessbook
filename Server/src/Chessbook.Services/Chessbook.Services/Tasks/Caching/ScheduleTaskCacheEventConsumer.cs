using Chessbook.Core.Domain.Tasks;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Tasks.Caching
{
    /// <summary>
    /// Represents a schedule task cache event consumer
    /// </summary>
    public partial class ScheduleTaskCacheEventConsumer : CacheEventConsumer<ScheduleTask>
    {
    }
}
