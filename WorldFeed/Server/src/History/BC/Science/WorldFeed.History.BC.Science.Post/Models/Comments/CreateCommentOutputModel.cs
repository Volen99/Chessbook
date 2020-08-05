namespace WorldFeed.History.API.Models.Comments
{
    using System;

    public class CreateCommentOutputModel
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public string FullText { get; set; }

        public bool Truncated { get; set; }

        public int[] DisplayTextRange { get; set; }

    }
}
