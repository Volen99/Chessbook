namespace Sharebook.Data.Models.Post
{
    using global::System;
    using global::System.ComponentModel.DataAnnotations;

    using Sharebook.Data.Common.Models;

    public class PostVote : BaseDeletableModel<long>
    {
        /// <summary>
        /// Gets or sets the forum post identifier
        /// </summary>
        public long PostId { get; set; }
        public virtual Post Post { get; set; }

        /// <summary>
        /// Gets or sets the customer identifier
        /// </summary>
        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }

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
