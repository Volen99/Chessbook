namespace WorldFeed.History.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using WorldFeed.Common.Models;
    using WorldFeed.History.API.Data.Models.Comments;
    using WorldFeed.History.API.Data.Models.Enums;

    public class Vote : BaseModel<int>
    {
        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        [Required]
        public string UserId { get; set; }

        public VoteType Type { get; set; }
    }
}
