namespace Chessbook.Web.Models.Outputs.Posts
{
    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Web.Models.Outputs.Polls;
    using System.Collections.Generic;

    public class ObjectEntitiesDTO
    {
        //public List<UrlEntity> Urls { get; set; }

        //public List<UserMentionEntity> UserMentions { get; set; }

        //public List<HashtagEntity> Hashtags { get; set; }

        //public List<SymbolEntity> Symbols { get; set; }

        public List<MediaEntityDTO> Medias { get; set; }

        public PollDTO Poll { get; set; }
    }
}
