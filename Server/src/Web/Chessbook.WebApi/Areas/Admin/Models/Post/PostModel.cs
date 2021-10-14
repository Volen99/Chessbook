namespace Chessbook.Web.Api.Areas.Admin.Models.Post
{
    using System;
    using System.Collections.Generic;

    using Chessbook.Web.Areas.Admin.Models.Customers;
    using Chessbook.Web.Framework.Models;
    using Chessbook.Web.Models.Polls;
    using Chessbook.Web.Api.Models.Posts;
    using Chessbook.Web.Api.Models.Cards;

    public partial record PostModel : BaseNopEntityModel
    {
        public PostModel()
        {
            this.Entities = new ObjectEntitiesDTO
            {
                Poll = this.Poll,
            };

            this.Tags = new List<PostTagModel>();
        }

        public string IdStr => this.Id.ToString();

        public string Status { get; set; }

        public string FullText { get; set; }

        public int[] DisplayTextRange { get; set; }

        public bool Favorited { get; set; }

        public long FavoriteCount { get; set; }

        public long DislikeCount { get; set; }

        public CustomerModel User { get; set; }

        public int CommentsCount { get; set; }

        public ObjectEntitiesDTO Entities { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool Truncated { get; set; }

        public bool Pinned { get; set; }

        public bool CommentsEnabled { get; set; } = true;

        public int? ReplyCount { get; set; }

        public int RepostCount { get; set; }

        public int? InReplyToStatusId { get; set; }

        public string InReplyToStatusIdStr { get; set; }

        public int? InReplyToUserId { get; set; }

        public string InReplyToUserIdStr { get; set; }

        public string InReplyToScreenName { get; set; }

        public PollModel Poll { get; set; }

        public PostModel Repost { get; set; }

        public PreviewCardModel Card { get; set; }

        public bool HasMedia { get; set; }

        public int ReshareCount { get; set; }

        public bool Reposted { get; set; }

        public IList<PostTagModel> Tags { get; set; }
    }
}
