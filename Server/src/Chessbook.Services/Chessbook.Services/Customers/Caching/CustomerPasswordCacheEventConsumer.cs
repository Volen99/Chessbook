using Nop.Core.Domain.Customers;
using Chessbook.Services.Caching;

namespace Nop.Services.Customers.Caching
{
    /// <summary>
    /// Represents a customer password cache event consumer
    /// </summary>
    public partial class CustomerPasswordCacheEventConsumer : CacheEventConsumer<CustomerPassword>
    {
    }
}
