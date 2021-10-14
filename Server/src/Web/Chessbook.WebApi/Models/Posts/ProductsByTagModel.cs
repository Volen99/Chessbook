using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Posts
{
    public partial record ProductsByTagModel : BaseNopEntityModel
    {
        public ProductsByTagModel()
        {
            CatalogProductsModel = new CatalogProductsModel();
        }

        public string TagName { get; set; }
        public string TagSeName { get; set; }

        public CatalogProductsModel CatalogProductsModel { get; set; }
    }
}
