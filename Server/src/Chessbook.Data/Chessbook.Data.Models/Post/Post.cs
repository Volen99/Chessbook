namespace Chessbook.Data.Models.Post
{
    using global::System;
    using global::System.Collections.Generic;
    using global::System.ComponentModel.DataAnnotations;

    using Chessbook.Data.Common.Models;
    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Data.Models.Post.Properties;
    using Chessbook.Data.Models.Polls;

    public class Post : BaseDeletableModel<int>
    {
        public Post()
        {
            this.Medias = new List<MediaEntity>();
        }

        public string IdStr { get; set; }

        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public string Text { get; set; }

        public string Prefix { get; }

        public string Suffix { get; set; }

        public string FullText { get; set; }

        public bool Truncated { get; set; }

        public string UrlsIds { get; set; }
        public List<UrlEntity> Urls { get; private set; }

        public string UserMentionsIds { get; set; }
        public List<UserMentionEntity> UserMentions { get; private set; }

        public string HashtagsIds { get; set; }
        public List<HashtagEntity> Hashtags { get; private set; }

        public string SymbolsIds { get; set; }
        public List<SymbolEntity> Symbols { get; private set; }

        public virtual ICollection<MediaEntity> Medias { get; set; }

        public int? PollId { get; set; }
        public virtual Poll Poll { get; set; }


        // public ExtendedEntities ExtendedEntities { get; private set; }

        public string Source { get; set; }

        public int InReplyToStatusId { get; set; }

        public string InReplyToStatusIdStr { get; set; }

        public int InReplyToUserId { get; set; }

        public string InReplyToUserIdStr { get; set; }

        public string InReplyToScreenName { get; set; }

        public Geo Geo { get; set; }

        public Coordinates Coordinates { get; set; }

        public Place Place { get; private set; }

        public string Contributors { get; set; }

        public bool IsQuoteStatus { get; set; }

        public int RetweetCount { get; set; }

        public long FavoriteCount { get; set; }

        public long DislikeCount { get; set; }

        public int ReplyCount { get; set; }

        public int QuoteCount { get; set; }

        public bool Favorited { get; set; }

        public bool Reshared { get; set; }

        public bool PossiblySensitive { get; set; }

        public bool PossiblySensitiveEditable { get; set; }

        public string Lang { get; set; }

        public string SupplementalLanguage { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool HasMedia { get; set; }
    }
}
