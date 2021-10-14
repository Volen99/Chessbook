using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Areas.Admin.Models.Customers
{
    /// <summary>
    /// Represents a customer list model
    /// </summary>
    public partial record CustomerListModel : BasePagedListModel<CustomerModel>
    {
    }
}