using Chessbook.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Data.Models.Post
{
    public class PostReshare : BaseDeletableModel<int>
    {
        // originalPostId
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public int ResharedPostId { get; set; }

        public int UserId { get; set; } // the creator of this share..
    }
}
