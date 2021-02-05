namespace Sharebook.Web.Models.Outputs.Posts
{
    using Sharebook.Data.Models.Post.Entities;
    using System.Collections.Generic;

    public class ObjectEntitiesDTO
    {
        //public List<UrlEntity> Urls { get; set; }

        //public List<UserMentionEntity> UserMentions { get; set; }

        //public List<HashtagEntity> Hashtags { get; set; }

        //public List<SymbolEntity> Symbols { get; set; }

        public List<MediaEntity> Medias { get; set; }
    }
}
