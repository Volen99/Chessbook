using System;
using System.Collections.Generic;

using Chessbook.Data.Models;

namespace Chessbook.Core.Domain.Posts
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
