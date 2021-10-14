using Chessbook.Core.Domain.Messages;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Messages.Caching
{
    /// <summary>
    /// Represents news letter subscription cache event consumer
    /// </summary>
    public partial class NewsLetterSubscriptionCacheEventConsumer : CacheEventConsumer<NewsLetterSubscription>
    {    
    }
}
