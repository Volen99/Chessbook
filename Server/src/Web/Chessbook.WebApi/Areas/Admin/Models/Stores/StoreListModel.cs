using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Areas.Admin.Models.Stores
{
    /// <summary>
    /// Represents a store list model
    /// </summary>
    public partial record StoreListModel : BasePagedListModel<StoreModel>
    {
    }
}