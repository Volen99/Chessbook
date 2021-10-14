using Chessbook.Core.Domain.Messages;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Messages.Caching
{
    /// <summary>
    /// Represents a campaign cache event consumer
    /// </summary>
    public partial class CampaignCacheEventConsumer : CacheEventConsumer<Campaign>
    {
    }
}
