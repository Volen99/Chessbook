namespace WorldFeed.Upload.Domain.Models
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

  // Do not add ORM-specific logic to the domain objects – data annotations, for example. These attributes should not be used in DDD. 
  // Use the Entity Framework fluent configuration instead
  //
  [Owned]                   // Eager loading is performed automatically on owned types, that is, there’s no need to call .Include() on the query
    public class Entities
    {
        public List<UrlEntity> Urls { get; set; }

        public List<UserMentionEntity> UserMentions { get; set; }

        public List<HashtagEntity> Hashtags { get; set; }

        public List<SymbolEntity> Symbols { get; set; }

        public List<MediaFeedEntity> Medias { get; set; }

    }
}
