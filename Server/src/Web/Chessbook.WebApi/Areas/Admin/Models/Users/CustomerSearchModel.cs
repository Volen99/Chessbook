using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Areas.Admin.Models.Users
{
    /// <summary>
    /// Represents a customer search model
    /// </summary>
    public partial record CustomerSearchModel : BaseSearchModel, IAclSupportedModel
    {
        #region Ctor

        public CustomerSearchModel()
        {
            SelectedCustomerRoleIds = new List<int>();
            AvailableCustomerRoles = new List<SelectListItem>();
        }

        #endregion

        #region Properties

        public IList<int> SelectedCustomerRoleIds { get; set; }

        public IList<SelectListItem> AvailableCustomerRoles { get; set; }

        public string SearchEmail { get; set; }

        public string SearchUsername { get; set; }

        public string SearchFirstName { get; set; }
        public bool FirstNameEnabled { get; set; }

        public string SearchDayOfBirth { get; set; }

        public string SearchMonthOfBirth { get; set; }

        public bool DateOfBirthEnabled { get; set; }

        public string SearchIpAddress { get; set; }



        public bool Blocked { get; set; }

        public int Count { get; set; }

        public string Search { get; set; }

        public string Sort { get; set; }

        #endregion
    }
}
