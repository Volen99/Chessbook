namespace WorldFeed.Profile.DTO
{
    using System.Collections.Generic;

    public interface IRelationshipStateDTO
    {
        long TargetUserId { get; set; }
        string TargetUserIdStr { get; set; }
        
        string TargetUserName { get; set; }
        string TargetUserScreenName { get; set; }

        List<string> Connections { get; set; }

        bool Following { get; set; }
        bool FollowedBy { get; set; }
        bool FollowingRequested { get; set; }
        bool FollowingRequestReceived { get; set; }
    }
}
