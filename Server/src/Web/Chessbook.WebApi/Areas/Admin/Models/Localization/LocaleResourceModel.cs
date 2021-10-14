using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Areas.Admin.Models.Localization
{
    /// <summary>
    /// Represents a locale resource model
    /// </summary>
    public partial record LocaleResourceModel : BaseNopEntityModel
    {
        #region Properties

        // [NopResourceDisplayName("Admin.Configuration.Languages.Resources.Fields.Name")]
        public string ResourceName { get; set; }

        // [NopResourceDisplayName("Admin.Configuration.Languages.Resources.Fields.Value")]
        public string ResourceValue { get; set; }

        public int LanguageId { get; set; }

        #endregion
    }
}
