namespace Chessbook.Data.Models
{
    public class Relationship : BaseEntity
    {
        public int SourceId { get; set; }

        public int TargetId { get; set; }

        public bool Following { get; set; } // Are you following this user?

        public bool Requested { get; set; } // Do you have a pending follow request for this user?

        public bool FollowedBy { get; set; } //  Are you followed by this user?

        public bool Muting { get; set; } // Are you muting this user?

        public bool MutingNotifications { get; set; } // Are you muting notifications from this user?

        public bool Blocking { get; set; } // Are you blocking this user?

        public bool BlockedBy { get; set; } // Is this user blocking you?

    }
}
