using Chessbook.Data.Models;
using System;

namespace Chessbook.Core.Domain.Videos
{
    public class YoutubeVideo : BaseEntity
    {
        public string VideoId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ThumbUrl { get; set; }

        public int UserId { get; set; }
        public Customer User { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
