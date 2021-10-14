using System;
using System.Collections.Generic;

using Chessbook.Web.Areas.Admin.Models.Customers;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Posts
{
    public class PostCommentThreadModel
    {
        public PostCommentModel Comment { get; set; }

        public List<PostCommentThreadModel> Children { get; set; }
    }

    public record PostCommentModel : BaseNopEntityModel
    {
        public string Url { get; set; }

        public string Text { get; set; }


        public int ThreadId { get; set; }

        public int? InReplyToCommentId { get; set; }

        public int PostId { get; set; }


        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public bool IsDeleted { get; set; }

        public int TotalRepliesFromPostAuthor { get; set; }
        public int TotalReplies { get; set; }

        public CustomerModel Account { get; set; }

    }
}
