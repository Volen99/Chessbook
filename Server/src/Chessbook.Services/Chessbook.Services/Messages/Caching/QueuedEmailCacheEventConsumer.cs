using Chessbook.Core.Domain.Messages;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Messages.Caching
{
    /// <summary>
    /// Represents an queued email cache event consumer
    /// </summary>
    public partial class QueuedEmailCacheEventConsumer : CacheEventConsumer<QueuedEmail>
    {
    }
}
