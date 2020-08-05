namespace WorldFeed.Science.API.Data.Models
{
    using WorldFeed.Common.Models;
    using WorldFeed.Science.API.Data.Models.Enums;

    public class Vote : BaseModel<int>
    {
        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        public string UserId { get; set; }

        public VoteType Type { get; set; }
    }
}
