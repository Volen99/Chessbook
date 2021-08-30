namespace Chessbook.Core.Domain.Posts
{
    using global::System;

    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Data.Models;

    public class PostVote : BaseEntity
    {
        /// <summary>
        /// Gets or sets the forum post identifier
        /// </summary>
        public int PostId { get; set; }

        /// <summary>
        /// Gets or sets the customer identifier
        /// </summary>
        public int UserId { get; set; }

        public PostRateType Type { get; set; }

        /// <summary>
        /// Gets or sets the date and time of instance creation
        /// </summary>
        public DateTime CreatedOnUtc { get; set; }

        public DateTime UpdatedAt { get; set; }
            
    }
}
