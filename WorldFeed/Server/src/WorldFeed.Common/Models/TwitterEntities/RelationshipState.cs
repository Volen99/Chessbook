namespace WorldFeed.Common.Models.TwitterEntities
{

    using global::WorldFeed.Common.Public.Models.Interfaces;
    using global::WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class RelationshipState : IRelationshipState
    {

        public RelationshipState(IRelationshipStateDTO relationshipStateDTO)
        {
            RelationshipStateDTO = relationshipStateDTO;
        }

        public IRelationshipStateDTO RelationshipStateDTO { get; set; }

        public long TargetId => RelationshipStateDTO.TargetUserId;

        public string TargetIdStr => RelationshipStateDTO.TargetUserIdStr;

        public string TargetName => RelationshipStateDTO.TargetUserName;

        public string TargetScreenName => RelationshipStateDTO.TargetUserScreenName;

        public bool Following => RelationshipStateDTO.Following;

        public bool FollowedBy => RelationshipStateDTO.FollowedBy;

        public bool FollowingRequested => RelationshipStateDTO.FollowingRequested;

        public bool FollowingRequestReceived => RelationshipStateDTO.FollowingRequestReceived;
    }
}
