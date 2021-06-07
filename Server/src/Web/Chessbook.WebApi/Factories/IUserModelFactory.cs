using System.Threading.Tasks;
using Chessbook.Data.Models;
using Chessbook.Web.Models;
using Nop.Web.Areas.Admin.Models.Customers;

namespace Chessbook.Web.Api.Factories
{
    public interface IUserModelFactory
    {
        /// <summary>
        /// Prepare customer model
        /// </summary>
        /// <param name="model">Customer model</param>
        /// <param name="customer">Customer</param>
        /// <param name="excludeProperties">Whether to exclude populating of some properties of model</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer model
        /// </returns>
        Task<CustomerModel> PrepareCustomerModelAsync(CustomerModel model, Customer customer, bool excludeProperties = false);

        /// <summary>
        /// Prepare the customer avatar model
        /// </summary>
        /// <param name="model">Customer avatar model</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer avatar model
        /// </returns>
        Task<string> PrepareCustomerAvatarModelAsync(int userId);
    }

}
