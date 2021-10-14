using Chessbook.Core.Domain.Messages;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Messages.Caching
{
    /// <summary>
    /// Represents an email account cache event consumer
    /// </summary>
    public partial class EmailAccountCacheEventConsumer : CacheEventConsumer<EmailAccount>
    {
    }
}
