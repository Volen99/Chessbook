namespace Chessbook.Data.Models.Post.Entities
{
    using global::System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;


    [Owned]
    public class DescriptionEntity
    {
        public IEnumerable<UrlEntity> Urls { get; set; }
    }
}
