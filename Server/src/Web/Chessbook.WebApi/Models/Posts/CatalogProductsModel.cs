using System.Collections.Generic;

using Chessbook.Web.Api.Areas.Admin.Models.Post;
using Chessbook.Web.Framework.UI.Paging;

namespace Chessbook.Web.Api.Models.Posts
{
    /// <summary>
    /// Represents a catalog products model
    /// </summary>
    public partial record CatalogProductsModel : BasePageableModel
    {
        #region Properties

        /// <summary>
        /// Get or set a value indicating whether use standart or AJAX products loading (applicable to 'paging', 'filtering', 'view modes') in catalog
        /// </summary>
        public bool UseAjaxLoading { get; set; }

        /// <summary>
        /// Gets or sets the warning message
        /// </summary>
        public string WarningMessage { get; set; }

        /// <summary>
        /// Gets or sets the message if there are no products to return
        /// </summary>
        public string NoResultMessage { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether product sorting is allowed
        /// </summary>
        public bool AllowProductSorting { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether customers are allowed to change view mode
        /// </summary>
        public bool AllowProductViewModeChanging { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether customers are allowed to select page size
        /// </summary>
        public bool AllowCustomersToSelectPageSize { get; set; }

        /// <summary>
        /// Gets or sets a order by
        /// </summary>
        public int? OrderBy { get; set; }

        /// <summary>
        /// Gets or sets a product sorting
        /// </summary>
        public string ViewMode { get; set; }

        /// <summary>
        /// Gets or sets the products
        /// </summary>
        public IList<PostModel> Products { get; set; }

        #endregion

        #region Ctor

        public CatalogProductsModel()
        {
            Products = new List<PostModel>();
        }

        #endregion
    }
}
