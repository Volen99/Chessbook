using Nop.Web.Framework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
