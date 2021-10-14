namespace Chessbook.Web.Api.Areas.Admin.Models.Post
{
    using Chessbook.Web.Models.Media;
    using Chessbook.Web.Models.Polls;
    using System.Collections.Generic;

    public class ObjectEntitiesDTO
    {
        public ObjectEntitiesDTO()
        {
            this.Medias = new List<PictureModel>();
        }

        //public List<UrlEntity> Urls { get; set; }

        //public List<UserMentionEntity> UserMentions { get; set; }

        //public List<HashtagEntity> Hashtags { get; set; }

        //public List<SymbolEntity> Symbols { get; set; }

        public IList<PictureModel> Medias { get; set; }

        public PollModel Poll { get; set; }
    }
}
