namespace Chessbook.Data.Models.Post
{
    using global::System;
    using global::System.ComponentModel.DataAnnotations;

    using Chessbook.Data.Common.Models;
    using Chessbook.Data.Models.Post.Enums;

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

        /// <summary>
        /// Gets or sets a value indicating whether this vote is up or is down
        /// </summary>
        public bool IsUp { get; set; }

        /// <summary>
        /// Gets or sets the date and time of instance creation
        /// </summary>
        public DateTime CreatedOnUtc { get; set; }
    }
}
