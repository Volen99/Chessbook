namespace WorldFeed.History.API.Data.Models.Comments
{
    using WorldFeed.Common.Models;

    public class Comment : BaseDeletableModel<int>
    {
        public string Text { get; set; }

        public int? ParentId { get; set; }
        public Comment Parent { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

        public string UserId { get; set; }
    }
}
