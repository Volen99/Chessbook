using Nop.Core.Domain.Tasks;
using Chessbook.Services.Caching;

namespace Nop.Services.Tasks.Caching
{
    /// <summary>
    /// Represents a schedule task cache event consumer
    /// </summary>
    public partial class ScheduleTaskCacheEventConsumer : CacheEventConsumer<ScheduleTask>
    {
    }
}
