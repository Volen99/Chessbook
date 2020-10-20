using WorldFeed.Common.Models;
using WorldFeed.History.BC.Science.Data.Models.Enums;

namespace WorldFeed.History.BC.Science.Data.Models
{
    public class Vote : BaseModel<int>
    {
        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        public string UserId { get; set; }

        public VoteType Type { get; set; }
    }
}
