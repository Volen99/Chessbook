using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Models.Outputs
{
    public partial record RelationshipDetailsModel : BaseNopEntityModel
    {
        public bool Following { get; set; }

        public bool FollowedBy { get; set; }

        public bool Blocking { get; set; }

        public bool BlockedBy { get; set; }

        public bool Requested { get; set; }

        public bool Endorsed { get; set; }

        public string Note { get; set; }
    }
}
