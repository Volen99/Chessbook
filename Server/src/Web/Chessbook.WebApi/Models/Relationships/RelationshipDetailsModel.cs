using Nop.Web.Framework.Models;

namespace Chessbook.Web.Models.Outputs
{
    public partial record RelationshipDetailsModel : BaseNopEntityModel
    {
        public int SourceId { get; set; }
        public string SourceIdStr { get; }
        // public string SourceScreenName { get; }

        public int TargetId { get; set; }
        // public string TargetIdStr { get; }
        public string TargetScreenName { get; }

        public bool Following { get; set; }
        public bool FollowedBy { get; set; }

        //public bool FollowingReceived { get; set; }
        //public bool FollowingRequested { get; set; }

        //public bool NotificationsEnabled { get; set; }
        //public bool CanSendDirectMessage { get; set; }

        //public bool Blocking { get; set; }
        //public bool BlockedBy { get; set; }
        //public bool Muting { get; set; }

        //public bool WantRetweets { get; set; }
        //public bool AllReplies { get; set; }
        //public bool MarkedSpam { get; set; }
    }
}
