namespace WorldFeed.History.API.Models.Comments
{
    using System.ComponentModel.DataAnnotations;
    
    public class CreateCommentRequestModel
    {
        [StringLength(21, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [StringLength(15000, MinimumLength = 3)]
        public string Content { get; set; }

        public int? ParentId { get; set; }
    }
}
