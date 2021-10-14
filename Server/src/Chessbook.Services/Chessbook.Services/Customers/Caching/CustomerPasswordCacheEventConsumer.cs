using Chessbook.Core.Domain.Customers;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Customers.Caching
{
    /// <summary>
    /// Represents a customer password cache event consumer
    /// </summary>
    public partial class CustomerPasswordCacheEventConsumer : CacheEventConsumer<CustomerPassword>
    {
    }
}
