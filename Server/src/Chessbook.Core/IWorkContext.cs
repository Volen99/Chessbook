using System.Threading.Tasks;

using Chessbook.Data.Models;
using Chessbook.Core.Domain.Localization;

namespace Chessbook.Core
{
    /// <summary>
    /// Represents work context
    /// </summary>
    public interface IWorkContext
    {
        /// <summary>
        /// Gets the current customer
        /// </summary>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task<Customer> GetCurrentCustomerAsync();

        /// <summary>
        /// Sets the current customer
        /// </summary>
        /// <param name="customer">Current customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task SetCurrentCustomerAsync(Customer customer = null);

        /// <summary>
        /// Gets the original customer (in case the current one is impersonated)
        /// </summary>
        Customer OriginalCustomerIfImpersonated { get; }

        /// <summary>
        /// Gets current user working language
        /// </summary>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task<Language> GetWorkingLanguageAsync();
    }
}
