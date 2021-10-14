using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Directory;
using Chessbook.Data.Models;

namespace Chessbook.Services.ExportImport
{
    /// <summary>
    /// Export manager interface
    /// </summary>
    public partial interface IExportManager
    {
        /// <summary>
        /// Export customer list to XLSX
        /// </summary>
        /// <param name="customers">Customers</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task<byte[]> ExportCustomersToXlsxAsync(IList<Customer> customers);

        /// <summary>
        /// Export customer list to XML
        /// </summary>
        /// <param name="customers">Customers</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result in XML format
        /// </returns>
        Task<string> ExportCustomersToXmlAsync(IList<Customer> customers);

        /// <summary>
        /// Export states to TXT
        /// </summary>
        /// <param name="states">States</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result in TXT (string) format
        /// </returns>
        Task<string> ExportStatesToTxtAsync(IList<StateProvince> states);

        /// <summary>
        /// Export customer info (GDPR request) to XLSX 
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="storeId">Store identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer GDPR info
        /// </returns>
        Task<byte[]> ExportCustomerGdprInfoToXlsxAsync(Customer customer, int storeId);
    }
}
