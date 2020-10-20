namespace Sharebook.Profile.DTO
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public class RelationshipStateDTO : IRelationshipStateDTO
    {
        private List<string> connections;

        [JsonProperty("id")]
        public long TargetUserId { get; set; }

        [JsonProperty("id_str")]
        public string TargetUserIdStr { get; set; }

        [JsonProperty("name")]
        public string TargetUserName { get; set; }

        [JsonProperty("screen_name")]
        public string TargetUserScreenName { get; set; }

        [JsonIgnore]
        public bool Following { get; set; }
        
        [JsonIgnore]
        public bool FollowedBy { get; set; }

        [JsonIgnore]
        public bool FollowingRequested { get; set; }

        [JsonIgnore]
        public bool FollowingRequestReceived { get; set; }

        [JsonProperty("connections")]
        public List<string> Connections
        {
            get => this.connections;
            set
            {
                this.connections = value;
                UpdateConnectionInfos();
            }
        }
        
        private void UpdateConnectionInfos()
        {
            Following = this.connections.Contains("following");
            FollowedBy = this.connections.Contains("followed_by");
            FollowingRequested = this.connections.Contains("following_requested");
            FollowingRequestReceived = this.connections.Contains("following_received");
        }
    }
}
