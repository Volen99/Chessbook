﻿using System.Threading.Tasks;

using Chessbook.Core.Domain.Customers;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Customers.Caching
{
    /// <summary>
    /// Represents a customer customer role mapping cache event consumer
    /// </summary>
    public partial class CustomerCustomerRoleMappingCacheEventConsumer : CacheEventConsumer<CustomerCustomerRoleMapping>
    {
        /// <summary>
        /// Clear cache data
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected override async Task ClearCacheAsync(CustomerCustomerRoleMapping entity)
        {
            await RemoveByPrefixAsync(NopCustomerServicesDefaults.CustomerCustomerRolesPrefix);
        }
    }
}
